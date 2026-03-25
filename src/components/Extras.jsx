import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

/* ── 1. CURSOR PETAL TRAIL ── */
export const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  const counter = useRef(0);

  useEffect(() => {
    const reduceMotion = document.documentElement.getAttribute('data-reduced-motion') === '1';
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarse) return;

    let lastX = 0, lastY = 0;
    const onMove = e => {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) < 10) return;
      lastX = e.clientX; lastY = e.clientY;
      const id = counter.current++;
      const size = 10 + (id % 5) * 2;
      setTrails(t => [
        ...t.slice(-16),
        { id, x: e.clientX, y: e.clientY, size, drift: (id % 2 === 0 ? 1 : -1) * (6 + (id % 6)) },
      ]);
      setTimeout(() => setTrails(t => t.filter(p => p.id !== id)), 720);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99990 }}>
      <AnimatePresence>
        {trails.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.9, scale: 1, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 0.35, x: p.x + p.drift, y: p.y - 46 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: p.size,
              height: p.size,
              borderRadius: 999,
              pointerEvents: 'none',
              transform: `translate(${p.x}px, ${p.y}px)`,
              background: 'radial-gradient(circle at 30% 30%, rgba(233,238,252,0.65), rgba(96,165,250,0.0) 60%)',
              boxShadow: '0 0 18px rgba(96,165,250,0.22)',
              border: '1px solid rgba(169,183,255,0.20)',
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ── 2. PAGE TRANSITION WIPE ── */
export const PageWipe = ({ isAnimating }) => (
  <AnimatePresence>
    {isAnimating && (
      <motion.div
        key="wipe"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0, originY: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9500,
          background: 'var(--grad1)',
          transformOrigin: 'top',
          pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ fontSize: '3rem' }}>🌸</motion.span>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ── 3. CONFETTI / PETAL SHOWER (easter egg) ── */
const CONFETTI_COLORS = ['#db2777', '#f472b6', '#c084fc', '#a78bfa', '#fda4af', '#e879f9', '#fbbf24'];
const randomBetween = (a, b) => a + Math.random() * (b - a);

export const Confetti = ({ active, onDone }) => {
  const pieces = useRef(Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: randomBetween(10, 90),
    delay: randomBetween(0, 0.6),
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: randomBetween(8, 16),
    char: ['🌸', '✿', '🌷', '✦', '💮', '❋'][i % 6],
  })));

  useEffect(() => {
    if (active) {
      const t = setTimeout(onDone, 3000);
      return () => clearTimeout(t);
    }
  }, [active, onDone]);

  return (
    <AnimatePresence>
      {active && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99980, overflow: 'hidden' }}>
          {pieces.current.map(p => (
            <motion.span key={p.id}
              initial={{ opacity: 1, y: -20, x: `${p.x}vw`, rotate: 0, scale: 1 }}
              animate={{ opacity: [1, 1, 0], y: '110vh', rotate: randomBetween(-360, 360), scale: [1, 1.2, 0.5] }}
              transition={{ duration: randomBetween(1.8, 3), delay: p.delay, ease: 'easeIn' }}
              style={{ position: 'fixed', top: 0, left: 0, fontSize: p.size, lineHeight: 1 }}>
              {p.char}
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

/* ── 4. FLOATING MUSIC BUTTON ── */
const TRACKS = [
  { name: 'Lo-fi Chill', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', emoji: '🎵' },
  { name: 'Soft Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', emoji: '🎶' },
];

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(TRACKS[trackIdx].url);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
    return () => { audioRef.current?.pause(); };
  }, [trackIdx]);

  const toggle = () => {
    if (playing) { audioRef.current?.pause(); setPlaying(false); }
    else { audioRef.current?.play(); setPlaying(true); }
  };

  const switchTrack = (i) => {
    audioRef.current?.pause();
    setTrackIdx(i);
    setPlaying(false);
    setTimeout(() => { audioRef.current = new Audio(TRACKS[i].url); audioRef.current.loop = true; audioRef.current.volume = 0.25; }, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      style={{ position: 'fixed', bottom: 96, right: 32, zIndex: 998, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 16, padding: '12px 16px', backdropFilter: 'blur(20px)', boxShadow: 'var(--shadow2)', minWidth: 160 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--pink)', marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase' }}>Now Playing</div>
            {TRACKS.map((t, i) => (
              <div key={i} onClick={() => switchTrack(i)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 8, cursor: 'pointer', background: trackIdx === i ? 'var(--bg3)' : 'transparent', marginBottom: 4 }}>
                <span>{t.emoji}</span>
                <span style={{ fontSize: '0.82rem', color: trackIdx === i ? 'var(--pink)' : 'var(--text2)', fontWeight: trackIdx === i ? 700 : 500 }}>{t.name}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 8 }}>
              <input type="range" min="0" max="1" step="0.05" defaultValue="0.25"
                onChange={e => { if (audioRef.current) audioRef.current.volume = e.target.value; }}
                style={{ width: '100%', accentColor: 'var(--pink)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
        onClick={toggle}
        onContextMenu={e => { e.preventDefault(); setExpanded(v => !v); }}
        title="Click to play/pause | Right-click for options"
        style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--grad1)', border: 'none', color: '#fff', fontSize: '1.3rem', cursor: 'pointer', boxShadow: playing ? 'var(--glow), 0 0 0 4px rgba(219,39,119,0.2)' : 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {playing ? '🎵' : '🎧'}
        {playing && (
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid var(--pink)', pointerEvents: 'none' }} />
        )}
      </motion.button>
    </motion.div>
  );
};

/* ── 5. MAGNETIC BUTTON HOOK ── */
export const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength, x, y]);

  return { ref, style: { x: sx, y: sy } };
};

/* ── 6. CLICK RIPPLE ── */
export const ClickRipple = () => {
  const [ripples, setRipples] = useState([]);
  const counter = useRef(0);

  useEffect(() => {
    const onClick = e => {
      const id = counter.current++;
      setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(r => r.filter(p => p.id !== id)), 800);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99970 }}>
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div key={r.id}
            initial={{ opacity: 0.7, scale: 0, x: r.x, y: r.y }}
            animate={{ opacity: 0, scale: 3.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ position: 'fixed', left: 0, top: 0, width: 48, height: 48, borderRadius: '50%', background: 'radial-gradient(circle, rgba(219,39,119,0.35), rgba(124,58,237,0.15))', transform: `translate(${r.x - 24}px, ${r.y - 24}px)`, border: '1.5px solid rgba(219,39,119,0.4)', pointerEvents: 'none' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ── 7. REACTION BUTTON ── */
export const ReactionButton = () => {
  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem('portfolio_likes') || '0'));
  const [liked, setLiked] = useState(() => localStorage.getItem('portfolio_liked') === 'true');
  const [burst, setBurst] = useState(false);

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : Math.max(0, likes - 1);
    setLiked(newLiked);
    setLikes(newLikes);
    localStorage.setItem('portfolio_liked', newLiked);
    localStorage.setItem('portfolio_likes', newLikes);
    if (newLiked) { setBurst(true); setTimeout(() => setBurst(false), 700); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, type: 'spring' }}
      style={{ position: 'fixed', bottom: 160, right: 32, zIndex: 998, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <motion.button
        whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}
        onClick={handleLike}
        title={liked ? 'Unlike' : 'Like this portfolio!'}
        style={{ width: 52, height: 52, borderRadius: '50%', background: liked ? 'var(--grad1)' : 'var(--surface)', border: `1.5px solid ${liked ? 'transparent' : 'var(--border2)'}`, fontSize: '1.4rem', cursor: 'pointer', boxShadow: liked ? 'var(--glow)' : 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backdropFilter: 'blur(12px)' }}>
        <motion.span animate={burst ? { scale: [1, 1.6, 1], rotate: [0, 20, -20, 0] } : {}} transition={{ duration: 0.5 }}>
          {liked ? '💖' : '🤍'}
        </motion.span>
        {burst && (
          <AnimatePresence>
            {['🌸','✦','💕','✿'].map((c, i) => (
              <motion.span key={i}
                initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1, x: (i % 2 === 0 ? 1 : -1) * (20 + i * 8), y: -30 - i * 8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                style={{ position: 'absolute', fontSize: '0.9rem', pointerEvents: 'none' }}>{c}</motion.span>
            ))}
          </AnimatePresence>
        )}
      </motion.button>
      <motion.span
        animate={{ scale: burst ? [1, 1.3, 1] : 1 }}
        style={{ fontSize: '0.72rem', fontWeight: 700, color: liked ? 'var(--pink)' : 'var(--text3)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 50, padding: '2px 8px', backdropFilter: 'blur(10px)' }}>
        {likes} {likes === 1 ? 'like' : 'likes'}
      </motion.span>
    </motion.div>
  );
};

/* ── 8. LIVE VISITOR COUNTER ── */
export const VisitorCounter = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Simulate a live-ish visitor count using localStorage + random offset
    const base = parseInt(localStorage.getItem('visitor_base') || '0');
    if (!base) {
      const seed = Math.floor(Math.random() * 40) + 60; // start between 60-100
      localStorage.setItem('visitor_base', seed);
    }
    const stored = parseInt(localStorage.getItem('visitor_base'));
    // Increment on each new session
    if (!sessionStorage.getItem('counted')) {
      sessionStorage.setItem('counted', '1');
      localStorage.setItem('visitor_base', stored + 1);
    }
    const final = parseInt(localStorage.getItem('visitor_base'));
    // Animate count up
    let i = 0;
    const interval = setInterval(() => {
      i += Math.ceil(final / 30);
      if (i >= final) { setCount(final); clearInterval(interval); }
      else setCount(i);
    }, 40);
    setTimeout(() => setShow(true), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 998, background: 'var(--surface)', border: '1.5px solid var(--border2)', borderRadius: 50, padding: '8px 18px', backdropFilter: 'blur(16px)', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text2)' }}>👀 <span style={{ color: 'var(--pink)' }}>{count}</span> visitors</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
