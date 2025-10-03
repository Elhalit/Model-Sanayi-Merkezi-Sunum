import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import CompanySection from '@/components/sections/CompanySection';
import ProjectSection from '@/components/sections/ProjectSection';
import LocationSection from '@/components/sections/LocationSection';
import MasterPlanSection from '@/components/sections/MasterPlanSection';
import FloorPlansSection from '@/components/sections/FloorPlansSection';
import UnitModal from '@/components/UnitModal';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

export default function Presentation() {
  const { currentSection, navigateToSection, progress } = useHorizontalScroll();

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateToSection(Math.max(0, currentSection - 1));
      if (e.key === 'ArrowRight') navigateToSection(Math.min(5, currentSection + 1));
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, navigateToSection]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation */}
      <Navigation 
        currentSection={currentSection}
        onNavigate={navigateToSection}
        totalSections={6}
      />

      {/* Main Content Container */}
      <div 
        className="horizontal-scroll-container"
        style={{ transform: `translateX(-${currentSection * 100}vw)` }}
        data-testid="presentation-container"
      >
        <HeroSection />
        <CompanySection />
        <ProjectSection />
        <LocationSection />
        <MasterPlanSection />
        <FloorPlansSection />
      </div>

      {/* Unit Detail Modal */}
      <UnitModal />
    </div>
  );
}
