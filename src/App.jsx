import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import ResumeExperience from './components/ResumeExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CursorTrail, Confetti, MusicPlayer } from './components/Extras';
import CommandPalette from './components/CommandPalette';

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

function AppInner() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.background = theme === 'dark' ? '#000000' : '#ffffff';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <EasterEgg>
      <CursorTrail />
      <MusicPlayer />
      <CommandPalette />
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <main>
        <section id="home"><Home theme={theme} /></section>
        <section id="about"><About theme={theme} /></section>
        <section id="projects"><Projects theme={theme} /></section>
        <section id="resume"><ResumeExperience theme={theme} /></section>
        <section id="contact"><Contact theme={theme} /></section>
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
