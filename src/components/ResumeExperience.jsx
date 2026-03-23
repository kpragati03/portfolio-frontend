import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const experiences = [
  {
    id: 1,
    title: 'Technical Delivery Manager',
    org: 'CodeFeast',
    duration: 'Oct 2025 - Ongoing',
    description: 'Leading technical delivery of projects, managing cross-functional teams, overseeing sprint planning, ensuring timely delivery of milestones, and maintaining quality standards across all development cycles.',
    tags: ['Project Management', 'Agile', 'Team Leadership', 'Delivery'],
    status: 'Current',
    icon: '🛠️',
    color: 'var(--pink)',
    colorHex: '#ec4899',
  },
  {
    id: 2,
    title: 'Digital Marketing Freelancer',
    org: 'Freelance',
    duration: 'Ongoing',
    description: 'Providing end-to-end digital marketing services including SEO, social media strategy, content creation, and performance analytics for clients across diverse industries.',
    tags: ['SEO', 'Social Media', 'Content Strategy', 'Analytics'],
    status: 'Current',
    icon: '📊',
    color: 'var(--mauve)',
    colorHex: '#9333ea',
  },
  {
    id: 3,
    title: 'Virtual SDE Intern',
    org: 'JP Morgan Chase & Co.',
    duration: 'Oct 2025',
    description: 'Completed JP Morgan virtual software engineering internship, working on real-world financial technology tasks including data visualization, interface fixes, and software engineering best practices.',
    tags: ['Python', 'React', 'Data Visualization', 'FinTech'],
    status: 'Completed',
    icon: '🏦',
    color: 'var(--lavender)',
    colorHex: '#7c3aed',
  },
  {
    id: 4,
    title: 'MERN Stack Intern',
    org: 'InternsElite',
    duration: 'July 2025 - Aug 2025',
    description: 'Completed an intensive training and internship program focused on full-stack web development. Built real-world projects using the MERN stack, learned REST API design, database management, and responsive UI development.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    status: 'Completed',
    icon: '💻',
    color: 'var(--rose)',
    colorHex: '#e11d48',
  },
  {
    id: 5,
    title: 'Digital Marketing Freelancer',
    org: 'Freelance',
    duration: 'June 2024 - Aug 2024',
    description: 'Managed social media campaigns, content creation, and community engagement for multiple clients. Developed and executed marketing strategies that boosted brand presence and audience interaction.',
    tags: ['Social Media', 'Content Creation', 'Marketing', 'Branding'],
    status: 'Completed',
    icon: '📱',
    color: 'var(--blush)',
    colorHex: '#f472b6',
  },
];

const education = [
  {
    id: 6,
    title: 'B.Tech in Computer Science',
    org: 'Lovely Professional University',
    duration: 'August 2023 - July 2027',
    description: 'Pursuing B.Tech with focus on data structures, algorithms, software engineering, and web technologies. Actively participating in coding competitions and departmental projects.',
    tags: ['DSA', 'Web Dev', 'DBMS', 'OS'],
    status: 'Pursuing',
    icon: '🎓',
    color: 'var(--lavender)',
    colorHex: '#a78bfa',
    grade: 'CGPA: 7.3 / 10',
  },
  {
    id: 7,
    title: 'Higher Secondary (Intermediate)',
    org: 'Model School Dalmianagar, Dehri-On-Sone, Bihar',
    duration: 'Apr 2021 - Mar 2022',
    description: 'Completed Intermediate education in the science stream with focus on Physics, Chemistry, and Mathematics.',
    tags: ['Physics', 'Chemistry', 'Mathematics'],
    status: 'Completed',
    icon: '📚',
    color: 'var(--rose)',
    colorHex: '#f43f5e',
    grade: 'Percentage: 81.6%',
  },
  {
    id: 8,
    title: 'Matriculation',
    org: 'Model School Dalmianagar, Dehri-On-Sone, Bihar',
    duration: 'Apr 2019 - Mar 2020',
    description: 'Completed matriculation with distinction, building a strong foundation in core sciences and mathematics.',
    tags: ['Science', 'Mathematics', 'English'],
    status: 'Completed',
    icon: '🏫',
    color: 'var(--pink)',
    colorHex: '#ec4899',
    grade: 'Percentage: 91%',
  },
];

const TimelineCard = ({ item, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={{ display: 'flex', gap: 0, marginBottom: 20 }}>
      <div style={{ width: 4, background: `linear-gradient(180deg, ${item.colorHex}, ${item.colorHex}44)`, borderRadius: '4px 0 0 4px', flexShrink: 0 }} />
      <motion.div whileHover={{ x: 4, boxShadow: 'var(--shadow2)' }} transition={{ duration: 0.2 }}
        className="card" style={{ flex: 1, padding: '24px 28px', borderRadius: '0 20px 20px 0', borderLeft: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `${item.colorHex}18`, border: `1.5px solid ${item.colorHex}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <h3 className="serif" style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 3 }}>{item.title}</h3>
              <div style={{ color: item.color, fontSize: '0.9rem', fontWeight: 600 }}>{item.org}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--text3)', fontSize: '0.82rem', marginBottom: 6 }}>📅 {item.duration}</div>
            {item.grade && <div style={{ color: item.color, fontSize: '0.75rem', marginBottom: 6 }}>⭐ {item.grade}</div>}
            <span style={{ background: item.status === 'Current' || item.status === 'Pursuing' ? 'rgba(34,197,94,0.12)' : 'var(--bg3)', border: `1px solid ${item.status === 'Current' || item.status === 'Pursuing' ? 'rgba(34,197,94,0.4)' : 'var(--border2)'}`, borderRadius: 50, padding: '3px 12px', color: item.status === 'Current' || item.status === 'Pursuing' ? '#16a34a' : 'var(--pink)', fontSize: '0.7rem', fontWeight: 700 }}>
              {item.status}
            </span>
          </div>
        </div>
        <p style={{ color: 'var(--text2)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: 14 }}>{item.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {item.tags.map((t, i) => (
            <span key={i} style={{ background: `${item.colorHex}14`, border: `1px solid ${item.colorHex}33`, borderRadius: 50, padding: '3px 12px', color: item.color, fontSize: '0.72rem', fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ResumeExperience = () => {
  const [tab, setTab] = useState('experience');
  const items = tab === 'experience' ? experiences : education;
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '15%', right: '-5%', width: 380, height: 380, borderRadius: '60% 40% 70% 30%/50% 60% 40% 50%', background: 'rgba(167,139,250,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div ref={headerRef} initial={{ opacity: 0, y: -20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-tag" style={{ margin: '0 auto 20px' }}>📄 My Journey</div>
          <h1 className="serif" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-2px', marginBottom: 24, lineHeight: 1.05 }}>
            Resume & <span className="shimmer-text">Experience</span>
          </h1>
          <motion.a href="https://drive.google.com/file/d/1P6q5sZem7X81e4UwrsCFC6HCTXVCFzLY/view?usp=drive_link"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: 'var(--shadow2)' }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--grad1)', borderRadius: 50, padding: '13px 30px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem', boxShadow: 'var(--glow)' }}>
            💾 Download Resume
          </motion.a>
        </motion.div>

        {/* Stats */}
        <div ref={statsRef} className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 14, marginBottom: 48 }}>
          {[
            { value: 5, suffix: '+', label: 'Projects', icon: '🚀' },
            { value: 12, suffix: '+', label: 'Technologies', icon: '⚡' },
            { value: 3, suffix: '+', label: 'Years Learning', icon: '📅' },
            { value: 8, suffix: '+', label: 'Certifications', icon: '🏆' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }} className="card" style={{ padding: '20px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{s.icon}</div>
              <div className="serif shimmer-text" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                {statsInView ? <CountUp end={s.value} duration={2} suffix={s.suffix} /> : `0${s.suffix}`}
              </div>
              <div style={{ color: 'var(--text2)', fontSize: '0.78rem', marginTop: 5, fontWeight: 600 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 36 }}>
          {['experience', 'education'].map(t => (
            <motion.button key={t} onClick={() => setTab(t)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ background: tab === t ? 'var(--grad1)' : 'var(--surface)', border: tab === t ? 'none' : '1.5px solid var(--border2)', borderRadius: 50, padding: '11px 28px', color: tab === t ? '#fff' : 'var(--text2)', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', transition: 'all 0.25s', boxShadow: tab === t ? 'var(--glow)' : 'none' }}>
              {t === 'experience' ? '💼 Experience' : '🎓 Education'}
            </motion.button>
          ))}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            {items.map((item, i) => <TimelineCard key={item.id} item={item} index={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeExperience;
