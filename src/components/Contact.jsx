import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Contact information
  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'kumaripragatiii03@gmail.com',
      link: 'mailto:kumaripragatiii03@gmail.com',
      color: '#3B82F6'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91 98765 43210',
      link: 'tel:+919876543210',
      color: '#10B981'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Mumbai, India',
      link: 'https://maps.google.com/?q=Mumbai,India',
      color: '#8B5CF6'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: '/in/kpragati03',
      link: 'https://www.linkedin.com/in/kpragati03/',
      color: '#EC4899'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for animations
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);

    try {
      // <-- CHANGE HERE: Use the environment variable
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/contact`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          phone: "",    // You can add phone and subject fields if you have them
          subject: ""
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div id="contact" className="contact-section">
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

      <Container style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <Row className="justify-content-center mb-5">
          <Col md={12} className={`text-center hero-content ${isVisible ? 'fade-in' : ''}`}>
            <div className="hero-badge mb-4">
              <button 
                onClick={scrollToForm}
                type="button"
                className="badge-content"
              >
                <i className="fas fa-paper-plane me-2"></i>
                Get In Touch
              </button>
            </div>
            
            <h1 className="hero-title mb-4">
              Contact <span className="gradient-text">Me</span>
            </h1>
            
            <p className="hero-description">
              Have a project in mind or want to collaborate? I'd love to hear from you! 
              Let's create something amazing together.
            </p>
          </Col>
        </Row>

        {/* Contact Info Cards */}
        <Row className="justify-content-center mb-5">
          <Col md={12}>
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-item animate-on-scroll"><a 
                    href={info.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-info-card"
                  >
                    <div 
                      className="contact-info-icon" 
                      style={{ backgroundColor: info.color }}
                    >
                      <i className={info.icon}></i>
                    </div>
                    <h5 className="contact-info-title">
                      {info.title}
                    </h5>
                    <p className="contact-info-value">
                      {info.value}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="contact-form-card animate-on-scroll" id="contact-form">
              <Card.Body className="p-4 p-md-5">
                <div className="form-header text-center">
                  <h2 className="form-title">
                    <span className="title-icon">💬</span>
                    Send Message
                  </h2>
                  <p className="form-subtitle">
                    Fill out the form below and I'll get back to you soon!
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="fas fa-user me-2"></i>
                          Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <i className="fas fa-envelope me-2"></i>
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      <i className="fas fa-comment-dots me-2"></i>
                      Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      style={{
                        resize: 'vertical',
                        minHeight: '120px'
                      }}
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-100 submit-btn ${isLoading ? 'loading' : ''}`}
                  >
                    <div className="btn-content">
                      {isLoading ? (
                        <>
                          <div className="spinner"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Message
                        </>
                      )}
                    </div>
                  </Button>
                </Form>

                {/* Status Message */}
                {status && (
                  <div className={`status-message ${status === 'success' ? 'status-success' : 'status-error'}`}>
                    <div className="status-content">
                      <div className="status-icon">
                        <i className={`${status === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'}`}></i>
                      </div>
                      <p className="status-text">
                        {status === 'success' 
                          ? "Message sent successfully! I'll get back to you soon."
                          : "Oops! Something went wrong. Please try again."
                        }
                      </p>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Social Links Section */}
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <div className="cta-section animate-on-scroll">
              <h3 className="cta-title">
                Let's Build Something Amazing Together!
              </h3>
              <p className="cta-description">
                Whether you have a project in mind, need consultation, or just want to connect, 
                I'm always excited to collaborate and create innovative solutions.
              </p>
              <div className="social-links">
                {[
                  { icon: 'fab fa-github', link: 'https://github.com/kpragati03' },
                  { icon: 'fab fa-linkedin', link: 'https://www.linkedin.com/in/kpragati03/' },
                  { icon: 'fab fa-twitter', link: 'https://x.com/?' },
                  { icon: 'fab fa-instagram', link: 'https://instagram.com/' }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;