import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume',   label: 'Resume' },
  { id: 'contact',  label: 'Contact' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Header = ({ toggleTheme, currentTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const offsets = navLinks.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top : Infinity };
      });
      const current = offsets.filter(o => o.top <= 100).at(-1);
      if (current) setActiveId(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = currentTheme === 'dark';

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  const bgScrolled = isDark ? 'rgba(8,11,20,0.94)' : 'rgba(240,244,255,0.94)';

  return (
    <>
      <style>{`
        .hdr {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 0 clamp(20px,5vw,48px); height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
          background: ${scrolled ? bgScrolled : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          border-bottom: ${scrolled ? '1px solid var(--border)' : '1px solid transparent'};
        }
        .hdr-logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.05rem; font-weight: 600;
          color: var(--accent);
          display: flex; align-items: center; gap: 1px;
          position: relative; cursor: pointer; letter-spacing: -0.5px;
          text-decoration: none;
        }
        .hdr-logo-dim { color: var(--text3); font-weight: 400; }
        .hdr-logo:hover .hdr-logo-tip { display: block; }
        .hdr-logo-tip {
          display: none;
          position: absolute; top: calc(100% + 10px); left: 0;
          background: var(--bg2); border: 1px solid var(--border2);
          border-radius: 6px; padding: 5px 12px; font-size: 0.68rem;
          font-family: 'JetBrains Mono', monospace; font-weight: 400;
          color: var(--text2); white-space: nowrap;
          z-index: 9999; animation: fadeInTip 0.2s ease;
        }
        @keyframes fadeInTip {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hdr-nav { display: flex; align-items: center; gap: 2px; list-style: none; margin: 0; padding: 0; }
        .hdr-link {
          position: relative; color: var(--text2);
          font-size: 0.875rem; font-weight: 500; padding: 7px 14px;
          border-radius: 6px; transition: all 0.2s; cursor: pointer;
          background: none; border: none; font-family: 'Inter', sans-serif;
        }
        .hdr-link:hover { color: var(--text); background: var(--surface); }
        .hdr-link.active { color: var(--accent); }
        .hdr-pill {
          position: absolute; inset: 0; border-radius: 6px;
          background: rgba(0,212,255,0.06); border: 1px solid var(--border2); z-index: -1;
        }
        .hdr-toggle {
          width: 36px; height: 36px; border-radius: 6px;
          background: var(--surface); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
          margin-left: 8px; color: var(--text2); font-family: monospace;
        }
        .hdr-toggle:hover { border-color: var(--border2); color: var(--accent); }
        .hdr-burger {
          display: none; background: var(--surface); border: 1px solid var(--border);
          border-radius: 6px; padding: 7px 11px; color: var(--accent);
          cursor: pointer; font-size: 1rem;
        }
        .hdr-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px); z-index: 998;
        }
        .hdr-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 260px;
          background: var(--bg2); border-left: 1px solid var(--border);
          z-index: 999; padding: 72px 28px 40px;
          display: flex; flex-direction: column; gap: 2px;
        }
        .hdr-drawer-link {
          color: var(--text2); font-size: 1rem;
          font-weight: 500; padding: 13px 0; border-bottom: 1px solid var(--border);
          transition: color 0.2s; font-family: 'Inter', sans-serif;
          cursor: pointer; background: none; border-top: none; border-left: none; border-right: none;
          text-align: left;
        }
        .hdr-drawer-link:hover, .hdr-drawer-link.active { color: var(--accent); }
        .hdr-close {
          position: absolute; top: 18px; right: 18px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 6px; width: 32px; height: 32px;
          color: var(--text2); cursor: pointer; font-size: 0.85rem;
          display: flex; align-items: center; justify-content: center;
        }
        body { padding-top: 64px; }
        @media(max-width: 768px) {
          .hdr-nav { display: none; }
          .hdr-burger { display: block; }
        }
      `}</style>

      <header className="hdr">
        <span className="hdr-logo" onClick={() => handleNav('home')}>
          pragati<span className="hdr-logo-dim">.dev</span>
          <span className="hdr-logo-tip">click 5x for a surprise</span>
        </span>

        <ul className="hdr-nav">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <button className={`hdr-link ${activeId === id ? 'active' : ''}`} onClick={() => handleNav(id)}>
                {activeId === id && (
                  <motion.span layoutId="nav-pill" className="hdr-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                {label}
              </button>
            </li>
          ))}
          <li>
            <button className="hdr-toggle" onClick={toggleTheme} title="Toggle theme">
              {isDark ? '○' : '●'}
            </button>
          </li>
        </ul>

        <button className="hdr-burger" onClick={() => setMenuOpen(true)}>≡</button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="hdr-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />
            <motion.div className="hdr-drawer" initial={{ x: 260 }} animate={{ x: 0 }} exit={{ x: 260 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button className="hdr-close" onClick={() => setMenuOpen(false)}>✕</button>
              {navLinks.map(({ id, label }, i) => (
                <motion.button key={id} className={`hdr-drawer-link ${activeId === id ? 'active' : ''}`}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(id)}>
                  {label}
                </motion.button>
              ))}
              <button className="hdr-toggle" onClick={toggleTheme} style={{ marginTop: 20, alignSelf: 'flex-start' }}>
                {isDark ? '○' : '●'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
