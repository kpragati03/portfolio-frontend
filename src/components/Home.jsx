import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const SPARKLES = Array.from({ length: 22 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 12 + 8, delay: Math.random() * 5, dur: Math.random() * 3 + 2.5,
  char: ['✦','✧','✿','❋','✽'][Math.floor(Math.random() * 5)],
}));

const FACTS = [
  '🌸 Loves building pixel-perfect UIs',
  '💡 Solved 200+ DSA problems',
  '🎨 Passionate about UI/UX Design',
  '🚀 Currently interning at INTERNSELITE',
  '📚 B.Tech CSE @ LPU with 7.3 CGPA',
  '💻 Full-Stack MERN Developer',
];

const stats = [
  { value: '3+', label: 'Years Learning', icon: '📅' },
  { value: '5+', label: 'Projects Built', icon: '🚀' },
  { value: '12+', label: 'Technologies', icon: '⚡' },
  { value: '100%', label: 'Dedication', icon: '💖' },
];

const socials = [
  { label: 'GitHub', url: 'https://github.com/kpragati03', emoji: '🐱', bg: 'rgba(110,64,201,0.15)', border: 'rgba(110,64,201,0.4)' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kpragati03/', emoji: '💼', bg: 'rgba(0,119,181,0.12)', border: 'rgba(0,119,181,0.35)' },
  { label: 'Copy Email', url: '', emoji: '📋', bg: 'rgba(219,39,119,0.12)', border: 'rgba(219,39,119,0.35)' },
];

/* ── Page-load intro ── */
const Intro = ({ onDone }) => (
  <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
    style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ fontSize: '4rem' }}>🌸</motion.div>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="serif shimmer-text" style={{ fontSize: '2.2rem', fontWeight: 700, fontStyle: 'italic' }}>
      Pragati Kumari
    </motion.div>
    <motion.div initial={{ width: 0 }} animate={{ width: 200 }} transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      onAnimationComplete={onDone}
      style={{ height: 3, background: 'var(--grad1)', borderRadius: 10, boxShadow: 'var(--glow)' }} />
  </motion.div>
);

const Home = ({ theme }) => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(!sessionStorage.getItem('visited'));
  const [factIdx, setFactIdx] = useState(0);
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [12, -12]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-12, 12]), { stiffness: 180, damping: 22 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const id = setInterval(() => setFactIdx(i => (i + 1) % FACTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = e => setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const onMouseMove = e => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleIntroDone = () => {
    sessionStorage.setItem('visited', '1');
    setTimeout(() => setShowIntro(false), 200);
  };

  return (
    <>
      <AnimatePresence>{showIntro && <Intro onDone={handleIntroDone} />}</AnimatePresence>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Mouse spotlight */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(219,39,119,0.06), transparent 60%)`, pointerEvents: 'none', transition: 'background 0.15s' }} />

        {/* Blobs */}
        {[
          { w: 560, h: 560, top: '-12%', left: '-12%', c: 'rgba(219,39,119,0.13)', dur: 9 },
          { w: 440, h: 440, top: '35%', right: '-10%', c: 'rgba(124,58,237,0.1)', dur: 11 },
          { w: 380, h: 380, bottom: '-8%', left: '28%', c: 'rgba(253,164,175,0.13)', dur: 8 },
        ].map((b, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: b.w, height: b.h, top: b.top, left: b.left, right: b.right, bottom: b.bottom, borderRadius: '60% 40% 70% 30%/50% 60% 40% 50%', background: b.c, filter: 'blur(70px)', pointerEvents: 'none' }} />
        ))}

        {/* Sparkles */}
        {SPARKLES.map(s => (
          <motion.div key={s.id} animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size, color: 'var(--pink)', pointerEvents: 'none', lineHeight: 1, opacity: 0 }}>
            {s.char}
          </motion.div>
        ))}

        {/* Main grid */}
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 48px 120px', width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>

          {/* ── LEFT ── */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: 'easeOut', delay: showIntro ? 1.6 : 0 }}>

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: showIntro ? 1.8 : 0.15 }}
              className="section-tag" style={{ marginBottom: 28 }}>
              <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>🌸</motion.span>
              Available for opportunities
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', display: 'inline-block' }} />
            </motion.div>

            {/* Heading */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: showIntro ? 1.9 : 0.25 }}
              className="serif"
              style={{ fontSize: 'clamp(3.2rem,7vw,6rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-2px', marginBottom: 18, color: 'var(--text)', whiteSpace: 'nowrap' }}>
              Hi, I'm{' '}
              <span className="shimmer-text">Pragati</span>
              <motion.span animate={{ rotate: [0, 22, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ display: 'inline-block', marginLeft: 10, whiteSpace: 'nowrap' }}>🌷</motion.span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: showIntro ? 2.0 : 0.4 }}
              style={{ fontSize: 'clamp(1.15rem,2.2vw,1.5rem)', color: 'var(--text2)', marginBottom: 22, minHeight: 40, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500 }}>
              <span style={{ color: 'var(--pink)', fontWeight: 700 }}>✨ A passionate</span>
              <TypeAnimation
                sequence={['MERN Stack Developer', 2000, 'Full Stack Developer', 2000, 'Digital Marketer', 2000, 'Java Developer', 2000, 'UI/UX Designer', 2000, 'Technical Delivery Manager', 2000, 'Project Manager', 2000, 'Frontend Specialist', 2000]}
                wrapper="span" speed={55} repeat={Infinity}
                style={{ fontWeight: 700, color: 'var(--mauve)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }} />
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: showIntro ? 2.1 : 0.5 }}
              style={{ color: 'var(--text2)', fontSize: '1.08rem', lineHeight: 1.9, maxWidth: 520, marginBottom: 36, fontWeight: 400 }}>
              Crafting beautiful, high-performance web applications with modern technologies.
              I transform innovative ideas into digital realities that make a lasting impact. 💕
            </motion.p>

            {/* Buttons */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: showIntro ? 2.2 : 0.6 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 36 }}>
              <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/projects')}>
                View My Work ✨
              </motion.button>
              <motion.button className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}>
                Hire Me 💌
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: showIntro ? 2.3 : 0.7 }}
              style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              {socials.map((s, i) => (
                <motion.div key={i}
                  whileHover={{ scale: 1.18, y: -5 }} whileTap={{ scale: 0.95 }}
                  title={s.label}
                  onClick={() => {
                    if (s.label === 'Copy Email') {
                      navigator.clipboard.writeText('pragati111kumari@gmail.com');
                      alert('Email copied! 💌');
                    } else {
                      window.open(s.url, '_blank');
                    }
                  }}
                  style={{ width: 50, height: 50, borderRadius: '50%', background: s.bg, border: `1.5px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', boxShadow: 'var(--shadow)', cursor: 'pointer' }}>
                  {s.emoji}
                </motion.div>
              ))}
            </motion.div>

            {/* Fun facts ticker */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: showIntro ? 2.4 : 0.8 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 50, padding: '10px 20px', maxWidth: 420, backdropFilter: 'blur(12px)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pink)', whiteSpace: 'nowrap', letterSpacing: '1px', textTransform: 'uppercase' }}>FUN FACT</span>
              <div style={{ width: 1, height: 16, background: 'var(--border2)' }} />
              <AnimatePresence mode="wait">
                <motion.span key={factIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  style={{ fontSize: '0.88rem', color: 'var(--text2)', fontWeight: 500 }}>
                  {FACTS[factIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — 3D card ── */}
          <motion.div ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
            style={{ perspective: 1000, flexShrink: 0 }}
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: showIntro ? 2.0 : 0.45, duration: 0.9 }}
            className="hide-mobile">
            <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d', width: 320, borderRadius: 32 }} className="glass">

              {/* Card gradient top */}
              <div style={{ height: 160, background: 'var(--grad2)', borderRadius: '32px 32px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.35)' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.2)' }} />
                <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', border: '3px solid rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', backdropFilter: 'blur(12px)', zIndex: 1 }}>
                  🌸
                </motion.div>
              </div>

              <div style={{ padding: '22px 26px 26px', textAlign: 'center' }}>
                <div className="serif" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>Pragati Kumari</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--pink)', fontWeight: 600, marginBottom: 18 }}>MERN Stack Developer 💻</div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 18 }}>
                  {['React', 'Node.js', 'MongoDB', 'Express'].map(t => (
                    <span key={t} style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: 50, padding: '5px 13px', color: 'var(--pink)', fontSize: '0.78rem', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>

                {/* Mini stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[{ v: '7.3', l: 'CGPA' }, { v: 'LPU', l: 'University' }, { v: '5+', l: 'Projects' }, { v: '3+', l: 'Yrs Exp' }].map((s, i) => (
                    <div key={i} style={{ background: 'var(--bg2)', borderRadius: 12, padding: '8px 6px', textAlign: 'center' }}>
                      <div className="serif" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--pink)' }}>{s.v}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text3)', fontWeight: 500 }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 50, padding: '8px 18px' }}>
                  <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e', display: 'inline-block' }} />
                  <span style={{ color: '#15803d', fontSize: '0.82rem', fontWeight: 700 }}>Open to Work 🌟</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: showIntro ? 2.5 : 0.9 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid var(--border)', background: 'var(--surface)', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'center' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ flex: '1 1 0', maxWidth: 220, textAlign: 'center', padding: '20px 16px', borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{s.icon}</div>
              <div className="serif shimmer-text" style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'var(--text3)', fontSize: '0.8rem', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Home;
