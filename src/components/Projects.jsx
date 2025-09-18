import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const currentTheme = document.body.getAttribute('data-bs-theme') || 'light';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getPlaceholderImage = (text) => {
    if (currentTheme === 'dark') {
      return `https://placehold.co/400x250/343a40/ffffff?text=${text}`;
    }
    return `https://placehold.co/400x250/28a745/ffffff?text=${text}`;
  };

  const projects = [
    {
      id: 1,
      name: 'Multivendor E-commerce App',
      description: 'A comprehensive full-stack multivendor e-commerce platform. Features user and vendor dashboards, product management, order processing, and secure payment integration. Built using MERN stack.',
      imageText: 'Multivendor',
      github: 'https://github.com/Aditya06Prasad/Multivendor-Ecommerce-WebApp',
      liveDemo: 'https://multivendor-demo.com',
      status: 'Completed',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Stripe/PayPal'],
      features: ['Multi-vendor Support', 'Payment Gateway', 'Admin Dashboard', 'Order Management']
    },
    {
      id: 2,
      name: 'Counter App',
      description: 'A simple yet interactive counter application built with React. Demonstrates basic state management, event handling, and component lifecycle, providing a foundational understanding of React.',
      imageText: 'Counter',
      github: 'https://github.com/kpragati03/counter-app-final',
      liveDemo: 'https://counter-app-demo.com',
      status: 'Completed',
      technologies: ['React', 'JavaScript', 'CSS'],
      features: ['State Management', 'Event Handling', 'Responsive Design', 'Clean UI']
    },
    {
      id: 3,
      name: 'Personal Portfolio Website',
      description: 'This is the very portfolio website you are currently viewing! Built to showcase skills, projects, and achievements using the MERN stack and Bootstrap for responsive design and clean aesthetics.',
      imageText: 'Portfolio',
      github: 'https://github.com/yourusername/portfolio',
      liveDemo: window.location.href,
      status: 'On-going',
      technologies: ['React', 'Bootstrap', 'Node.js', 'Express.js', 'MongoDB'],
      features: ['Responsive Design', 'Modern UI', 'Interactive Animations', 'SEO Optimized']
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
        return 'status-completed';
      case 'On-going':
        return 'status-ongoing';
      case 'Planning':
        return 'status-planning';
      default:
        return 'status-completed';
    }
  };

  return (
    <div id="projects" className="projects-container">
      {/* Animated Background */}
      <div className="projects-bg-animation">
        <div className="floating-elements">
          <div className="element element-1"></div>
          <div className="element element-2"></div>
          <div className="element element-3"></div>
          <div className="element element-4"></div>
        </div>
        <div className="grid-pattern"></div>
      </div>

      <Container className="projects-content">
        {/* Header Section */}
        <div className={`projects-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="header-badge">
            <span className="badge-icon">🚀</span>
            <span>Featured Work</span>
          </div>
          
          <h1 className="projects-title">
            My <span className="title-highlight">Projects</span>
          </h1>
          
          <p className="projects-subtitle">
            Showcasing innovative solutions and creative implementations
          </p>
        </div>

        {/* Projects Grid */}
        <Row className="projects-grid">
          {projects.map((project, index) => (
            <Col 
              key={project.id} 
              md={6} 
              lg={4} 
              className={`project-col ${isVisible ? 'animate-in' : ''}`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div 
                className="project-card"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="project-image-container">
                  <img 
                    src={getPlaceholderImage(project.imageText)}
                    alt={project.name}
                    className="project-image"
                  />
                  
                  {/* Overlay */}
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <div className="project-links">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link github-link"
                          >
                            <span>📱</span>
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`project-status ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </div>
                </div>

                {/* Project Content */}
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  
                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  {project.features && (
                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="tech-badge"
                        style={{ animationDelay: `${0.5 + techIndex * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="project-actions">
                    {project.github && (
                      <Button 
                        className="action-btn primary-action"
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span className="btn-icon">💻</span>
                        <span>View Code</span>
                        <span className="btn-arrow">→</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No Projects Yet</h3>
            <p>Check back soon for exciting projects!</p>
          </div>
        )}

        {/* Stats Section */}
        <div className={`projects-stats ${isVisible ? 'animate-in' : ''}`}>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{projects.length}+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Technologies Used</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Availability</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Projects;