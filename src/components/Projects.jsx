import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const projects = [
  {
    id: 1,
    name: 'Resume Generator Website',
    description: 'A dynamic resume builder that lets users create, customize, and download professional resumes instantly with a clean and intuitive interface.',
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
    github: 'https://github.com/kpragati03/portfolio-frontend',
    live: null,
    status: 'On-going',
    category: 'Full Stack',
    technologies: ['React', 'Framer Motion', 'Node.js', 'MongoDB'],
    features: ['Animations', 'Dark Mode', 'Contact Form', 'Responsive'],
  },
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="card" style={{ overflow: 'hidden', cursor: 'default' }}>

      {/* Dark top panel — matches reference's #121212 card tops */}
      <div style={{ height: 160, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>

        {/* Terminal dots */}
        <div style={{ position: 'absolute', top: 14, left: 16, display: 'flex', gap: 6 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', padding: '0 16px' }}>
          {project.name.toLowerCase().replace(/\s+/g, '-')}
        </div>

        <div style={{ position: 'absolute', top: 12, right: 12, background: project.status === 'Completed' ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.15)', border: `1px solid ${project.status === 'Completed' ? 'rgba(34,197,94,0.4)' : 'rgba(251,191,36,0.4)'}`, borderRadius: 50, padding: '3px 10px', color: project.status === 'Completed' ? '#4ade80' : '#fbbf24', fontSize: '0.68rem', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
          {project.status}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '8px 18px', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, textTransform: 'uppercase' }}>
                GitHub
              </motion.a>
              <motion.button
                initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
                onClick={() => project.live ? window.open(project.live, '_blank') : alert('Coming Soon!')}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '8px 18px', color: '#fff', fontWeight: 600, fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>
                Live Demo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3, fontFamily: "'Space Grotesk', sans-serif" }}>{project.name}</h3>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: 1, textTransform: 'uppercase', flexShrink: 0, marginLeft: 8 }}>{project.category}</span>
        </div>
        <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: 14 }}>{project.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {project.technologies.map((t, i) => (
            <span key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 50, padding: '3px 10px', color: 'var(--text2)', fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.features.map((f, i) => (
            <span key={i} style={{ color: 'var(--text3)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'JetBrains Mono', monospace" }}>
              <span style={{ color: 'var(--text2)' }}>▹</span> {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)', position: 'relative', zIndex: 1 }}>

        <motion.div ref={ref} initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-tag" style={{ margin: '0 auto 20px' }}>Featured Work</div>
          <h1 className="serif" style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-2px', marginBottom: 14, lineHeight: 1.05 }}>
            My <span className="shimmer-text">Projects</span>
          </h1>
          <p style={{ color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.75, fontSize: '0.9rem' }}>
            A selection of things I've built
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: 20, marginBottom: 48 }}>
          {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 14 }}>
          {[
            { value: '3+', label: 'Projects' },
            { value: '5+', label: 'Technologies' },
            { value: '100%', label: 'Dedication' },
            { value: '24/7', label: 'Availability' },
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} className="card" style={{ padding: '20px 14px', textAlign: 'center' }}>
              <div className="serif" style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'var(--text3)', fontSize: '0.68rem', marginTop: 6, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
