"use client";

import Link from "next/link";
import { useState } from "react";

const BOOKING_URL = "https://calendar.app.google/DxK139MN3MRwXxJ6A";

export default function ChemistryHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header chemistry-header">
      <Link className="brand" href="/" aria-label="Sep Science and Math home">
        <span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span>
      </Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span /><span /></button>
      <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
        <Link href="/">Home</Link><Link href="/resources">Paper guides</Link><Link className="nav-current" href="/resources/chemistry-topics">Chemistry topics</Link><Link href="/#about">About Sep</Link>
      </nav>
      <a className="button button-small header-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a consultation <span>↗</span></a>
    </header>
  );
}

