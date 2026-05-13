import { motion } from 'framer-motion';
import { Mountain } from 'lucide-react';
import { HOTSPOTS } from '../data/volcanoData';

function StageNav({ stages, currentStage, onStageChange, onSubItemClick }) {
  return (
    <nav className="stage-nav">
      {/* Logo */}
      <div className="stage-nav-logo">
        <div className="stage-nav-logo-inner">
          <div className="stage-nav-logo-icon">
            <Mountain />
          </div>
          <div className="stage-nav-logo-text">
            <h1>3D火山</h1>
            <p>互动教学平台</p>
          </div>
        </div>
      </div>

      {/* Stage list */}
      <div className="stage-nav-body">
        <p className="stage-nav-label">学习阶段</p>
        <div className="stage-nav-list">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => onStageChange(stage.id)}
                className={`stage-nav-item ${currentStage === stage.id ? 'active' : ''}`}
              >
                <div className="stage-nav-item-inner">
                  <span className="stage-nav-item-icon">{stage.icon}</span>
                  <div className="stage-nav-item-info">
                    <div className="stage-nav-item-name">{stage.name}</div>
                    <div className="stage-nav-item-desc">{stage.description}</div>
                  </div>
                  {currentStage === stage.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="stage-nav-item-indicator"
                    />
                  )}
                </div>
              </button>

              {/* Sub-items */}
              {currentStage === stage.id && stage.subItems && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="stage-nav-subitems"
                >
                  {stage.subItems.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="stage-nav-subitem"
                      onClick={() => {
                        const hotspot = HOTSPOTS.find(h => h.id === item.id);
                        if (hotspot && onSubItemClick) onSubItemClick(hotspot);
                      }}
                    >
                      <span className="stage-nav-subitem-dot" />
                      {item.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="stage-nav-footer">
        <div className="stage-nav-footer-inner">
          <span className="stage-nav-footer-dot" />
          <span>适合7-12岁小学生</span>
        </div>
      </div>
    </nav>
  );
}

export default StageNav;
