import React, { useEffect, useRef, useState } from 'react';

// Props interface for the FadeInSection component
interface FadeInSectionProps {
  children: React.ReactNode;  // Content to be animated
  className?: string;        // Optional additional classes
}

/**
 * FadeInSection Component
 * 
 * A reusable component that fades in its children when they enter the viewport.
 * Uses Intersection Observer API for efficient scroll-based animations.
 *
 * @param children - Content to be wrapped and animated
 * @param className - Optional CSS classes to be added
 */
export function FadeInSection({ children, className = '' }: FadeInSectionProps) {
  // Track if element is visible in viewport
  const [isVisible, setVisible] = useState(false);
  
  // Reference to the DOM element we want to observe
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(entries => {
      // Update visibility state based on intersection
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });

    // Get the current DOM element
    const { current } = domRef;
    
    // Start observing the element if it exists
    if (current) {
      observer.observe(current);
    }

    // Cleanup: stop observing when component unmounts
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}