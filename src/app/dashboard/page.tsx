'use client';

import { useEffect, useState } from 'react';
import { database } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';
import styles from '../styles/Dashboard.module.css';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: number;
  timestampMs?: number;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add('loaded');
  }, []);

  useEffect(() => {
    if (!mounted || !database) {
      if (mounted && !database) {
        setError('Database not initialized.');
        setLoading(false);
      }
      return;
    }

    const messagesRef = ref(database, 'contacts');
    
    const unsubscribe = onValue(
      messagesRef, 
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).sort((a, b) => {
            const timeA = a.timestampMs || a.timestamp || 0;
            const timeB = b.timestampMs || b.timestamp || 0;
            return timeB - timeA;
          });
          setMessages(messagesList);
        } else {
          setMessages([]);
        }
        setLoading(false);
        setError('');
      }, 
      (error) => {
        setError('Database error: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [mounted]);

  const formatDate = (message: ContactMessage) => {
    const timestamp = message.timestampMs || message.timestamp;
    if (!timestamp) return 'Unknown date';
    
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!mounted || loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ paddingTop: '0' }}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Contact Messages ({messages.length})</p>
      </div>

      <div className={styles.messagesGrid}>
        {messages.length === 0 ? (
          <div className={styles.noMessages}>
            <h3>No messages yet</h3>
            <p>Messages will appear here when users submit the contact form.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={styles.messageCard}>
              <div className={styles.messageHeader}>
                <h3 className={styles.messageName}>{message.name || 'Unknown'}</h3>
                <span className={styles.messageDate}>
                  {formatDate(message)}
                </span>
              </div>
              <div className={styles.messageEmail}>{message.email || 'No email'}</div>
              <div className={styles.messageSubject}>{message.subject || 'No subject'}</div>
              <div className={styles.messageContent}>{message.message || 'No message'}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}