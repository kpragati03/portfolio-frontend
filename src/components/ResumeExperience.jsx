import React, { useState, useEffect } from 'react';
import { Download, Briefcase, GraduationCap, Calendar, Star, Code, Users, Trophy, Award, BookOpen } from 'lucide-react';
import './ResumeExperience.css';

const ResumeExperience = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [bubbles, setBubbles] = useState([]);

  const resumePdfUrl = 'https://drive.google.com/file/d/1CD-Kwn6SVhhdKMpZXC54KROIufoOj8zu/view?usp=drive_link';

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      const colors = ['#4f8ef7', '#f59e0b', '#10b981', '#ef4444', '#a855f7', '#ec4899', '#22c55e'];

      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 80 + 30,
          left: Math.random() * 100,
          delay: Math.random() * 15,
          duration: Math.random() * 8 + 12,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  const experiences = [
    {
      id: 1,
      title: 'MERN Stack Intern',
      company: 'INTERNSELITE',
      duration: 'July 2025 - On-going',
      description: 'Working on full-stack web development projects using React, Node.js, Express.js, and MongoDB. Contributing to API design, database management, and implementing responsive UI components.',
      icon: Code,
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      status: 'Current'
    },
    {
      id: 2,
      title: 'Social Media Manager',
      company: 'Hungary Nomads',
      duration: 'June 2024 - August 2024',
      description: 'Managed social media campaigns, content creation, and community engagement to boost brand presence and audience interaction.',
      icon: Users,
      skills: ['Social Media', 'Content Creation', 'Marketing', 'Analytics'],
      status: 'Completed'
    }
  ];

  const education = [
    {
      id: 3,
      degree: 'Bachelor of Technology in Computer Science',
      university: 'Lovely Professional University',
      duration: 'August 2023 - July 2027',
      description: 'Currently pursuing B.Tech with a focus on data structures, algorithms, software engineering, and web technologies. Actively participating in coding competitions and departmental projects.',
      icon: GraduationCap,
      grade: 'Current CGPA: 8.5/10',
      status: 'Pursuing'
    },
    {
      id: 4,
      degree: 'Higher Secondary Education',
      university: 'Model School Dalmianagar',
      duration: '2020 - 2022',
      description: 'Completed higher secondary education in the science stream with a focus on Physics, Chemistry, and Mathematics.',
      icon: Award,
      grade: 'Percentage: 85%',
      status: 'Completed'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '15+', icon: Code },
    { label: 'Technologies', value: '12+', icon: Star },
    { label: 'Years Learning', value: '3+', icon: Calendar },
    { label: 'Certifications', value: '8+', icon: Trophy }
  ];

  const TimelineCard = ({ item, index }) => {
    const IconComponent = item.icon;
    const isVisible = visibleItems.has(`timeline-${item.id}`);

    return (
      <div
        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}
        data-animate
        data-id={`timeline-${item.id}`}
      >
        <div className="timeline-content">
          <div className="timeline-card">
            <div className="card-header">
              <div className="icon-container">
                <IconComponent size={24} />
              </div>
            </div>
            <div className="card-body">
              <div className="card-main-content">
                <h3 className="card-title">
                  {item.title || item.degree}
                </h3>
                <p className="card-subtitle">{item.company || item.university}</p>
                <p className="card-duration">
                  <Calendar size={16} />
                  {item.duration}
                </p>
                {item.grade && (
                  <p className="card-grade">
                    <Star size={16} />
                    {item.grade}
                  </p>
                )}
                <p className="card-description">{item.description}</p>
                {item.skills && (
                  <div className="skills-list">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="status-badge-container">
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline-dot">
          <div className="dot-inner"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="resume-experience">
      <div className="bubbles-container">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="floating-bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              opacity: bubble.opacity,
              background: `linear-gradient(135deg, ${bubble.color}, transparent)`
            }}
          />
        ))}
      </div>

      <div className="container">
        <section className="hero-section">
          <div className="hero-content" data-animate data-id="hero">
            <h1 className="hero-title">
              My <span className="highlight">Resume</span> & Experience
            </h1>
            <p className="hero-subtitle">
              Crafting digital experiences with passion and precision
            </p>
            <div className="download-container">
              <div className="download-wrapper">
                <a
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  <div className="btn-content">
                    <Download size={24} />
                    <span className="btn-text">Download Resume</span>
                  </div>
                  <div className="btn-glow"></div>
                </a>
              </div>
              <p className="download-note">Get my complete professional resume</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const isVisible = visibleItems.has(`stat-${index}`);

              return (
                <div
                  key={index}
                  className={`stat-card ${isVisible ? 'visible' : ''}`}
                  data-animate
                  data-id={`stat-${index}`}
                >
                  <div className="stat-icon">
                    <IconComponent size={28} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="tabs-section">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <Briefcase size={18} />
              <span className="tab-text">Experience</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <BookOpen size={18} />
              <span className="tab-text">Education</span>
            </button>
          </div>
        </section>

        <section className="timeline-section">
          <div className="section-header">
            <h2 className="section-title">
              {activeTab === 'experience' ? (
                <>
                  <Briefcase size={24} />
                  Work Experience
                </>
              ) : (
                <>
                  <BookOpen size={24} />
                  Education
                </>
              )}
            </h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            {activeTab === 'experience' && (
              <div className="timeline-items">
                {experiences.map((item, index) => (
                  <TimelineCard key={item.id} item={item} index={index} />
                ))}
              </div>
            )}
            {activeTab === 'education' && (
              <div className="timeline-items">
                {education.map((item, index) => (
                  <TimelineCard key={item.id} item={item} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeExperience;