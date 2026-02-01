import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { setInternalTrafficCookie, validateToken } from './internalTrafficUtils';

interface InternalTrafficToggleProps {
  token: string;
}

const InternalTrafficToggle: React.FC<InternalTrafficToggleProps> = ({ token }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'validating' | 'success' | 'error'>('validating');
  const [message, setMessage] = useState<string>('Processing...');

  useEffect(() => {
    const enable = searchParams.get('enable');
    const providedToken = searchParams.get('k');

    // Validate token
    if (!validateToken(providedToken, token)) {
      setStatus('error');
      setMessage('Invalid or missing token. Access denied.');
      console.error('Invalid token provided for internal traffic toggle');
      return;
    }

    // Validate enable parameter
    if (enable !== '0' && enable !== '1') {
      setStatus('error');
      setMessage('Invalid enable parameter. Use ?enable=0 or ?enable=1');
      console.error('Invalid enable parameter:', enable);
      return;
    }

    try {
      const enableInternal = enable === '1';
      setInternalTrafficCookie(enableInternal);

      setStatus('success');
      setMessage(
        enableInternal
          ? '✓ Internal traffic enabled. GA4 events will be tagged as internal.'
          : '✓ Internal traffic disabled. GA4 events will be tagged as external.'
      );

      console.log(`Internal traffic ${enableInternal ? 'enabled' : 'disabled'} successfully`);

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Error setting internal traffic cookie:', error);
    }
  }, [searchParams, token, navigate]);

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const containerStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
  };

  const statusStyles: React.CSSProperties =
    status === 'success'
      ? {
          ...containerStyles,
          backgroundColor: '#f0f9ff',
          borderLeft: '4px solid #10b981',
        }
      : status === 'error'
        ? {
            ...containerStyles,
            backgroundColor: '#fef2f2',
            borderLeft: '4px solid #ef4444',
          }
        : {
            ...containerStyles,
            backgroundColor: '#f3f4f6',
            borderLeft: '4px solid #3b82f6',
          };

  const headingStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 1rem 0',
    color: status === 'success' ? '#059669' : status === 'error' ? '#dc2626' : '#1f2937',
  };

  const messageStyles: React.CSSProperties = {
    fontSize: '1rem',
    margin: '1rem 0',
    color: status === 'success' ? '#047857' : status === 'error' ? '#991b1b' : '#374151',
    lineHeight: '1.5',
  };

  const redirectMessageStyles: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '1.5rem',
    fontStyle: 'italic',
  };

  return (
    <div style={baseStyles}>
      <div style={statusStyles}>
        <h1 style={headingStyles}>
          {status === 'success'
            ? 'Success'
            : status === 'error'
              ? 'Error'
              : 'Processing'}
        </h1>
        <p style={messageStyles}>{message}</p>
        {status === 'success' && (
          <p style={redirectMessageStyles}>Redirecting to home page in 3 seconds...</p>
        )}
      </div>
    </div>
  );
};

export default InternalTrafficToggle;
