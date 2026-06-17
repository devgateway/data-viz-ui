import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { setInternalTrafficCookie } from './internalTrafficUtils';

interface BypassStatus {
  status: 'validating' | 'success' | 'error';
  message: string;
}

const getBypassErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }

  return 'Error: Unknown error';
};

/**
 * Custom hook to handle internal traffic GA bypass logic
 * Processes URL query parameters and manages cookie state
 *
 * @param redirectTo - URL to redirect to after successful toggle (default: '/')
 * @returns Object containing status, message, and validation state
 */
export const useInternalTrafficBypass = (redirectTo: string = '/'): BypassStatus => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'validating' | 'success' | 'error'>('validating');
  const [message, setMessage] = useState<string>('Processing...');

  useEffect(() => {
    // Extract and validate parameters
    const enable = searchParams.get('enable');
    const token = searchParams.get('k');

    if (!token) {
      setStatus('error');
      setMessage('Missing token parameter. Use ?k=your_token');
      console.error('Missing token parameter');
      return;
    }

    // Validate enable parameter exists
    if (!enable) {
      setStatus('error');
      setMessage('Missing enable parameter. Use ?enable=0 or ?enable=1');
      console.error('Missing enable parameter');
      return;
    }

    // Validate enable parameter value
    if (enable !== '0' && enable !== '1') {
      setStatus('error');
      setMessage('Invalid enable parameter. Use ?enable=0 or ?enable=1');
      console.error('Invalid enable parameter:', enable);
      return;
    }

    // Process the bypass
    const enableInternal = enable === '1';

    // Determine the message before try/catch for React Compiler optimization
    const successMessage = enableInternal
      ? '✓ Internal traffic enabled. GA4 events will be tagged as internal.'
      : '✓ Internal traffic disabled. GA4 events will be tagged as external.';

    const statusLabel = enableInternal ? 'enabled' : 'disabled';
    const successLogMessage = `Internal traffic ${statusLabel} successfully`;

    try {
      setInternalTrafficCookie(enableInternal);

      setStatus('success');
      setMessage(successMessage);

      console.log(successLogMessage);

      // // Schedule redirect after 3 seconds
      // const redirectTimer = setTimeout(() => {
      //   navigate(redirectTo);
      // }, 3000);

      // Cleanup timer if component unmounts
      // return () => clearTimeout(redirectTimer);
    } catch (error) {
      setStatus('error');
      setMessage(getBypassErrorMessage(error));
      console.error('Error setting internal traffic cookie:', error);
    }
  }, [searchParams, navigate, redirectTo]);

  return { status, message };
};
