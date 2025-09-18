import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const profileImage = "https://placehold.co/300x300/007bff/ffffff?text=Pragati";
  const navigate = useNavigate();
  
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  
  const titles = [
    "MERN Stack Developer",
    "Frontend Specialist", 
    "Full-Stack Engineer",
    "UI/UX Enthusiast"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotating titles animation
    const titleInterval = setInterval(() => {
      setCurrentTitle(prev => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(titleInterval);
  }, []);

  const socialLinks = [
    {
      icon: "📱",
      name: "github",
      url: "https://github.com/kpragati03"
    },
    {
      icon: "💼", 
      name: "linkedin",
      url: "https://www.linkedin.com/in/kpragati03/"
    },
    {
      icon: "📧",
      name: "email", 
      url: "mailto:kumaripragatiii03@gmail.com"
    },
    {
      icon: "📞",
      name: "phone",
      url: "tel:+919876543210"
    }
  ];

  return (
    <div id="home" className="home-container">
      {/* Animated Background Elements */}
      <div className="bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <Container className="main-content">
        <Row className="align-items-center flex-column-reverse flex-md-row min-vh-100">
          
          {/* Text Content */}
          <Col md={7} className={`text-content ${isVisible ? 'animate-in' : ''}`}>
            
            {/* Welcome Badge */}
            <div className="welcome-badge">
              <span className="sparkle">✨</span>
              <span>Welcome to my portfolio</span>
            </div>

            {/* Main Heading */}
            <h1 className="main-heading">
              Hi, I'm <span className="name-highlight">Pragati</span>
            </h1>
            
            {/* Rotating Title */}
            <div className="rotating-title-container">
              <span className="title-prefix">A passionate </span>
              <span className="rotating-title">{titles[currentTitle]}</span>
            </div>

            {/* Description */}
            <p className="description">
              Crafting beautiful and functional web applications with modern technologies. 
              I transform innovative ideas into digital realities, creating seamless user 
              experiences that make a lasting impact.
            </p>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Button 
                className="primary-btn"
                size="lg" 
                onClick={() => navigate('/projects')}
              >
                <span className="btn-icon">💼</span>
                View My Work
                <span className="btn-arrow">→</span>
              </Button>
              
              <Button 
                className="secondary-btn"
                size="lg" 
                onClick={() => navigate('/contact')}
              >
                <span className="btn-icon">📧</span>
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target={social.name === 'email' || social.name === 'phone' ? '_self' : '_blank'}
                  rel={social.name === 'email' || social.name === 'phone' ? '' : 'noopener noreferrer'}
                  className={`social-btn ${social.name}`}
                >
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </Col>

          {/* Profile Image */}
          <Col md={5} className={`image-content ${isVisible ? 'animate-in-right' : ''}`}>
            <div className="profile-container">
              
              {/* Animated Rings */}
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
              
              {/* Profile Image */}
              <div className="profile-image-wrapper">
                <Image 
                  src={profileImage} 
                  className="profile-image"
                  alt="Pragati's Profile"
                />
                
                {/* Status Badges */}
                <div className="status-badge available">
                  <span className="status-dot"></span>
                  Available
                </div>
                
                <div className="status-badge top-rated">
                  <span className="star">⭐</span>
                  Top Rated
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
      </div>
    </div>
  );
};

export default Home;