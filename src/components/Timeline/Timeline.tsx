import React, { useState, useRef, useEffect } from 'react';
import TimelinePoint from './TimelinePoint';
import { periods } from './data';
import gsap from 'gsap';
import './Timeline.scss';
import TimelineNews from './TimelineNews';
import './TimelineNews.scss';

const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const anglePerPoint = 360 / periods.length;

  useEffect(() => {
    if (!circleRef.current) return;

    const targetRotation = -activeIndex * anglePerPoint - 60;
    gsap.to(circleRef.current, {
      rotate: `${targetRotation}deg`,
      duration: 0.5,
      ease: 'power2.out'
    });

    circleRef.current.querySelectorAll('.point-number').forEach((el) => {
      gsap.to(el, { rotate: `${anglePerPoint}deg`, duration: 0.5, ease: 'power2.out' });
    });

    const [start, end] = periods[activeIndex].label.split('-');

    bgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { scale: 0.8, duration: 0.2, onComplete: () => {
        el.textContent = i === 0 ? start : end;
        el.style.color = i === 0 ? '#5D5FEF' : '#EF5DA8';
        gsap.to(el, { scale: 1, duration: 0.5, ease: 'power2.out' });
      }});
    });
  }, [activeIndex]);

  const prevPeriod = () => {
    setActiveIndex((prev) => (prev === 0 ? periods.length - 1 : prev - 1));
  };

  const nextPeriod = () => {
    setActiveIndex((prev) => (prev === periods.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="timeline-wrapper">
      <div className="background-periods">
        {Array(2).fill(0).map((_, i) => (
          <span
            key={i}
            ref={el => { bgRefs.current[i] = el; }}
            className="bg-char"
          ></span>
        ))}
      </div>

      <div className="timeline-circle" ref={circleRef}>
        {periods.map((p, idx) => (
          <TimelinePoint
            key={idx}
            index={idx + 1}
            label={p.label}
            type={p.type}
            totalPoints={periods.length}
            active={idx === activeIndex}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      <div className="active-label">{periods[activeIndex].type}</div>
      
      <div className="timeline-controls-wrapper">
        <div className="period-counter-top">
          {activeIndex + 1}/{periods.length}
        </div>
        <div className="timeline-controls">
          <div className="arrow left" onClick={prevPeriod}>
            <div className="corner"></div>
          </div>
          <div className="arrow right" onClick={nextPeriod}>
            <div className="corner"></div>
          </div>
        </div>
      </div>

      <div className="timeline-news-wrapper">
        <TimelineNews news={periods[activeIndex].news} />
      </div>
    </div>
  );
};

export default Timeline;
