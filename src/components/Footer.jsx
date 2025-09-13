import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          
          {/* Footer Content */}
          <div className="footer-content">
            
            {/* Navigation & Links */}
            <div className="footer-main-section">
              <h4 className="footer-title">Navigation</h4>
              <div className="footer-links">
                <a href="#home" className="footer-link">Home</a>
                <a href="#about" className="footer-link">About</a>
                <a href="#projects" className="footer-link">Projects</a>
                <a href="#resume" className="footer-link">Resume</a>
                <a href="#contact" className="footer-link">Contact</a>
              </div>
            </div>

            {/* Legal & Social Combined */}
            <div className="footer-secondary-section">
              <div className="footer-subsection">
                <h4 className="footer-title">Legal</h4>
                <div className="footer-links">
                  <a href="#privacy" className="footer-link">Privacy Policy</a>
                  <a href="#terms" className="footer-link">Terms of Service</a>
                </div>
              </div>
              
              <div className="footer-subsection">
                <h4 className="footer-title">Connect</h4>
                <div className="social-links">
                  
                  {/* Corrected GitHub Link */}
                  <a
                    href="https://github.com/kpragati03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  
                  {/* Corrected LinkedIn Link */}
                  <a
                    href="https://www.linkedin.com/in/kpragati03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  
                  {/* Corrected Email Link */}
                  <a
                    href="mailto:kumaripragatiii03@gmail.com"
                    className="social-link"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="footer-credits">
              <div className="credits-text">
                <span>© {currentYear} Pragati. All rights reserved.</span>
              </div>
              <div className="professional-note">
                <span>Crafted for excellence</span>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;