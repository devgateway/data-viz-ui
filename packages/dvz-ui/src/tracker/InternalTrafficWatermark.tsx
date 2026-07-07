import React, { useEffect, useRef, useState } from 'react';
import { Icon, Label, Popup } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { isInternalTrafficEnabled } from './internalTrafficUtils';

const InternalTrafficWatermark: React.FC = () => {
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    setIsEnabled(isInternalTrafficEnabled());
    setPosition({ x: window.innerWidth - 200, y: window.innerHeight - 40 });

    const handleStorageChange = () => setIsEnabled(isInternalTrafficEnabled());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Attach mousemove/mouseup to window so drag works even outside the element
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      hasDragged.current = true;
      setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    hasDragged.current = false;
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    setIsDragging(true);
  };

  const handleClick = () => {
    if (!hasDragged.current) {
      navigate('/__ga/internal');
    }
  };

  if (!isMounted || !isEnabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 999999,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      role="button"
      aria-label="GA bypass enabled — click to manage"
    >
      <Popup
        content="Click to manage bypass settings"
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
