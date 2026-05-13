import { useState } from 'react';
import { motion } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../data/volcanoData';
import { X, Lightbulb, PartyPopper, ThumbsUp, Dumbbell } from 'lucide-react';

function QuizModal({ onClose, quizStep, onQuizStepChange }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = QUIZ_QUESTIONS[quizStep];
  const isLastQuestion = quizStep >= QUIZ_QUESTIONS.length - 1;
  const isQuizComplete = quizStep >= QUIZ_QUESTIONS.length;

  const handleAnswerSelect = (optionId) => {
    if (showResult) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = currentQuestion.options.find(
      (opt) => opt.id === selectedAnswer && opt.correct
    );

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onQuizStepChange(quizStep + 1);
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
      onQuizStepChange(quizStep + 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    onQuizStepChange(0);
  };

  // Complete screen
  if (isQuizComplete) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const barClass = percentage >= 75 ? 'green' : percentage >= 50 ? 'teal' : 'orange';
    const CompleteIcon = percentage >= 75 ? PartyPopper : percentage >= 50 ? ThumbsUp : Dumbbell;
    const titleText = percentage >= 75 ? '太棒了！' : percentage >= 50 ? '不错哦！' : '继续加油！';

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="quiz-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="quiz-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="quiz-complete">
            <div className="quiz-complete-icon">
              <CompleteIcon size={56} />
            </div>
            <h2 className="quiz-complete-title">{titleText}</h2>
            <p className="quiz-complete-text">
              你答对了{' '}
              <span className="quiz-complete-score">{score}</span>{' '}
              道题，共{' '}
              <span className="quiz-complete-total">{QUIZ_QUESTIONS.length}</span>{' '}
              道题
            </p>

            <div className="quiz-complete-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`quiz-complete-bar-fill ${barClass}`}
              />
            </div>

            <div className="quiz-complete-actions">
              <motion.button
                onClick={handleRestart}
                className="quiz-btn quiz-btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                再来一次
              </motion.button>
              <motion.button
                onClick={onClose}
                className="quiz-btn quiz-btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                完成
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="quiz-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="quiz-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="quiz-modal-header">
          <div className="quiz-modal-header-top">
            <h2 className="quiz-modal-title">火山知识问答</h2>
            <button onClick={onClose} className="quiz-modal-close">
              <X />
            </button>
          </div>
          <div className="quiz-progress-bar">
            {QUIZ_QUESTIONS.map((_, index) => (
              <div
                key={index}
                className={`quiz-progress-segment ${
                  index < quizStep
                    ? 'completed'
                    : index === quizStep
                    ? 'current'
                    : ''
                }`}
              />
            ))}
          </div>
          <p className="quiz-progress-text">
            第 {quizStep + 1} 题，共 {QUIZ_QUESTIONS.length} 题
          </p>
        </div>

        {/* Body */}
        <div className="quiz-modal-body">
          <motion.p
            key={quizStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="quiz-question"
          >
            {currentQuestion.question}
          </motion.p>

          <div className="quiz-options">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              let optionClass = 'quiz-option';
              if (showCorrect) optionClass += ' correct';
              else if (showWrong) optionClass += ' wrong';
              else if (isSelected) optionClass += ' selected';

              return (
                <motion.button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={optionClass}
                  whileHover={!showResult ? { scale: 1.01 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                >
                  <span className="quiz-option-letter">{option.id}</span>
                  <span className="quiz-option-text">{option.text}</span>
                  {showCorrect && (
                    <span className="quiz-option-icon" style={{ color: '#22c55e' }}>
                      &#10003;
                    </span>
                  )}
                  {showWrong && (
                    <span className="quiz-option-icon" style={{ color: '#ef4444' }}>
                      &#10007;
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="quiz-explanation"
            >
              <Lightbulb />
              <p className="quiz-explanation-text">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="quiz-modal-footer">
          {!showResult ? (
            <motion.button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`quiz-btn ${selectedAnswer ? 'quiz-btn-primary' : 'quiz-btn-disabled'}`}
              whileHover={selectedAnswer ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer ? { scale: 0.98 } : {}}
            >
              确认答案
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNext}
              className="quiz-btn quiz-btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLastQuestion ? '查看结果' : '下一题'}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default QuizModal;
