import React from 'react';

interface TimelineEventProps {
  event: { year: number; text: string };
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
  return (
    <div className="timeline-event">
      <h2>{event.year}</h2>
      <p>{event.text}</p>
    </div>
  );
};

export default TimelineEvent;
