import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { KNOWLEDGE_CARDS, IMAGE_MAP } from '../data/volcanoData';
import { Lightbulb, Baby, ChevronDown } from 'lucide-react';

function KnowledgePanel({ content, selectedHotspot, currentStage }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const getKnowledgeCard = (cardId) => KNOWLEDGE_CARDS[cardId];

  return (
    <aside className="knowledge-panel">
      {/* Header */}
      <div className="knowledge-panel-header">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="knowledge-panel-title">{content.title}</h2>
            <p className="knowledge-panel-subtitle">{content.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="knowledge-panel-body">
        <AnimatePresence mode="wait">
          {selectedHotspot ? (
            <motion.div
              key="hotspot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div className="knowledge-hotspot-header">
                <span className="knowledge-hotspot-badge">
                  {selectedHotspot.name.charAt(0)}
                </span>
                <h3 className="knowledge-hotspot-name">{selectedHotspot.name}</h3>
              </div>
              <p className="knowledge-hotspot-desc">{selectedHotspot.description}</p>
              {selectedHotspot.image && (
                <div className="knowledge-hotspot-image">
                  <img
                    src={IMAGE_MAP[selectedHotspot.image]}
                    alt={selectedHotspot.name}
                  />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <p className="knowledge-main-text">{content.mainText}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun fact */}
        {!selectedHotspot && content.funFact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="knowledge-funfact"
          >
            <div className="knowledge-funfact-inner">
              <div className="knowledge-funfact-icon">
                <Lightbulb />
              </div>
              <div>
                <p className="knowledge-funfact-label">你知道吗？</p>
                <p className="knowledge-funfact-text">{content.funFact}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Knowledge cards */}
        {!selectedHotspot && content.knowledgeCards && content.knowledgeCards.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p className="knowledge-cards-label">相关知识</p>
            {content.knowledgeCards.map((cardId, index) => {
              const card = getKnowledgeCard(cardId);
              if (!card) return null;

              return (
                <motion.div
                  key={cardId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="knowledge-card"
                  onClick={() => setExpandedCard(expandedCard === cardId ? null : cardId)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 className="knowledge-card-title" style={{ margin: 0 }}>{card.title}</h4>
                    <motion.div
                      animate={{ rotate: expandedCard === cardId ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ flexShrink: 0, color: 'var(--text-muted)' }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>
                  <p className="knowledge-card-desc">{card.description}</p>
                  <AnimatePresence>
                    {expandedCard === cardId && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="knowledge-card-child">
                          <Baby />
                          <span>{card.childFriendly}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="knowledge-panel-footer">
        <div className="knowledge-panel-footer-inner">
          <span>点击热点了解更多</span>
          <div className="knowledge-panel-footer-status">
            <span className="knowledge-panel-footer-dot" />
            <span>互动中</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default KnowledgePanel;
