import React, { useEffect, useState } from 'react';
import { Label, Icon, Popup } from 'semantic-ui-react';
import { isInternalTrafficEnabled } from './internalTrafficUtils';

/**
 * InternalTrafficWatermark
 *
 * Displays a watermark badge indicating that internal traffic bypassing
 * is enabled. This ensures staff members know they are not contributing
 * to Google Analytics statistics when browsing with this setting enabled.
 *
 * The watermark is only rendered when the _ga_internal_traffic cookie is
 * set to '1', and it updates reactively if the cookie state changes.
 */
const InternalTrafficWatermark: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -20, y: -20 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on client-side
    if (typeof document === 'undefined') return;

    setIsMounted(true);
    setIsEnabled(isInternalTrafficEnabled());
    
    // Set initial position to bottom-right (20px from edges)
    // We position from top-left in absolute coordinates
    if (typeof window !== 'undefined') {
      setPosition({
        x: window.innerWidth - 200,
        y: window.innerHeight - 40,
      });
    }

    // Optional: Listen for storage changes to update in real-time
    // (useful if another tab/window disables the bypass)
    const handleStorageChange = () => {
      setIsEnabled(isInternalTrafficEnabled());
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Don't render on server-side or before client mount
  if (!isMounted || !isEnabled) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 999999,
    willChange: isDragging ? 'transform' : 'auto',
  };

  return (
    <div
      style={containerStyles}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      role="status"
      aria-label="GA bypass enabled. Drag to move this notification."
    >
      <Popup
        content="Drag to move"
        position="left center"
        trigger={
          <Label color="yellow" image>
            <Icon name="spinner" loading color="red" />
            GA Bypass Enabled
          </Label>
        }
      />
    </div>
  );
};

export default InternalTrafficWatermark;
