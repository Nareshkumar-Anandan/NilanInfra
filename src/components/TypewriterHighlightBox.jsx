import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

/**
 * TypewriterHighlightBox
 * Displays the highlight card where content types out character-by-character
 * with a glowing brand cursor and pop-in checkmarks.
 */
const TypewriterHighlightBox = ({
  title = "Before We Start, We Understand:",
  items = [],
  speed = 18, // ms per char
  pauseAfterTitle = 200, // ms
  pauseBetweenItems = 150, // ms
  typeTitle = true,
  className = ""
}) => {
  const boxRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  
  // stage: 'idle' | 'typing-title' | 'typing-items' | 'completed'
  const [stage, setStage] = useState('idle');
  const [displayedTitle, setDisplayedTitle] = useState(typeTitle ? '' : title);
  const [displayedItems, setDisplayedItems] = useState(() => items.map(() => ''));
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Trigger when scrolled into view
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          if (typeTitle) {
            setStage('typing-title');
          } else {
            setStage('typing-items');
            setActiveItemIndex(0);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted, typeTitle]);

  // Restart typing
  const handleReplay = (e) => {
    if (e) e.stopPropagation();
    setDisplayedTitle(typeTitle ? '' : title);
    setDisplayedItems(items.map(() => ''));
    setActiveItemIndex(-1);
    setCursorVisible(true);
    if (typeTitle) {
      setStage('typing-title');
    } else {
      setStage('typing-items');
      setActiveItemIndex(0);
    }
  };

  // 1. Typing Title
  useEffect(() => {
    if (stage !== 'typing-title' || !typeTitle) return;

    let charIdx = 0;
    setDisplayedTitle('');
    
    const interval = setInterval(() => {
      charIdx++;
      setDisplayedTitle(title.slice(0, charIdx));
      if (charIdx >= title.length) {
        clearInterval(interval);
        setTimeout(() => {
          setStage('typing-items');
          setActiveItemIndex(0);
        }, pauseAfterTitle);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [stage, title, speed, pauseAfterTitle, typeTitle]);

  // 2. Typing Items sequentially
  useEffect(() => {
    if (stage !== 'typing-items' || activeItemIndex < 0 || activeItemIndex >= items.length) {
      if (stage === 'typing-items' && activeItemIndex >= items.length) {
        setStage('completed');
        // Gracefully fade cursor after completion
        const timer = setTimeout(() => setCursorVisible(false), 2000);
        return () => clearTimeout(timer);
      }
      return;
    }

    const currentTargetText = items[activeItemIndex] || '';
    let charIdx = 0;

    const interval = setInterval(() => {
      charIdx++;
      setDisplayedItems((prev) => {
        const next = [...prev];
        next[activeItemIndex] = currentTargetText.slice(0, charIdx);
        return next;
      });

      if (charIdx >= currentTargetText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveItemIndex((prev) => prev + 1);
        }, pauseBetweenItems);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [stage, activeItemIndex, items, speed, pauseBetweenItems]);

  return (
    <div ref={boxRef} className={`sd-highlight-box sd-typewriter-box ${className}`}>
      {/* Replay Button */}
      <button 
        type="button"
        className="sd-replay-btn" 
        onClick={handleReplay}
        title="Replay typing animation"
        aria-label="Replay typing animation"
      >
        <RotateCcw size={12} />
        <span>REPLAY</span>
      </button>

      <h3>
        {displayedTitle}
        {stage === 'typing-title' && cursorVisible && (
          <span className="sd-typing-cursor">|</span>
        )}
      </h3>

      <ul className="sd-highlight-list">
        {items.map((fullText, idx) => {
          const isItemActive = activeItemIndex >= idx || stage === 'completed';
          const isCurrentlyTyping = stage === 'typing-items' && activeItemIndex === idx;
          const text = displayedItems[idx] || '';

          return (
            <li 
              key={idx} 
              className={`sd-typewriter-item ${isItemActive ? 'visible' : 'pending'}`}
            >
              <span className={`sd-check-icon-wrap ${isItemActive ? 'visible' : ''}`}>
                <CheckCircle2 size={18} />
              </span>
              <span className="sd-typewriter-text">
                {text}
                {isCurrentlyTyping && cursorVisible && (
                  <span className="sd-typing-cursor">|</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TypewriterHighlightBox;
