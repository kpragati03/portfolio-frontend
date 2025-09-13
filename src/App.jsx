import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import ResumeExperience from './components/ResumeExperience'; 
import Contact from './components/Contact';
import Footer from './components/Footer';
import AOS from 'aos'; // AOS ko import kiya
import 'aos/dist/aos.css'; // AOS ki CSS file ko import kiya

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // AOS ko initialize karne ke liye useEffect
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation ki duration (milliseconds)
      once: true,      // Animation sirf ek baar chale jab element scroll ho
    });
  }, []); // Empty dependency array, taaki sirf ek baar run ho

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header toggleTheme={toggleTheme} currentTheme={theme} /> 
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<ResumeExperience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;