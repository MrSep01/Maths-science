#!/usr/bin/env python3
"""Extract the Paper 1 DOCX into exact, ordered JSON blocks for the web guide."""

import json
import re
import sys
from pathlib import Path

from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph


def clean(text: str) -> str:
    return " ".join(text.replace("\xa0", " ").split())


def paragraph_block(paragraph: Paragraph):
    text = clean(paragraph.text)
    if not text:
        return None
    style = paragraph.style.name if paragraph.style else "Normal"
    match = re.match(r"Heading (\d+)", style)
    if match:
        return {"type": "heading", "level": int(match.group(1)), "text": text}
    return {"type": "paragraph", "text": text}


def table_block(table: Table):
    rows = []
    for row in table.rows:
        values = []
        for cell in row.cells:
            parts = [clean(p.text) for p in cell.paragraphs if clean(p.text)]
            values.append("\n".join(parts))
        rows.append(values)
    return {"type": "table", "rows": rows}


def section_id(title: str) -> str:
    if title == "QUICK REFERENCE APPENDIX":
        return "appendix"
    number = re.match(r"SECTION (\d+):", title)
    names = {
        "1": "introduction",
        "2": "distractors",
        "3": "past-paper-analysis",
        "4": "heatmap",
        "5": "answering-strategies",
        "6": "topic-priority",
        "7": "worked-examples",
        "8": "predicted-topics",
        "9": "revision-plan",
        "10": "exam-day",
    }
    return names[number.group(1)]


def main():
    if len(sys.argv) != 3:
        raise SystemExit("Usage: extract-paper1-content.py INPUT.docx OUTPUT.json")

    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    document = Document(source)
    front_matter = []
    sections = []
    current = None

    for child in document.element.body.iterchildren():
        block = None
        if child.tag == qn("w:p"):
            paragraph = Paragraph(child, document)
            text = clean(paragraph.text)
            is_section = bool(re.match(r"^SECTION \d+:", text)) or text == "QUICK REFERENCE APPENDIX"
            if is_section:
                current = {"id": section_id(text), "title": text, "blocks": []}
                sections.append(current)
                continue
            block = paragraph_block(paragraph)
        elif child.tag == qn("w:tbl"):
            block = table_block(Table(child, document))

        if block:
            (current["blocks"] if current else front_matter).append(block)

    payload = {
        "source": source.name,
        "frontMatter": front_matter,
        "sections": sections,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    paragraph_count = sum(1 for area in [front_matter, *[s["blocks"] for s in sections]] for b in area if b["type"] in {"paragraph", "heading"})
    table_count = sum(1 for area in [front_matter, *[s["blocks"] for s in sections]] for b in area if b["type"] == "table")
    print(f"Extracted {len(sections)} sections, {paragraph_count} text blocks and {table_count} tables")


if __name__ == "__main__":
    main()
