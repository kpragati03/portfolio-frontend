import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import ResumeExperience from './components/ResumeExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CursorTrail, PageWipe, Confetti, MusicPlayer } from './components/Extras';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }}
    transition={{ duration: 0.38, ease: 'easeOut' }}>
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ theme }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home theme={theme} /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About theme={theme} /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects theme={theme} /></PageWrapper>} />
        <Route path="/resume" element={<PageWrapper><ResumeExperience theme={theme} /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact theme={theme} /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const EasterEgg = ({ children }) => {
  const [confetti, setConfetti] = useState(false);
  const clicks = useRef(0);
  const timer = useRef(null);

  const handleLogoClick = () => {
    clicks.current++;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { clicks.current = 0; }, 2000);
    if (clicks.current >= 5) {
      clicks.current = 0;
      setConfetti(true);
    }
  };

  return (
    <div onClick={handleLogoClick}>
      {children}
      <Confetti active={confetti} onDone={() => setConfetti(false)} />
    </div>
  );
};

const WipeController = () => {
  const location = useLocation();
  const [wiping, setWiping] = useState(false);
  const prev = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prev.current) {
      prev.current = location.pathname;
      setWiping(true);
      setTimeout(() => setWiping(false), 500);
    }
  }, [location]);

  return <PageWipe isAnimating={wiping} />;
};

function AppInner() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <EasterEgg>
      <WipeController />
      <CursorTrail />
      <MusicPlayer />
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <main>
        <AnimatedRoutes theme={theme} />
      </main>
      <Footer theme={theme} />
    </EasterEgg>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
