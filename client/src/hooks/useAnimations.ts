import { useCallback } from 'react';
import { gsap } from 'gsap';

export function useAnimations() {
  const animateOnScroll = useCallback((element: Element, animation: object) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        ...animation
      }
    );
  }, []);

  const animateCounter = useCallback((element: HTMLElement, start: number, end: number, duration: number = 2000) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString('tr-TR');
    }, 16);
  }, []);

  const pulseAnimation = useCallback((element: Element) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut'
    });
  }, []);

  return {
    animateOnScroll,
    animateCounter,
    pulseAnimation
  };
}
