import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const socials = [
  { label: 'GitHub', url: 'https://github.com/kpragati03' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kpragati03/' },
  { label: 'Email', url: '' },
];

const links = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume',   label: 'Resume' },
  { id: 'contact',  label: 'Contact' },
];

const marqueeItems = ['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'Framer Motion', 'Vite', 'REST APIs', 'Git', 'Tailwind'];

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.08, boxShadow: 'var(--shadow2)' }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ position: 'fixed', bottom: 32, right: 32, width: 44, height: 44, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--accent)', fontSize: '1rem', cursor: 'pointer', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', boxShadow: 'var(--shadow)' }}>
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Marquee */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden', padding: '10px 0' }}>
        <motion.div animate={{ x: [0, -1400] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', fontWeight: 500, color: 'var(--text3)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              <span style={{ color: 'var(--accent)', marginRight: 6 }}>◆</span>{t}
            </span>
          ))}
        </motion.div>
      </div>

      <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: 'clamp(32px,5vw,52px) clamp(16px,5vw,40px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 40 }}>

            {/* Brand */}
            <div style={{ flex: '1 1 240px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent)', marginBottom: 12 }}>
                pragati<span style={{ color: 'var(--text3)', fontWeight: 400 }}>.dev</span>
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 260, marginBottom: 20 }}>
                MERN Stack Developer building high-performance web applications.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {socials.map((s, i) => (
                  <motion.button key={i}
                    whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    onClick={() => {
                      if (s.label === 'Email') { navigator.clipboard.writeText('pragati111kumari@gmail.com'); alert('Email copied!'); }
                      else window.open(s.url, '_blank');
                    }}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', fontWeight: 600, padding: '6px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text2)', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: 1 }}>
                    {s.label.toUpperCase().slice(0, 2)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <div style={{ color: 'var(--text3)', fontWeight: 600, fontSize: '0.72rem', marginBottom: 16, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '1.5px', textTransform: 'uppercase' }}>Navigation</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(({ id, label }) => (
                  <span key={id} onClick={() => scrollTo(id)}
                    style={{ color: 'var(--text2)', fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text2)'}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ color: 'var(--text3)', fontWeight: 600, fontSize: '0.72rem', marginBottom: 16, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '1.5px', textTransform: 'uppercase' }}>Let's Work Together</div>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 18 }}>
                Open to freelance projects, internships, and full-time opportunities.
              </p>
              <motion.button onClick={() => scrollTo('contact')}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary" style={{ fontSize: '0.88rem', padding: '10px 24px' }}>
                Get In Touch →
              </motion.button>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ color: 'var(--text3)', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace" }}>
              © {new Date().getFullYear()} Pragati Kumari
            </span>
            <span style={{ color: 'var(--text3)', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace" }}>
              Built with React & Framer Motion
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
