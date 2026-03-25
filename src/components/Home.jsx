import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './Home.css';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const stats = [
  { value: '3+', label: 'Years Learning' },
  { value: '5+', label: 'Projects Built' },
  { value: '12+', label: 'Technologies' },
  { value: '200+', label: 'DSA Problems' },
];

const socials = [
  { label: 'GitHub', url: 'https://github.com/kpragati03', char: 'GH' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kpragati03/', char: 'LI' },
  { label: 'Email', url: '', char: 'EM' },
];

const techStack = ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Git'];

const TechConstellation = ({ tech, activeRef }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const nodesRef = useRef([]);
  const hoverRef = useRef({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const reduceMotion = document.documentElement.getAttribute('data-reduced-motion') === '1';
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = host.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // initialize nodes once we know bounds
      const pad = 22;
      const w = rect.width;
      const h = rect.height;
      const base = tech.map((label, i) => {
        const seed = (i + 1) * 9973;
        const r = 2.4 + (seed % 10) * 0.12;
        const x = pad + ((seed * 13) % Math.max(1, (w - pad * 2)));
        const y = pad + ((seed * 29) % Math.max(1, (h - pad * 2)));
        const vx = (((seed % 11) - 5) / 140) * (reduceMotion ? 0 : 1);
        const vy = ((((seed / 7) % 11) - 5) / 160) * (reduceMotion ? 0 : 1);
        return { label, x, y, vx, vy, r };
      });
      nodesRef.current = base;
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(host);

    const onMove = (e) => {
      const rect = host.getBoundingClientRect();
      hoverRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside: true,
      };
    };
    const onLeave = () => {
      hoverRef.current.inside = false;
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    const draw = () => {
      const rect = host.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const hover = hoverRef.current;
      const paletteActive = activeRef?.current ?? false;
      const intensity = (hover.inside || paletteActive) ? 1 : 0.35;

      // update
      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 18 || n.x > w - 18) n.vx *= -1;
          if (n.y < 18 || n.y > h - 18) n.vy *= -1;
        }
      }

      const maxLinkDist = 120;
      const hx = hover.x;
      const hy = hover.y;
      const hoverBoost = hover.inside ? 1 : 0;

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > maxLinkDist) continue;
          const nearHover = hoverBoost ? (Math.hypot(a.x - hx, a.y - hy) < 130 || Math.hypot(b.x - hx, b.y - hy) < 130) : false;
          const alpha = (1 - d / maxLinkDist) * (nearHover ? 0.55 : 0.16) * intensity;
          if (alpha < 0.02) continue;
          ctx.strokeStyle = `rgba(169,183,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const dHover = hoverBoost ? Math.hypot(n.x - hx, n.y - hy) : 9999;
        const pop = dHover < 90 ? 1.65 : 1;
        const glow = dHover < 90 ? 0.22 : 0.12;
        const r = n.r * pop;

        ctx.beginPath();
        ctx.fillStyle = `rgba(96,165,250,${0.20 * intensity})`;
        ctx.arc(n.x, n.y, r + 3.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(169,183,255,${(0.62 + glow) * intensity})`;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, [tech, activeRef]);

  return <canvas ref={canvasRef} className="h-constellation" aria-hidden="true" />;
};

const Intro = ({ onDone }) => (
  <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(1rem,3vw,1.3rem)', color: 'var(--accent)', letterSpacing: 2 }}>
      pragati.dev
    </motion.div>
    <motion.div initial={{ width: 0 }} animate={{ width: 180 }} transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
      onAnimationComplete={onDone}
      style={{ height: 1, background: 'var(--grad1)', boxShadow: 'var(--glow)' }} />
  </motion.div>
);

const Home = ({ theme }) => {
  const [showIntro, setShowIntro] = useState(!sessionStorage.getItem('visited'));
  const cardRef = useRef(null);
  const bentoRef = useRef(null);
  const constellationActive = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 180, damping: 22 });
  const bentoX = useMotionValue(0);
  const bentoY = useMotionValue(0);
  const bentoRotateX = useSpring(useTransform(bentoY, [-180, 180], [6, -6]), { stiffness: 160, damping: 22 });
  const bentoRotateY = useSpring(useTransform(bentoX, [-180, 180], [-6, 6]), { stiffness: 160, damping: 22 });

  const onMouseMove = e => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const onBentoMove = (e) => {
    const rect = bentoRef.current?.getBoundingClientRect();
    if (!rect) return;
    bentoX.set(e.clientX - rect.left - rect.width / 2);
    bentoY.set(e.clientY - rect.top - rect.height / 2);
  };
  const onBentoLeave = () => { bentoX.set(0); bentoY.set(0); };

  const handleIntroDone = () => {
    sessionStorage.setItem('visited', '1');
    setTimeout(() => setShowIntro(false), 200);
  };

  const d = showIntro ? 1.4 : 0;

  useEffect(() => {
    // keep constellation "awake" when user is on right side
    const el = bentoRef.current;
    if (!el) return;
    const onEnter = () => { constellationActive.current = true; };
    const onLeave = () => { constellationActive.current = false; };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <>
      <AnimatePresence>{showIntro && <Intro onDone={handleIntroDone} />}</AnimatePresence>

      <div className="h-hero">
        <div className="h-bg" aria-hidden="true" />

        <div className="h-wrap">
          <motion.div
            className="h-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: d }}
          >
            <motion.div
              className="h-badges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d + 0.1 }}
            >
              <span className="section-tag">// hello world</span>
              <span className="h-availability mono">
                <motion.span
                  className="h-dot"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                available for work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: d + 0.15 }}
              className="h-title serif"
            >
              Pragati<br />
              <span className="shimmer-text">Kumari</span>
            </motion.h1>

            <motion.div
              className="h-type mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d + 0.25 }}
            >
              <span className="h-prompt">{'>'}</span>
              <TypeAnimation
                sequence={['MERN Stack Developer', 2000, 'Full Stack Developer', 2000, 'UI/UX Designer', 2000, 'Digital Marketer', 2000, 'Project Manager', 2000]}
                wrapper="span"
                speed={60}
                repeat={Infinity}
                style={{ color: 'var(--text2)' }}
              />
              <motion.span
                className="h-caret"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.div>

            <motion.p
              className="h-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d + 0.35 }}
            >
              B.Tech CSE student at LPU building full-stack web applications.
              Passionate about clean code, great UX, and solving real problems.
            </motion.p>

            <motion.div
              className="btn-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: d + 0.42 }}
            >
              <motion.button className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => scrollTo('projects')}>
                View Projects
              </motion.button>
              <motion.button className="btn-outline" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => scrollTo('contact')}>
                Get In Touch
              </motion.button>
            </motion.div>

            <motion.div
              className="h-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d + 0.5 }}
            >
              {socials.map((s, i) => (
                <motion.button
                  key={i}
                  className="h-social-btn mono"
                  whileHover={{ y: -2, borderColor: 'rgba(96,165,250,0.35)', color: 'var(--accent)' }}
                  onClick={() => {
                    if (s.label === 'Email') { navigator.clipboard.writeText('pragati111kumari@gmail.com'); alert('Email copied!'); }
                    else window.open(s.url, '_blank');
                  }}
                >
                  {s.char}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              className="h-stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d + 0.58 }}
            >
              <span className="h-stack-label mono">stack</span>
              {techStack.map((t, i) => (
                <span key={i} className="h-chip mono">{t}</span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="h-right"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.2, duration: 0.7 }}
          >
            <div className="h-bento" ref={bentoRef} onMouseMove={onBentoMove} onMouseLeave={onBentoLeave} style={{ perspective: 1100 }}>
              <TechConstellation tech={techStack} activeRef={constellationActive} />
              <motion.div className="h-bento-inner" style={{ rotateX: bentoRotateX, rotateY: bentoRotateY, transformStyle: 'preserve-3d' }}>
                <div className="h-card h-card-profile glass" ref={cardRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                  <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                    <div className="h-card-top" />
                    <div className="h-card-head">
                      <div className="h-dots" aria-hidden="true">
                        {['#ef4444', '#f59e0b', '#22c55e'].map((c, idx) => (
                          <span key={idx} className="h-dotc" style={{ background: c }} />
                        ))}
                      </div>
                      <span className="h-filename mono">profile.json</span>
                      <span className="h-monogram" aria-hidden="true">
                        <span className="h-mono-inner mono">PK</span>
                      </span>
                    </div>
                    <div className="h-card-body mono">
                      <div className="h-brace">{'{'}</div>
                      {[
                        { key: 'name', val: '"Pragati Kumari"' },
                        { key: 'role', val: '"MERN Developer"' },
                        { key: 'university', val: '"LPU"' },
                        { key: 'cgpa', val: '7.3' },
                        { key: 'location', val: '"India"' },
                        { key: 'status', val: '"open to work"' },
                      ].map(({ key, val }, idx) => (
                        <motion.div key={idx} className="h-json-row" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: d + 0.35 + idx * 0.06 }}>
                          <span className="h-json-k">"{key}"</span>
                          <span className="h-json-colon">: </span>
                          <span className={`h-json-v ${val.startsWith('"') ? 'isString' : 'isNumber'}`}>{val}</span>
                          <span className="h-json-comma">,</span>
                        </motion.div>
                      ))}
                      <div className="h-brace">{'}'}</div>

                      <div className="h-status">
                        <motion.span className="h-status-dot" animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <span className="h-status-text">available for opportunities</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="h-card h-card-metrics card">
                  <div className="h-metrics-grid">
                    {stats.map((s, i) => (
                      <div key={i} className="h-metric">
                        <div className="h-metric-v serif">{s.value}</div>
                        <div className="h-metric-l mono">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-card h-card-glass glass" aria-hidden="true">
                  <div className="h-glass-shine" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;
