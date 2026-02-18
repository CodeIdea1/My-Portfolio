'use client';
import { useRef, useState, useEffect } from 'react';
import { database } from '../../lib/firebase';
import { ref, push } from 'firebase/database';
import Image from 'next/image';
import styles from '../styles/ContactSection.module.css';

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty('--mouse-x', `${x}%`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!database) {
      setSubmitStatus('Service not ready. Please try again.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const contactsRef = ref(database, 'contacts');
      await push(contactsRef, {
        ...formData,
        timestamp: new Date().toISOString(),
        timestampMs: Date.now()
      });
      
      setSubmitStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error: any) {
      setSubmitStatus('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <section className={styles.contactSection}>
        <div className={styles.overlay} />
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      className={styles.contactSection} 
      onMouseMove={handleMouseMove}
    >
      <div ref={backgroundRef} className={styles.backgroundContainer}>
        <div className={styles.backgroundImage} />
        <Image
          src="/images/backgrounds/glasses.png"
          alt="Hidden glasses"
          fill
          className={styles.hiddenImage}
          priority
        />
      </div>
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>
      <div className={styles.overlay} />
      
      <div className={styles.container}>
        <div 
          ref={imageRevealRef}
          className={styles.imageReveal}
        >
        </div>
        
        <div className={styles.formCard}>
          <div className={styles.content}>
            <h2 className={styles.title}>Get In Touch</h2>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                className={styles.input}
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                className={styles.input}
                value={formData.subject}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <textarea 
                name="message"
                placeholder="Your Message" 
                className={styles.textarea}
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {submitStatus && (
              <div className={`${styles.statusMessage} ${submitStatus.includes('successfully') ? styles.success : styles.error}`}>
                {submitStatus}
              </div>
            )}
            
            <div className={styles.buttonWrapper}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                <span className={styles.buttonText}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                <span className={styles.buttonIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}