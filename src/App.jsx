import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import StageNav from './components/StageNav';
import VolcanoScene from './components/VolcanoScene';
import KnowledgePanel from './components/KnowledgePanel';
import ControlBar from './components/ControlBar';
import QuizModal from './components/QuizModal';
import { STAGES, STAGE_CONTENT, HOTSPOTS } from './data/volcanoData';
import './App.css';

function App() {
  const [currentStage, setCurrentStage] = useState('before');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [viewMode, setViewMode] = useState('normal');
  const [showLabels, setShowLabels] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);

  // Auto-play logic - 到最后一个阶段停止，Quiz打开时暂停
  useEffect(() => {
    if (!isAutoPlay || showQuiz) return;

    const stageOrder = ['before', 'during', 'after', 'extension'];
    const currentIndex = stageOrder.indexOf(currentStage);

    // 到最后一个阶段不再自动切换
    if (currentIndex >= stageOrder.length - 1) {
      setIsAutoPlay(false);
      return;
    }

    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1;
      setCurrentStage(stageOrder[nextIndex]);
      setSelectedHotspot(null);
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentStage, isAutoPlay, showQuiz]);

  const handleUserInteraction = useCallback(() => {
    setIsAutoPlay(false);
  }, []);

  const handleStageChange = useCallback(
    (stageId) => {
      handleUserInteraction();
      setCurrentStage(stageId);
      setSelectedHotspot(null);
    },
    [handleUserInteraction]
  );

  const handleHotspotClick = useCallback(
    (hotspot) => {
      handleUserInteraction();
      setSelectedHotspot((prev) =>
        prev?.id === hotspot.id ? null : hotspot
      );
    },
    [handleUserInteraction]
  );

  const currentHotspots = HOTSPOTS.filter(
    (h) =>
      h.stage.includes(currentStage) &&
      (viewMode === 'crossSection' || !h.crossSectionOnly)
  );

  const currentContent = STAGE_CONTENT[currentStage];

  return (
    <div className="app">
      {/* Main content area */}
      <div className="app-main">
        {/* Left nav */}
        <StageNav
          stages={STAGES}
          currentStage={currentStage}
          onStageChange={handleStageChange}
          onSubItemClick={handleHotspotClick}
        />

        {/* Center 3D stage */}
        <div className="app-stage-area">
          <VolcanoScene
            currentStage={currentStage}
            viewMode={viewMode}
            hotspots={currentHotspots}
            selectedHotspot={selectedHotspot}
            onHotspotClick={handleHotspotClick}
            showLabels={showLabels}
          />
        </div>

        {/* Right knowledge panel */}
        <KnowledgePanel
          content={currentContent}
          selectedHotspot={selectedHotspot}
          currentStage={currentStage}
        />
      </div>

      {/* Bottom control bar */}
      <ControlBar
        isAutoPlay={isAutoPlay}
        onAutoPlayToggle={() => setIsAutoPlay(!isAutoPlay)}
        currentStage={currentStage}
        onStageChange={handleStageChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showLabels={showLabels}
        onLabelsToggle={() => setShowLabels(!showLabels)}
        onQuizOpen={() => setShowQuiz(true)}
      />

      {/* Quiz modal */}
      <AnimatePresence>
        {showQuiz && (
          <QuizModal
            onClose={() => {
              setShowQuiz(false);
              setQuizStep(0);
            }}
            quizStep={quizStep}
            onQuizStepChange={setQuizStep}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
