import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
];

const Header = ({ toggleTheme, currentTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isDark = currentTheme === 'dark';

  return (
    <>
      <style>{`
        .hdr {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 0 40px; height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
          background: ${scrolled ? (isDark ? 'rgba(15,5,16,0.9)' : 'rgba(255,245,247,0.9)') : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          border-bottom: ${scrolled ? '1px solid var(--border)' : '1px solid transparent'};
        }
        .hdr-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 700; font-style: italic;
          background: var(--grad1);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; text-decoration: none;
          display: flex; align-items: center; gap: 6px;
          position: relative;
        }
        .hdr-logo:hover::after {
          content: 'psst... try clicking me 5 times 🌸';
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          background: var(--surface);
          border: 1.5px solid var(--border2);
          border-radius: 12px;
          padding: 7px 14px;
          font-size: 0.75rem;
          font-family: 'DM Sans', sans-serif;
          font-style: normal;
          font-weight: 600;
          color: var(--pink);
          white-space: nowrap;
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow);
          -webkit-text-fill-color: var(--pink);
          z-index: 9999;
          animation: fadeInTip 0.2s ease;
        }
        @keyframes fadeInTip {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hdr-nav { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
        .hdr-link {
          position: relative; color: var(--text2); text-decoration: none;
          font-size: 0.95rem; font-weight: 600; padding: 8px 18px;
          border-radius: 50px; transition: all 0.25s;
        }
        .hdr-link:hover { color: var(--pink); background: var(--surface); }
        .hdr-link.active { color: var(--pink); }
        .hdr-pill {
          position: absolute; inset: 0; border-radius: 50px;
          background: var(--surface); border: 1px solid var(--border2); z-index: -1;
        }
        .hdr-toggle {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--surface); border: 1.5px solid var(--border2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1.1rem; transition: all 0.3s;
          margin-left: 10px; color: var(--text);
        }
        .hdr-toggle:hover { background: var(--border2); transform: rotate(15deg) scale(1.1); }
        .hdr-burger {
          display: none; background: var(--surface); border: 1.5px solid var(--border2);
          border-radius: 12px; padding: 8px 12px; color: var(--pink);
          cursor: pointer; font-size: 1.1rem;
        }
        .hdr-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          backdrop-filter: blur(6px); z-index: 998;
        }
        .hdr-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 280px;
          background: var(--bg); border-left: 1px solid var(--border);
          z-index: 999; padding: 80px 32px 40px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .hdr-drawer-link {
          color: var(--text2); text-decoration: none; font-size: 1.5rem;
          font-weight: 700; padding: 16px 0; border-bottom: 1px solid var(--border);
          transition: color 0.2s; font-family: 'Playfair Display', serif;
        }
        .hdr-drawer-link:hover, .hdr-drawer-link.active { color: var(--pink); }
        .hdr-close {
          position: absolute; top: 20px; right: 20px;
          background: var(--surface); border: 1px solid var(--border2);
          border-radius: 50%; width: 36px; height: 36px;
          color: var(--text2); cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
        }
        body { padding-top: 68px; }
        @media(max-width: 768px) {
          .hdr-nav { display: none; }
          .hdr-burger { display: block; }
          .hdr { padding: 0 20px; }
        }
      `}</style>

      <header className="hdr">
        <Link to="/" className="hdr-logo">✿ Pragati</Link>

        <ul className="hdr-nav">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={`hdr-link ${location.pathname === path ? 'active' : ''}`}>
                {location.pathname === path && (
                  <motion.span layoutId="nav-pill" className="hdr-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button className="hdr-toggle" onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>

        <button className="hdr-burger" onClick={() => setMenuOpen(true)}>☰</button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="hdr-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />
            <motion.div className="hdr-drawer" initial={{ x: 280 }} animate={{ x: 0 }} exit={{ x: 280 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <button className="hdr-close" onClick={() => setMenuOpen(false)}>✕</button>
              {navLinks.map(({ path, label }, i) => (
                <motion.div key={path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to={path} className={`hdr-drawer-link ${location.pathname === path ? 'active' : ''}`}>{label}</Link>
                </motion.div>
              ))}
              <button className="hdr-toggle" onClick={toggleTheme} style={{ marginTop: 20, alignSelf: 'flex-start' }}>
                {isDark ? '☀️' : '🌙'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
