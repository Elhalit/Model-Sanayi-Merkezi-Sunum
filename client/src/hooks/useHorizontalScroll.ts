import { useState, useCallback } from 'react';

export function useHorizontalScroll() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 6;

  const navigateToSection = useCallback((section: number) => {
    if (section >= 0 && section < totalSections) {
      setCurrentSection(section);
    }
  }, [totalSections]);

  const progress = ((currentSection + 1) / totalSections) * 100;

  return {
    currentSection,
    navigateToSection,
    progress,
    totalSections
  };
}
