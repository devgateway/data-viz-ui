import getDeviceTypeFn from "@/utils/deviceType";
import React, { useState, useEffect } from "react";

interface WindowDimensionsParams {
    getHeight?: boolean;
    getDeviceType?: boolean;
}

type WindowDimensions<T extends WindowDimensionsParams> = {
    width: number;
} & (T['getHeight'] extends true ? { height: number } : {}) 
  & (T['getDeviceType'] extends true ? { deviceType: 'mobile' | 'tablet' | 'midTablet' | 'laptop' | 'desktop' | 'wide' } : {});


/**
 * 
 * A react hook that returns the width,height and the device type.
 * @description A react hook that returns the width,height and the device type.
 * until the issue above is fixed.
 * @param {WindowDimensionsParams} params
 * @returns {WindowDimensions}
 */
export const useWindowDimensionsAndDevice = <T extends WindowDimensionsParams>(params?: T): WindowDimensions<T> => {
  const { getDeviceType, getHeight } = params || {};
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions<T>>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    ...(getHeight && { height: typeof window !== 'undefined' ? window.innerHeight : 0 }),
    ...(getDeviceType && { deviceType: typeof window !== 'undefined' ? getDeviceTypeFn() : 'desktop' }),
  } as WindowDimensions<T>));

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(prevDimensions => ({
        ...prevDimensions,
        width: window.innerWidth,
        ...(getHeight && { height: window.innerHeight }),
        ...(getDeviceType && { deviceType: getDeviceTypeFn() }),
      }));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [getHeight, getDeviceType]);

  return windowDimensions;
};
