import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - ref and visibility state
 */
export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: stop observing after first reveal
          // observer.unobserve(element);
        }
      });
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

/**
 * Stagger animation helper for lists
 * @param {number} index - Item index
 * @param {number} baseDelay - Base delay in seconds
 * @returns {string} - CSS animation delay
 */
export const getStaggerDelay = (index, baseDelay = 0.1) => {
  return `${index * baseDelay}s`;
};

/**
 * Hook for parallax scroll effects
 * @param {number} speed - Parallax speed factor (0-1)
 * @returns {Object} - ref and translateY value
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = rect.top + scrolled;
        const newOffset = (scrolled - rate) * speed;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [elementRef, offset];
};

/**
 * Hook for mouse parallax effect
 * @param {Object} options - Speed factors for x and y
 * @returns {Object} - ref and translate values
 */
export const useMouseParallax = (options = { x: 0.1, y: 0.1 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) * options.x;
        const y = (e.clientY - centerY) * options.y;

        setPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [options.x, options.y]);

  return [elementRef, position];
};

/**
 * Hook for tilt 3D effect on cards
 * @param {number} maxTilt - Maximum tilt angle
 * @returns {Object} - ref, rotation values, and event handlers
 */
export const useTilt3D = (maxTilt = 15) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const elementRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 2 * maxTilt;
    const rotateX = ((y / rect.height) - 0.5) * 2 * -maxTilt;

    setTilt({ rotateX, rotateY });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return {
    elementRef,
    rotateX: tilt.rotateX,
    rotateY: tilt.rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
};

/**
 * Hook for counting up animation
 * @param {number} target - Target number to count to
 * @param {number} duration - Animation duration in ms
 * @param {number} start - Starting number
 * @returns {number} - Current animated value
 */
export const useCountUp = (target, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || count >= target) return;

    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + (target - start) * easeOut);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration, start, count]);

  return [elementRef, count];
};

/**
 * Hook for magnetic button effect
 * @param {number} strength - Magnetic strength factor
 * @returns {Object} - ref, position, and event handlers
 */
export const useMagnetic = (strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;

    setPosition({ x, y });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    elementRef,
    position,
    handleMouseMove,
    handleMouseLeave,
  };
};

export default useScrollAnimation;

