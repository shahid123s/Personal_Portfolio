import { useEffect, useRef } from 'react';
import api from '../services/api';

// Generate a random session ID per tab
const generateSessionId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const getOrCreateSessionId = () => {
  let id = sessionStorage.getItem('portfolio_session_id');
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem('portfolio_session_id', id);
  }
  return id;
};

const useAnalytics = () => {
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    const referrer = document.referrer || 'Direct';

    // Fire page view
    api.post('/analytics/pageview', { sessionId, referrer }).catch(() => {});

    // Fire session duration on page leave
    const handleLeave = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      // Use sendBeacon for reliability on tab close
      const payload = JSON.stringify({ sessionId, duration });
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/analytics/session`,
          blob
        );
      } else {
        api.post('/analytics/session', { sessionId, duration }).catch(() => {});
      }
    };

    window.addEventListener('beforeunload', handleLeave);
    return () => window.removeEventListener('beforeunload', handleLeave);
  }, []);
};

// Standalone function to track a specific link click
export const trackLinkClick = (type) => {
  api.post('/analytics/click', { type }).catch(() => {});
};

export default useAnalytics;
