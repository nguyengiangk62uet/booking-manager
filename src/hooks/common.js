import { useState, useEffect } from 'react';
import { commonHelpers } from 'helpers';

const { getWindowDimensions } = commonHelpers;

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};