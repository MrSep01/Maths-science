#!/usr/bin/env python3
"""Extract a Cambridge Master Guide DOCX into exact, ordered JSON web blocks."""

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
    return {
        "type": "table",
        "rows": [
            ["\n".join(clean(p.text) for p in cell.paragraphs if clean(p.text)) for cell in row.cells]
            for row in table.rows
        ],
    }


def main():
    if len(sys.argv) != 3:
        raise SystemExit("Usage: extract-master-guide.py INPUT.docx OUTPUT.json")

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
            section_match = re.match(r"^SECTION (\d+):", text)
            is_appendix = text == "QUICK REFERENCE APPENDIX"
            if section_match or is_appendix:
                identifier = f"section-{section_match.group(1)}" if section_match else "appendix"
                current = {"id": identifier, "title": text, "blocks": []}
                sections.append(current)
                continue
            block = paragraph_block(paragraph)
        elif child.tag == qn("w:tbl"):
            block = table_block(Table(child, document))

        if block:
            (current["blocks"] if current else front_matter).append(block)

    payload = {"source": source.name, "frontMatter": front_matter, "sections": sections}
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    text_blocks = sum(
        block["type"] != "table"
        for area in [front_matter, *[section["blocks"] for section in sections]]
        for block in area
    )
    tables = sum(
        block["type"] == "table"
        for area in [front_matter, *[section["blocks"] for section in sections]]
        for block in area
    )
    print(f"Extracted {len(sections)} sections, {text_blocks} text blocks and {tables} tables")


if __name__ == "__main__":
    main()
