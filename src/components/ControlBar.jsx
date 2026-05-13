import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye,
  Tags,
  HelpCircle,
} from 'lucide-react';

function ControlBar({
  isAutoPlay,
  onAutoPlayToggle,
  currentStage,
  onStageChange,
  viewMode,
  onViewModeChange,
  showLabels,
  onLabelsToggle,
  onQuizOpen,
}) {
  const stageOrder = ['before', 'during', 'after', 'extension'];
  const currentIndex = stageOrder.indexOf(currentStage);

  const handlePrevStage = () => {
    if (currentIndex <= 0) return;
    onStageChange(stageOrder[currentIndex - 1]);
  };

  const handleNextStage = () => {
    if (currentIndex >= stageOrder.length - 1) return;
    onStageChange(stageOrder[currentIndex + 1]);
  };

  const stageLabels = {
    before: '喷发前',
    during: '喷发中',
    after: '喷发后',
    extension: '扩展知识',
  };

  const stageIcons = {
    before: '🌋',
    during: '🔥',
    after: '🏔️',
    extension: '📚',
  };

  return (
    <div className="control-bar">
      {/* Left - playback controls */}
      <div className="control-bar-left">
        <motion.button
          onClick={onAutoPlayToggle}
          className={`control-play-btn ${isAutoPlay ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlay ? <Pause /> : <Play />}
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.button
            onClick={handlePrevStage}
            className="control-nav-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft />
          </motion.button>

          <div className="control-indicators">
            {stageOrder.map((stage, index) => (
              <button
                key={stage}
                onClick={() => onStageChange(stage)}
                className={`control-indicator ${
                  index === currentIndex
                    ? 'active'
                    : index < currentIndex
                    ? 'passed'
                    : ''
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNextStage}
            className="control-nav-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight />
          </motion.button>
        </div>

        <div className="control-stage-label">
          <span className="control-stage-label-icon">{stageIcons[currentStage]}</span>
          {stageLabels[currentStage]}
        </div>
      </div>

      {/* Center - auto-play indicator */}
      <div className="control-bar-center">
        <AnimatePresence>
          {isAutoPlay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="control-autoplay-badge"
            >
              <span className="control-autoplay-dot" />
              <span>自动演示中</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right - feature buttons */}
      <div className="control-bar-right">
        <motion.button
          onClick={() => onViewModeChange(viewMode === 'normal' ? 'crossSection' : 'normal')}
          className={`control-feature-btn ${viewMode === 'crossSection' ? 'active orange' : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Eye />
          <span>剖面</span>
        </motion.button>

        <motion.button
          onClick={onLabelsToggle}
          className={`control-feature-btn ${showLabels ? 'active teal' : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Tags />
          <span>标签</span>
        </motion.button>

        <motion.button
          onClick={onQuizOpen}
          className="control-quiz-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HelpCircle />
          <span>问答</span>
        </motion.button>
      </div>
    </div>
  );
}

export default ControlBar;
