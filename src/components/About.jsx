import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredInterest, setHoveredInterest] = useState(null);

  const skills = [
    { name: 'HTML5', level: 95, color: '#E34F26' },
    { name: 'CSS3', level: 90, color: '#1572B6' },
    { name: 'JavaScript', level: 88, color: '#F7DF1E' },
    { name: 'React.js', level: 85, color: '#61DAFB' },
    { name: 'Node.js', level: 82, color: '#339933' },
    { name: 'Express.js', level: 80, color: '#68217A' },
    { name: 'MongoDB', level: 78, color: '#47A248' },
    { name: 'Bootstrap', level: 85, color: '#7952B3' },
    { name: 'Git', level: 88, color: '#F05032' },
    { name: 'REST APIs', level: 80, color: '#3B82F6' },
    { name: 'Responsive Design', level: 92, color: '#10B981' },
    { name: 'API Development', level: 82, color: '#8B5CF6' },
    { name: 'Frontend Development', level: 90, color: '#F59E0B' },
    { name: 'Backend Development', level: 78, color: '#EC4899' }
  ];

  const interests = [
    { 
      name: 'Web Development', 
      icon: '💻', 
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' 
    },
    { 
      name: 'Problem Solving', 
      icon: '🧩', 
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' 
    },
    { 
      name: 'Learning New Technologies', 
      icon: '🚀', 
      gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' 
    },
    { 
      name: 'Reading Tech Blogs', 
      icon: '📚', 
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' 
    },
    { 
      name: 'Open Source Contributions', 
      icon: '🌟', 
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
    },
    { 
      name: 'Technical Writing', 
      icon: '✍️', 
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' 
    },
    { 
      name: 'UI/UX Design', 
      icon: '🎨', 
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
    }
  ];

  const resumePdfUrl = 'https://drive.google.com/file/d/1CD-Kwn6SVhhdKMpZXC54KROIufoOj8zu/view?usp=drive_link';

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleResumeClick = () => {
    window.open(resumePdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="about" className="about-section">
      {/* Animated Background */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Floating Bubbles */}
      <div className="floating-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
        <div className="bubble bubble-7"></div>
        <div className="bubble bubble-8"></div>
        <div className="bubble bubble-9"></div>
        <div className="bubble bubble-10"></div>
      </div>

      <Container className="position-relative">
        {/* Hero Section */}
        <Row className="justify-content-center mb-5">
          <Col md={10} className={`text-center hero-content ${isVisible ? 'fade-in' : ''}`}>
            <div className="hero-badge mb-4">
              <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill">
                <i className="fas fa-code me-2"></i>
                Full Stack Developer
              </Badge>
            </div>
            
            <h1 className="hero-title mb-4">
              About <span className="gradient-text">Me</span>
            </h1>
            
            <div className="hero-description">
              <p className="lead mb-4">
                Hello! I'm <strong className="highlight-name">Pragati</strong>, a passionate and results-driven MERN Stack Developer. 
                My journey in web development began with a curiosity to understand how web applications work, 
                and it quickly evolved into a passion for building robust and scalable solutions.
              </p>
              <p className="mb-4">
                I thrive on turning complex challenges into elegant, intuitive, and efficient digital experiences. 
                With a solid foundation in both frontend and backend technologies, I focus on creating applications 
                that are not only visually appealing but also performant and user-friendly. 
                I am always eager to embrace new technologies and methodologies to deliver cutting-edge solutions.
              </p>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              className="resume-btn"
              onClick={handleResumeClick}
            >
              <span className="btn-content">
                <i className="fas fa-download me-2"></i>
                <span>Download Resume</span>
              </span>
              <div className="btn-glow"></div>
            </Button>
          </Col>
        </Row>

        {/* Skills Section */}
        <Row className="justify-content-center mb-5">
          <Col md={12} className="animate-on-scroll">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">
                <span className="title-icon">⚡</span>
                My Skills
                <span className="title-underline"></span>
              </h2>
              <p className="section-subtitle">Technologies I work with</p>
            </div>
            
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`skill-item animate-on-scroll`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-card">
                    <div className="skill-icon" style={{ backgroundColor: skill.color }}>
                      <i className="fas fa-code"></i>
                    </div>
                    <div className="skill-content">
                      <h5 className="skill-name">{skill.name}</h5>
                      <div className="skill-progress">
                        <div 
                          className="skill-progress-bar"
                          style={{ 
                            width: hoveredSkill === index ? `${skill.level}%` : '0%',
                            backgroundColor: skill.color
                          }}
                        ></div>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Interests Section */}
        <Row className="justify-content-center">
          <Col md={12} className="animate-on-scroll">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">
                <span className="title-icon">❤️</span>
                Interests
                <span className="title-underline"></span>
              </h2>
              <p className="section-subtitle">What drives my passion</p>
            </div>
            
            <div className="interests-grid">
              {interests.map((interest, index) => (
                <div 
                  key={index} 
                  className="interest-item animate-on-scroll"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredInterest(index)}
                  onMouseLeave={() => setHoveredInterest(null)}
                >
                  <div 
                    className="interest-card"
                    style={{ background: hoveredInterest === index ? interest.gradient : '' }}
                  >
                    <div className="interest-icon">{interest.icon}</div>
                    <h5 className="interest-name">{interest.name}</h5>
                    <div className="interest-glow"></div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;