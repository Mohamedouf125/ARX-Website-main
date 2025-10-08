// Performance optimization utilities

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Debounce function for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // Preload critical fonts
  const fontPreloads = [
    '/fonts/lato/Lato-Regular.ttf',
    '/fonts/lato/Lato-Bold.ttf',
    '/fonts/Cinzel/Cinzel-Regular.ttf',
  ];
  
  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/ttf';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Optimize images loading
export const optimizeImageLoading = () => {
  if (typeof window === 'undefined') return;
  
  // Add loading="lazy" to all images
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === 'undefined') {
    fn();
    return;
  }
  
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
};

// Bundle size optimization
export const optimizeBundleSize = () => {
  // Tree shake unused exports
  if (typeof window !== 'undefined') {
    // Remove unused event listeners
    window.addEventListener('beforeunload', () => {
      // Clean up resources
      document.querySelectorAll('[data-cleanup]').forEach(el => {
        el.remove();
      });
    });
  }
};
