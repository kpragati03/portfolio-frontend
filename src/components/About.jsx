import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const skills = [
  { name: 'React.js', level: 85, color: '#61DAFB' },
  { name: 'JavaScript', level: 88, color: '#F7DF1E' },
  { name: 'Node.js', level: 82, color: '#339933' },
  { name: 'MongoDB', level: 78, color: '#47A248' },
  { name: 'HTML5 / CSS3', level: 95, color: '#ec4899' },
  { name: 'Express.js', level: 80, color: '#a78bfa' },
  { name: 'Bootstrap', level: 85, color: '#7952B3' },
  { name: 'REST APIs', level: 80, color: '#3B82F6' },
  { name: 'Git & GitHub', level: 88, color: '#F05032' },
  { name: 'Responsive Design', level: 92, color: '#10B981' },
];

const interests = [
  { icon: '💻', name: 'Web Development' },
  { icon: '🧩', name: 'Problem Solving' },
  { icon: '🚀', name: 'New Technologies' },
  { icon: '📚', name: 'Tech Blogs' },
  { icon: '🌟', name: 'Open Source' },
  { icon: '🎨', name: 'UI/UX Design' },
  { icon: '✍️', name: 'Tech Writing' },
  { icon: '📊', name: 'Digital Marketing' },
  { icon: '💼', name: 'Freelancing' },
  { icon: '🛠️', name: 'Tech Delivery' },
  { icon: '📅', name: 'Project Management' },
  { icon: '🌱', name: 'Sustainability Tech' },
  { icon: '🤝', name: 'Team Leadership' },
  { icon: '💡', name: 'Innovation' },
];

const infoRows = [
  { label: 'Degree', value: 'B.Tech Computer Science' },
  { label: 'University', value: 'Lovely Professional University' },
  { label: 'CGPA', value: '7.3 / 10' },
  { label: 'Location', value: 'India 🇮🇳' },
  { label: 'Status', value: 'Open to Work ✅' },
];

const SkillBar = ({ skill, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06 }} style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>{skill.name}</span>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: skill.color }}>{skill.level}%</span>
      </div>
      <div style={{ height: 7, background: 'var(--bg3)', borderRadius: 50, overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.3, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', borderRadius: 50, background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`, boxShadow: `0 0 8px ${skill.color}66` }} />
      </div>
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, x = 0, y = 20 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x, y }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
};

const About = () => {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>

      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '5%', right: '-5%', width: 400, height: 400, borderRadius: '60% 40% 70% 30%/50% 60% 40% 50%', background: 'rgba(167,139,250,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 350, height: 350, borderRadius: '40% 60% 30% 70%/60% 40% 60% 40%', background: 'rgba(236,72,153,0.07)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-tag" style={{ margin: '0 auto 20px' }}>🌸 About Me</div>
            <h1 className="serif" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-2px', marginBottom: 22, lineHeight: 1.05 }}>
              Crafting Digital{' '}
              <span className="shimmer-text">Experiences</span>
            </h1>
            <p style={{ color: 'var(--text2)', maxWidth: 640, margin: '0 auto', lineHeight: 1.9, fontSize: '1.08rem', fontWeight: 400 }}>
              Hello! I'm <strong style={{ color: 'var(--pink)' }}>Pragati</strong>, a passionate MERN Stack Developer. My journey began with curiosity about how web apps work, and evolved into a passion for building robust, scalable solutions that are both beautiful and performant. 💕
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div ref={statsRef} className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 60 }}>
            {[
              { value: 5, suffix: '+', label: 'Projects Built', icon: '🚀' },
              { value: 12, suffix: '+', label: 'Technologies', icon: '⚡' },
              { value: 3, suffix: '+', label: 'Years Learning', icon: '📅' },
              { value: 8, suffix: '+', label: 'Certifications', icon: '🏆' },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ y: -6, boxShadow: 'var(--shadow2)' }}
                className="card" style={{ padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{s.icon}</div>
                <div className="serif shimmer-text" style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1 }}>
                  {statsInView ? <CountUp end={s.value} duration={2} suffix={s.suffix} /> : `0${s.suffix}`}
                </div>
                <div style={{ color: 'var(--text2)', fontSize: '0.82rem', marginTop: 6, fontWeight: 600 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Skills + Info */}
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 48 }}>

          <FadeIn delay={0.15} x={-20} y={0}>
            <div className="card" style={{ padding: 32 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: 'var(--grad1)', borderRadius: 10, padding: '6px 10px', fontSize: '1rem' }}>⚡</span>
                Technical Skills
              </h2>
              {skills.map((skill, i) => <SkillBar key={i} skill={skill} index={i} />)}
            </div>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <FadeIn delay={0.2} x={20} y={0}>
              <div className="card" style={{ padding: 32 }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>🎓 Quick Info</h2>
                {infoRows.map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text3)', fontSize: '0.9rem', fontWeight: 500 }}>{row.label}</span>
                    <span style={{ color: 'var(--text)', fontSize: '0.9rem', fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.28} x={20} y={0}>
              <motion.a href="https://drive.google.com/file/d/1P6q5sZem7X81e4UwrsCFC6HCTXVCFzLY/view?usp=drive_link"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: 'var(--shadow2)' }} whileTap={{ scale: 0.97 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'var(--grad1)', borderRadius: 20, padding: '18px 32px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', boxShadow: 'var(--glow)' }}>
                💾 Download Resume
              </motion.a>
            </FadeIn>
          </div>
        </div>

        {/* What I Do */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: 56 }}>
            <h2 className="serif" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', marginBottom: 28, textAlign: 'center' }}>✨ What I Do</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
              {[
                { icon: '🛠️', title: 'Technical Delivery Manager', desc: 'Overseeing project delivery, timelines, and cross-functional team coordination.' },
                { icon: '📊', title: 'Digital Marketing', desc: 'Driving growth through SEO, social media strategy, and data-driven campaigns.' },
                { icon: '💼', title: 'Freelancer', desc: 'Delivering end-to-end web solutions for clients across diverse industries.' },
                { icon: '📅', title: 'Project Manager', desc: 'Planning, executing, and closing projects with agile methodologies and clear communication.' },
                { icon: '🎨', title: 'UI/UX Design', desc: 'Crafting beautiful, intuitive interfaces that users love to interact with.' },
                { icon: '⚛️', title: 'Frontend Dev', desc: 'Building fast, responsive React apps with smooth animations and clean code.' },
                { icon: '🔧', title: 'Backend Dev', desc: 'Designing robust REST APIs with Node.js, Express, and MongoDB.' },
                { icon: '📱', title: 'Responsive Design', desc: 'Ensuring pixel-perfect experiences across all devices and screen sizes.' },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ y: -8, boxShadow: 'var(--shadow2)' }} className="card"
                  style={{ padding: '28px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.75 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Interests */}
        <FadeIn delay={0.2}>
          <div style={{ textAlign: 'center' }}>
            <h2 className="serif" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>💖 Interests & Passions</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {interests.map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.08, y: -5, boxShadow: 'var(--shadow2)' }} whileTap={{ scale: 0.95 }}
                  style={{ background: 'var(--surface)', border: '1.5px solid var(--border2)', borderRadius: 50, padding: '12px 26px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'default', backdropFilter: 'blur(10px)' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 600 }}>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default About;
