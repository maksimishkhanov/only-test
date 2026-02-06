import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Props {
  index: number;
  label: string;
  type: string;
  active: boolean;
  totalPoints: number;
  onClick: () => void;
}

const TimelinePoint: React.FC<Props> = ({ index, type, active, totalPoints, onClick }) => {
  const pointRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const radius = 150;
  const angle = (index - 1) * (360 / totalPoints);

  useEffect(() => {
    if (!pointRef.current || !numberRef.current) return;

    if (active) {
      gsap.to(pointRef.current, {
        scale: 2.5,
        backgroundColor: 'rgba(0,0,0,0)',
        border: '1px solid #000',
        duration: 0.3
      });
      gsap.to(numberRef.current, { opacity: 1, color: '#000', duration: 0.3 });
    } else {
      gsap.to(pointRef.current, {
        scale: 1,
        backgroundColor: '#888',
        border: '0px solid #000',
        duration: 0.3
      });
      gsap.to(numberRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [active]);

  const handleMouseEnter = () => {
    if (!active && pointRef.current && numberRef.current) {
      gsap.to(pointRef.current, { scale: 2, border: '1px solid #000', duration: 0.3 });
      gsap.to(numberRef.current, { opacity: 1, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (!active && pointRef.current && numberRef.current) {
      gsap.to(pointRef.current, { scale: 1, border: '0px solid #000', duration: 0.3 });
      gsap.to(numberRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={pointRef}
      className={`timeline-point ${type} ${active ? 'active' : ''}`}
      style={{
        transform: `rotate(${angle}deg) translate(${radius}px)`,
        position: 'absolute'
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={numberRef}
        className="point-number"
        style={{ transform: 'translate(-50%, -50%) rotate(0deg)' }}
      >
        {index}
      </span>
    </div>
  );
};

export default TimelinePoint;
