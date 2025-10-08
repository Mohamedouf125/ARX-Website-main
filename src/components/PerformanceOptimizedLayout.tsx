"use client";

import { useEffect } from 'react';
import { preloadCriticalResources, optimizeImageLoading, optimizeBundleSize } from '@/lib/performance';

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizedLayout({ children }: PerformanceOptimizedLayoutProps) {
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize image loading
    optimizeImageLoading();
    
    // Optimize bundle size
    optimizeBundleSize();
    
    // Preload next route
    const preloadNextRoute = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('#')) {
          // Preload on hover
          link.addEventListener('mouseenter', () => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = href;
            document.head.appendChild(linkElement);
          }, { once: true });
        }
      });
    };
    
    // Run after initial load
    setTimeout(preloadNextRoute, 1000);
    
  }, []);

  return <>{children}</>;
}
