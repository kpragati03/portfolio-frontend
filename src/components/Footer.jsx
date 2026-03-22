import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const socials = [
  { emoji: '🐱', label: 'GitHub', url: 'https://github.com/kpragati03' },
  { emoji: '💼', label: 'LinkedIn', url: 'https://www.linkedin.com/in/kpragati03/' },
  { emoji: '📋', label: 'Copy Email', url: '' },
];

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
];

const marqueeItems = ['React ✿', 'Node.js 🌸', 'MongoDB 💚', 'Express.js 🌷', 'JavaScript ✨', 'Framer Motion 💫', 'Vite ⚡', 'REST APIs 🔗', 'Git 🐱', 'Bootstrap 💜'];

const Footer = () => {
  const navigate = useNavigate();
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
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, boxShadow: 'var(--shadow2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ position: 'fixed', bottom: 32, right: 32, width: 52, height: 52, borderRadius: '50%', background: 'var(--grad1)', border: 'none', color: '#fff', fontSize: '1.3rem', cursor: 'none', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow)' }}>
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Marquee */}
      <div style={{ background: 'var(--grad1)', overflow: 'hidden', padding: '12px 0' }}>
        <motion.div animate={{ x: [0, -1400] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>{t}</span>
          ))}
        </motion.div>
      </div>

      <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '56px 40px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 48 }}>

            {/* Brand */}
            <div style={{ flex: '1 1 260px' }}>
              <div className="serif shimmer-text" style={{ fontSize: '1.8rem', fontWeight: 700, fontStyle: 'italic', marginBottom: 14 }}>✿ Pragati</div>
              <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 270, marginBottom: 22, fontWeight: 400 }}>
                MERN Stack Developer crafting beautiful, high-performance web experiences with love 💕
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {socials.map((s, i) => (
                  <motion.div key={i}
                    whileHover={{ scale: 1.15, y: -4 }}
                    title={s.label}
                    onClick={() => {
                      if (s.label === 'Copy Email') {
                        navigator.clipboard.writeText('pragati111kumari@gmail.com');
                        alert('Email copied! 💌');
                      } else {
                        window.open(s.url, '_blank');
                      }
                    }}
                    style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface)', border: '1.5px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: 'var(--shadow)', cursor: 'pointer' }}>
                    {s.emoji}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1rem', marginBottom: 18 }}>Navigation 🗺️</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(({ to, label }) => (
                  <Link key={to} to={to}
                    style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--pink)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text2)'}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ flex: '1 1 220px' }}>
              <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1rem', marginBottom: 18 }}>Let's Work Together 🌸</div>
              <p style={{ color: 'var(--text2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 20, fontWeight: 400 }}>
                Open to freelance projects, internships, and full-time opportunities 💕
              </p>
              <motion.button onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.04, boxShadow: 'var(--shadow2)' }} whileTap={{ scale: 0.97 }}
                style={{ background: 'var(--grad1)', borderRadius: 50, padding: '12px 28px', color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.95rem', boxShadow: 'var(--glow)', cursor: 'pointer' }}>
                💌 Hire Me
              </motion.button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ color: 'var(--text2)', fontSize: '0.9rem', fontWeight: 500 }}>© {new Date().getFullYear()} Pragati Kumari. All rights reserved. 🌸</span>
            <span style={{ color: 'var(--text2)', fontSize: '0.9rem', fontWeight: 500 }}>Crafted with 💖 using React & Framer Motion</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
