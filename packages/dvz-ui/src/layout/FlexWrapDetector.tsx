'use client';

import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import deviceType from '../utils/deviceType';

interface FlexWrapDetectorProps {
  children: React.ReactNode;
  onWrapChange?: (wrapCount: number) => void;
  className?: string;
}

const FlexWrapDetector = ({ children, onWrapChange, className }: FlexWrapDetectorProps) => {
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [wrapCount, setWrapCount] = useState(0);

  // deviceType() is safe here because this is a 'use client' component —
  // it only runs in the browser. The SSR guard in deviceType.ts provides
  // an additional safety net but is not load-bearing in this file.
  const isMobileOrTablet = deviceType() === 'mobile' || deviceType() === 'tablet' || deviceType() === 'midTablet';

  const makeFlexWrap = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("display", "flex", "important");
      if (wrapCount > 0 || isMobileOrTablet) {
        containerRef.current.style.setProperty("flex-wrap", "wrap", "important");
      } else {
        containerRef.current.style.setProperty("flex-wrap", "nowrap", "important");
      }
    }
  }, [wrapCount, isMobileOrTablet]);

  const checkWrap = useCallback(() => {
    const container = containerRef.current;
    let count = 0;
    if (container && container.children.length > 1) {
      const firstTop = container.children[0].getBoundingClientRect().top;
      Array.from(container.children).forEach((child, index) => {
        if (index > 0 && child.getBoundingClientRect().top > firstTop) {
          count++;
        }
      });
    }
    if (count !== wrapCount) {
      setWrapCount(count);
    }
  }, [wrapCount]);

  useEffect(() => {
    checkWrap();
    window.addEventListener("resize", checkWrap);
    return () => window.removeEventListener("resize", checkWrap);
  }, [checkWrap]);

  useEffect(() => {
    if (onWrapChange) {
      onWrapChange(wrapCount);
    }
  }, [wrapCount, onWrapChange]);

  useEffect(() => {
    makeFlexWrap();
  }, [makeFlexWrap]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default FlexWrapDetector;
