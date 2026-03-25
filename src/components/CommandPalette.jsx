import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from './Projects';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function scoreMatch(query, text) {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 60;
  if (t.includes(q)) return 35;
  // fuzzy: all chars in order
  let ti = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const ch = q[qi];
    ti = t.indexOf(ch, ti);
    if (ti === -1) return 0;
    ti++;
  }
  return 12;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const base = [
      ...sections.map((s) => ({
        key: `section:${s.id}`,
        type: 'section',
        label: s.label,
        meta: 'Navigate',
        action: () => scrollTo(s.id),
      })),
      ...projects.map((p) => ({
        key: `project:${p.id}`,
        type: 'project',
        label: p.name,
        meta: p.category,
        action: () => scrollTo('projects'),
      })),
    ];

    const q = query.trim();
    const scored = base
      .map((it) => ({ it, s: scoreMatch(q, `${it.label} ${it.meta ?? ''}`) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);

    return scored.map((x) => x.it).slice(0, 10);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key;
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const hotkey = (isMac ? e.metaKey : e.ctrlKey) && key.toLowerCase() === 'k';
      const slash = key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey;

      if (hotkey || (slash && !open)) {
        // don't hijack typing in inputs
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (!open) return;
      if (key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, items.length - 1)));
        return;
      }
      if (key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (key === 'Enter') {
        e.preventDefault();
        const it = items[activeIndex];
        if (it) {
          it.action();
          setOpen(false);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, items, activeIndex]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <style>{`
        .cp-kbd {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: var(--text3);
          border: 1px solid var(--border);
          background: var(--surface);
          padding: 2px 8px;
          border-radius: 8px;
          letter-spacing: 0.5px;
        }
        .cp-backdrop {
          position: fixed; inset: 0; z-index: 5000;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(12px);
        }
        [data-theme="light"] .cp-backdrop { background: rgba(10,12,18,0.28); }
        .cp-shell {
          position: fixed; left: 50%; top: 14vh; transform: translateX(-50%);
          width: min(760px, calc(100vw - 28px));
          border-radius: 18px;
          background: color-mix(in oklab, var(--bg2) 88%, transparent);
          border: 1px solid var(--border);
          box-shadow: 0 24px 80px rgba(0,0,0,0.55);
          overflow: hidden;
        }
        .cp-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(255,255,255,0.05), transparent);
        }
        .cp-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          font-size: 0.98rem;
          font-weight: 550;
          letter-spacing: -0.2px;
        }
        .cp-hint {
          display: flex; gap: 8px; align-items: center;
          margin-left: 12px;
          white-space: nowrap;
        }
        .cp-list { padding: 8px; }
        .cp-row {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: center;
          text-align: left;
          background: transparent;
          border: 1px solid transparent;
          padding: 12px 12px;
          border-radius: 14px;
          cursor: pointer;
        }
        .cp-row:hover { background: rgba(169,183,255,0.06); border-color: rgba(169,183,255,0.14); }
        .cp-row[data-active="true"] { background: rgba(96,165,250,0.10); border-color: rgba(96,165,250,0.22); }
        .cp-label { color: var(--text); font-weight: 650; font-size: 0.92rem; }
        .cp-meta { color: var(--text3); font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.5px; text-transform: uppercase; }
        .cp-empty { padding: 22px 16px; color: var(--text2); font-size: 0.9rem; }
      `}</style>

      {/* Hidden hotkey hint for screen readers without adding visible content */}
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Press Control K to open command palette.
      </span>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="cp-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="cp-shell"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            >
              <div className="cp-top">
                <input
                  ref={inputRef}
                  className="cp-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to navigate…"
                  aria-label="Type to search"
                />
                <div className="cp-hint" aria-hidden="true">
                  <span className="cp-kbd">↑↓</span>
                  <span className="cp-kbd">Enter</span>
                  <span className="cp-kbd">Esc</span>
                </div>
              </div>

              <div className="cp-list">
                {items.length === 0 ? (
                  <div className="cp-empty">No matches</div>
                ) : (
                  items.map((it, idx) => (
                    <button
                      key={it.key}
                      className="cp-row"
                      data-active={idx === activeIndex}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        it.action();
                        setOpen(false);
                      }}
                    >
                      <div>
                        <div className="cp-label">{it.label}</div>
                        <div className="cp-meta">{it.meta}</div>
                      </div>
                      <div className="cp-meta">{it.type}</div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

