import React, { useState, useEffect } from 'react';

const Header = ({ toggleTheme, currentTheme = 'light' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          .premium-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1050;
            transition: all 0.3s ease;
            padding: 15px 0;
          }
          
          .premium-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .premium-brand {
            background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.8rem;
            font-weight: bold;
            letter-spacing: 1px;
            text-decoration: none;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .premium-brand:hover {
            transform: scale(1.05);
            filter: brightness(1.2);
            -webkit-text-fill-color: transparent;
          }
          
          .premium-nav {
            display: flex;
            align-items: center;
            gap: 15px;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          .premium-nav-link {
            color: #fff;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 25px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .premium-nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }
          
          .premium-nav-link:hover {
            color: #fff;
            background: rgba(255,255,255,0.1);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            text-decoration: none;
          }
          
          .premium-nav-link:hover::before {
            left: 100%;
          }
          
          .premium-button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            border-radius: 25px;
            padding: 10px 18px;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }
          
          .premium-button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
          }
          
          .mobile-menu-toggle {
            display: none;
            background: none;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 10px;
            padding: 8px 12px;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .mobile-menu-toggle:hover {
            border-color: rgba(255,255,255,0.6);
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
          }
          
          .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 0 0 20px 20px;
            padding: 25px;
            transform: translateY(-20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
          
          .mobile-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          .mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          body {
            padding-top: 80px;
          }
          
          @media (max-width: 768px) {
            .premium-nav {
              display: none;
            }
            
            .mobile-menu-toggle {
              display: block;
            }
            
            .premium-brand {
              font-size: 1.5rem;
            }
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fadeInDown 0.8s ease-out;
          }
        `}
      </style>
      
      <header 
        className="premium-header animate-fade-in"
        style={{
          background: currentTheme === 'light' 
            ? isScrolled 
              ? 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)'
              : '#0A192F'
            : isScrolled
              ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(55, 65, 81, 0.95) 100%)'
              : '#212529',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled 
            ? '0 10px 40px rgba(0,0,0,0.3)' 
            : '0 4px 6px rgba(0,0,0,0.1)',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid #444'
        }}
      >
        <div className="premium-container">
          <a href="/" className="premium-brand">
            ✨ My Portfolio
          </a>
          
          <nav className="premium-nav">
            <a href="/" className="premium-nav-link">
              🏠 Home
            </a>
            <a href="/about" className="premium-nav-link">
              👤 About
            </a>
            <a href="/projects" className="premium-nav-link">
              💼 Projects
            </a>
            <a href="/resume" className="premium-nav-link">
              📄 Resume
            </a>
            <a href="/contact" className="premium-nav-link">
              📧 Contact
            </a>
            
            <button
              className="premium-button"
              onClick={toggleTheme}
              title={currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {currentTheme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          
          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <nav className="mobile-nav">
              <a href="/" className="premium-nav-link">
                🏠 Home
              </a>
              <a href="/about" className="premium-nav-link">
                👤 About
              </a>
              <a href="/projects" className="premium-nav-link">
                💼 Projects
              </a>
              <a href="/resume" className="premium-nav-link">
                📄 Resume
              </a>
              <a href="/contact" className="premium-nav-link">
                📧 Contact
              </a>
              
              <button
                className="premium-button"
                onClick={toggleTheme}
                style={{ alignSelf: 'center', marginTop: '10px' }}
              >
                {currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;