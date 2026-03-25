import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const contactInfo = [
  { icon: '✉', title: 'Email', value: 'pragati111kumari@gmail.com', link: 'mailto:pragati111kumari@gmail.com' },
  { icon: '◎', title: 'Location', value: 'India', link: 'https://maps.google.com/?q=India' },
  { icon: '⬡', title: 'LinkedIn', value: '/in/kpragati03', link: 'https://www.linkedin.com/in/kpragati03/' },
  { icon: '◈', title: 'GitHub', value: '/kpragati03', link: 'https://github.com/kpragati03' },
];

const testimonials = [
  { name: 'Aditya Prasad', role: 'Project Collaborator', text: 'Pragati is an incredibly talented developer. Her attention to detail and passion for clean UI is unmatched. A true team player!' },
  { name: 'Team INTERNSELITE', role: 'Internship Mentor', text: 'One of the most dedicated interns we have had. Pragati picks up new technologies fast and delivers quality work consistently.' },
  { name: 'CodeFeast Team', role: 'TDM Internship', text: 'Pragati joined as our Technical Delivery Manager and immediately made an impact — managing timelines, coordinating teams, and ensuring every sprint is delivered on time.' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
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

  const labelStyle = {
    display: 'block', color: 'var(--text3)', fontSize: '0.72rem',
    fontWeight: 600, marginBottom: 8, letterSpacing: '1.5px',
    textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace",
  };

  const inputStyle = {
    width: '100%', background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '12px 14px', color: 'var(--text)', fontSize: '0.92rem',
    outline: 'none', fontFamily: "'Inter', sans-serif",
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div ref={headerRef} initial={{ opacity: 0, y: -20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-tag" style={{ margin: '0 auto 20px' }}>// get in touch</div>
          <h1 className="serif" style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-2px', marginBottom: 16, lineHeight: 1.05 }}>
            Let's <span className="shimmer-text">Connect</span>
          </h1>
          <p style={{ color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.85, fontSize: '0.95rem' }}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Info cards */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,140px),1fr))', gap: 12, marginBottom: 48 }}>
          {contactInfo.map((info, i) => (
            <motion.a key={i} href={info.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -4, borderColor: 'var(--border2)' }} whileTap={{ scale: 0.97 }}
              className="card" style={{ padding: '22px 16px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: 10, color: 'var(--accent)', fontFamily: 'monospace' }}>{info.icon}</div>
              <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.72rem', marginBottom: 5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, textTransform: 'uppercase' }}>{info.title}</div>
              <div style={{ color: 'var(--text2)', fontSize: '0.78rem', wordBreak: 'break-all', lineHeight: 1.5 }}>{info.value}</div>
            </motion.a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div ref={formRef} initial={{ opacity: 0, y: 30 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
          style={{ maxWidth: 680, margin: '0 auto 64px' }}>
          <div className="card" style={{ padding: 'clamp(24px,5vw,48px)' }}>

            <div style={{ marginBottom: 32 }}>
              <h2 className="serif" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                Send a Message
              </h2>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>Fill out the form and I'll get back to you soon.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Pragati Kumari"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell me about your project..." rows={5}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>

              <motion.button type="submit" disabled={loading}
                className="btn-primary"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: loading ? 0.7 : 1 }}>
                {loading
                  ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>◌</motion.span> Sending...</>
                  : 'Send Message →'}
              </motion.button>
            </form>

            <AnimatePresence>
              {status && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ marginTop: 18, padding: '13px 16px', borderRadius: 8, background: status === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${status === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, color: status === 'success' ? '#4ade80' : '#f87171', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>
                  {status === 'success' ? '✓ Message sent! I will get back to you soon.' : '✗ Something went wrong. Please try again.'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div ref={tRef} initial={{ opacity: 0, y: 30 }} animate={tInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>// kind words</div>
            <h2 className="serif" style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-1px' }}>
              What People <span className="shimmer-text">Say</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 18 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={tInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow2)' }}
                className="card" style={{ padding: '24px 22px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 12, color: 'var(--accent)', fontFamily: 'monospace', lineHeight: 1 }}>"</div>
                <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 18, fontStyle: 'italic' }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--grad1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.88rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--accent)', fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>{t.role}</div>
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
