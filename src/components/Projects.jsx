import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    id: 1,
    name: 'Resume Generator Website',
    description: 'A dynamic resume builder that lets users create, customize, and download professional resumes instantly with a clean and intuitive interface.',
    emoji: '📄',
    gradient: 'linear-gradient(135deg, #f43f5e, #ec4899, #a78bfa)',
    github: 'https://github.com/kpragati03/resume-generator-frontend',
    live: 'https://resume-generator-frontend-two.vercel.app',
    status: 'Completed',
    category: 'Frontend',
    technologies: ['React', 'JavaScript', 'CSS', 'Vercel'],
    features: ['Resume Builder', 'Live Preview', 'Download PDF', 'Responsive Design'],
  },
  {
    id: 2,
    name: 'Multivendor E-commerce App',
    description: 'A comprehensive full-stack multivendor e-commerce platform with user & vendor dashboards, product management, order processing, and secure payment integration.',
    emoji: '🛍️',
    gradient: 'linear-gradient(135deg, #c084fc, #e879f9, #f472b6)',
    github: 'https://github.com/Aditya06Prasad/Multivendor-Ecommerce-WebApp',
    live: null,
    status: 'Completed',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Stripe'],
    features: ['Multi-vendor Support', 'Payment Gateway', 'Admin Dashboard', 'Order Management'],
  },
  {
    id: 3,
    name: 'Personal Portfolio Website',
    description: 'This very portfolio you are viewing! Built with React, Framer Motion, and a custom Node.js backend with MongoDB for the contact form.',
    emoji: '💻',
    gradient: 'linear-gradient(135deg, #fda4af, #f9a8d4, #c4b5fd)',
    github: 'https://github.com/kpragati03/portfolio-frontend',
    live: null,
    status: 'On-going',
    category: 'Full Stack',
    technologies: ['React', 'Framer Motion', 'Node.js', 'MongoDB'],
    features: ['Animations', 'Dark Theme', 'Contact Form', 'Responsive'],
  },
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="card" style={{ overflow: 'hidden', cursor: 'default' }}>

      {/* Gradient top */}
      <div style={{ height: 180, background: project.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div animate={{ scale: hovered ? 1.3 : 1, rotate: hovered ? 15 : 0 }} transition={{ duration: 0.4 }}
          style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>
          {project.emoji}
        </motion.div>

        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

        <div style={{ position: 'absolute', top: 12, right: 12, background: project.status === 'Completed' ? 'rgba(34,197,94,0.2)' : 'rgba(251,191,36,0.2)', border: `1px solid ${project.status === 'Completed' ? 'rgba(34,197,94,0.5)' : 'rgba(251,191,36,0.5)'}`, borderRadius: 50, padding: '4px 12px', color: project.status === 'Completed' ? '#16a34a' : '#d97706', fontSize: '0.72rem', fontWeight: 700, backdropFilter: 'blur(10px)' }}>
          {project.status}
        </div>
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.2)', borderRadius: 50, padding: '4px 12px', color: '#fff', fontSize: '0.72rem', fontWeight: 600, backdropFilter: 'blur(10px)' }}>
          {project.category}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, backdropFilter: 'blur(4px)' }}>
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 50, padding: '10px 20px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem', backdropFilter: 'blur(10px)' }}>
                🔗 View Code
              </motion.a>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => project.live ? window.open(project.live, '_blank') : alert('Coming Soon! 🌸')}
                style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 50, padding: '10px 20px', color: '#fff', fontWeight: 700, fontSize: '0.82rem', backdropFilter: 'blur(10px)', cursor: 'pointer' }}>
                🚀 Live Demo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        <h3 className="serif" style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 10, lineHeight: 1.3 }}>{project.name}</h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: 16 }}>{project.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
          {project.technologies.map((t, i) => (
            <span key={i} style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: 50, padding: '4px 13px', color: 'var(--pink)', fontSize: '0.82rem', fontWeight: 600 }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.features.map((f, i) => (
            <span key={i} style={{ color: 'var(--text2)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: 'var(--pink)' }}>✓</span> {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const filtered = projects;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 400, height: 400, borderRadius: '60% 40% 70% 30%/50% 60% 40% 50%', background: 'rgba(236,72,153,0.07)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-tag" style={{ margin: '0 auto 20px' }}>🚀 Featured Work</div>
          <h1 className="serif" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-2px', marginBottom: 14, lineHeight: 1.05 }}>
            My <span className="shimmer-text">Projects</span> ✨
          </h1>
          <p style={{ color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75, fontSize: '1.05rem', fontWeight: 400 }}>
            Showcasing innovative solutions and creative implementations 💕
          </p>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 24, marginBottom: 60 }}>
            {filtered.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {[
            { value: '3+', label: 'Projects Completed', icon: '🌸' },
            { value: '5+', label: 'Technologies Used', icon: '⚡' },
            { value: '100%', label: 'Client Satisfaction', icon: '💖' },
            { value: '24/7', label: 'Availability', icon: '✨' },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="card" style={{ padding: '22px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{s.icon}</div>
              <div className="serif shimmer-text" style={{ fontSize: '1.8rem', fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: 'var(--text2)', fontSize: '0.82rem', marginTop: 5, fontWeight: 600 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
