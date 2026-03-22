import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const contactInfo = [
  { icon: '💌', title: 'Email', value: 'pragati111kumari@gmail.com', link: 'mailto:pragati111kumari@gmail.com', color: '#db2777' },
  { icon: '📍', title: 'Location', value: 'India 🇮🇳', link: 'https://maps.google.com/?q=India', color: '#7c3aed' },
  { icon: '💼', title: 'LinkedIn', value: '/in/kpragati03', link: 'https://www.linkedin.com/in/kpragati03/', color: '#9333ea' },
  { icon: '🐱', title: 'GitHub', value: '/kpragati03', link: 'https://github.com/kpragati03', color: '#e11d48' },
];

const testimonials = [
  { name: 'Aditya Prasad', role: 'Project Collaborator', text: 'Pragati is an incredibly talented developer. Her attention to detail and passion for clean UI is unmatched. A true team player!', emoji: '🌟' },
  { name: 'Team INTERNSELITE', role: 'Internship Mentor', text: 'One of the most dedicated interns we have had. Pragati picks up new technologies fast and delivers quality work consistently.', emoji: '🚀' },
  { name: 'CodeFeast Team', role: 'TDM Internship', text: 'Pragati joined as our Technical Delivery Manager and immediately made an impact. She manages timelines, coordinates teams, and ensures every sprint is delivered on time with zero compromise on quality.', emoji: '🛠️' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [tRef, tInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: '', subject: '' }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '2px solid var(--border2)',
    padding: '14px 4px', color: 'var(--text)', fontSize: '1rem',
    outline: 'none', fontFamily: 'DM Sans, sans-serif',
    transition: 'border-color 0.25s', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 420, height: 420, borderRadius: '60% 40% 70% 30%/50% 60% 40% 50%', background: 'rgba(219,39,119,0.09)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 360, height: 360, borderRadius: '40% 60% 30% 70%/60% 40% 60% 40%', background: 'rgba(124,58,237,0.08)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div ref={headerRef} initial={{ opacity: 0, y: -20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-tag" style={{ margin: '0 auto 20px' }}>💌 Get In Touch</div>
          <h1 className="serif" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-2px', marginBottom: 18, lineHeight: 1.05 }}>
            Let's <span className="shimmer-text">Connect</span> 🌸
          </h1>
          <p style={{ color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.85, fontSize: '1.05rem', fontWeight: 400 }}>
            Have a project in mind or want to collaborate? I'd love to hear from you! 💕
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 56 }}>
          {contactInfo.map((info, i) => (
            <motion.a key={i} href={info.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -7, boxShadow: 'var(--shadow2)' }} whileTap={{ scale: 0.97 }}
              className="card" style={{ padding: '26px 18px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                style={{ fontSize: '2.2rem', marginBottom: 12 }}>{info.icon}</motion.div>
              <div style={{ color: info.color, fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{info.title}</div>
              <div style={{ color: 'var(--text2)', fontSize: '0.82rem', wordBreak: 'break-all', lineHeight: 1.5, fontWeight: 500 }}>{info.value}</div>
            </motion.a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div ref={formRef} initial={{ opacity: 0, y: 30 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
          style={{ maxWidth: 680, margin: '0 auto 72px' }}>
          <div className="card" style={{ padding: 'clamp(28px,5vw,52px)' }}>

            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <h2 className="serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
                Send a Message 💬
              </h2>
              <p style={{ color: 'var(--text2)', fontSize: '0.95rem', fontWeight: 400 }}>Fill out the form and I'll get back to you soon! 🌸</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text2)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Pragati Kumari"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderBottomColor = 'var(--pink)'}
                    onBlur={e => e.target.style.borderBottomColor = 'var(--border2)'} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text2)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderBottomColor = 'var(--pink)'}
                    onBlur={e => e.target.style.borderBottomColor = 'var(--border2)'} />
                </div>
              </div>

              <div style={{ marginBottom: 36 }}>
                <label style={{ display: 'block', color: 'var(--text2)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell me about your project... 💕" rows={5}
                  style={{ ...inputStyle, resize: 'none', borderBottom: '2px solid var(--border2)' }}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--pink)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--border2)'} />
              </div>

              <motion.button type="submit" disabled={loading}
                className="btn-primary"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: loading ? 0.7 : 1 }}>
                {loading
                  ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>🌸</motion.span> Sending...</>
                  : '💌 Send Message'}
              </motion.button>
            </form>

            <AnimatePresence>
              {status && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                  style={{ marginTop: 20, padding: '16px 20px', borderRadius: 16, background: status === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${status === 'success' ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`, color: status === 'success' ? '#15803d' : '#dc2626', textAlign: 'center', fontWeight: 700, fontSize: '0.98rem' }}>
                  {status === 'success' ? "✅ Message sent! I'll get back to you soon 🌸" : '❌ Something went wrong. Please try again.'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div ref={tRef} initial={{ opacity: 0, y: 30 }} animate={tInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>💬 Kind Words</div>
            <h2 className="serif" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-1px' }}>
              What People <span className="shimmer-text">Say</span> 🌸
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={tInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.12 }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow2)' }}
                className="card" style={{ padding: '28px 26px' }}>
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>{t.emoji}</div>
                <p style={{ color: 'var(--text2)', fontSize: '0.98rem', lineHeight: 1.85, marginBottom: 20, fontStyle: 'italic', fontWeight: 400 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--grad1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--pink)', fontSize: '0.82rem', fontWeight: 600 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
