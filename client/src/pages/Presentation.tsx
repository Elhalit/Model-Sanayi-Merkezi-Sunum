import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import PartnershipSection from '@/components/sections/PartnershipSection';
import ProjectSection from '@/components/sections/ProjectSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import StrategicLocationSection from '@/components/sections/StrategicLocationSection';
import MasterPlanSection from '@/components/sections/MasterPlanSection';
import FloorPlansSection from '@/components/sections/FloorPlansSection';
import FloorPlansSection2 from '@/components/sections/FloorPlansSection2';
import FloorPlansSection3 from '@/components/sections/FloorPlansSection3';
import FloorPlansSection4 from '@/components/sections/FloorPlansSection4';
import FloorPlansSection5 from '@/components/sections/FloorPlansSection5';
import UnitModal from '@/components/UnitModal';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

export default function Presentation() {
  const { currentSection, navigateToSection, progress } = useHorizontalScroll();

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateToSection(Math.max(0, currentSection - 1));
      if (e.key === 'ArrowRight') navigateToSection(Math.min(10, currentSection + 1));
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
        totalSections={11}
      />

      {/* Main Content Container */}
      <div 
        className="horizontal-scroll-container"
        style={{ transform: `translateX(-${currentSection * 100}vw)` }}
        data-testid="presentation-container"
      >
        <HeroSection />
        <PartnershipSection />
        <ProjectSection />
        <StatisticsSection />
        <StrategicLocationSection />
        <MasterPlanSection />
        <FloorPlansSection />
        <FloorPlansSection2 />
        <FloorPlansSection3 />
        <FloorPlansSection4 />
        <FloorPlansSection5 />
      </div>

      {/* Unit Detail Modal */}
      <UnitModal />
    </div>
  );
}
