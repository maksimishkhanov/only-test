import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './TimelineNews.scss';

interface Props {
  news: { title: string; text: string }[];
}

const TimelineNews: React.FC<Props> = ({ news }) => {
  const swiperRef = useRef<any>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    if (!swiperRef.current) return;
    setCanPrev(!swiperRef.current.swiper.isBeginning);
    setCanNext(!swiperRef.current.swiper.isEnd);
  };

  useEffect(() => {
    updateButtons();
  }, [news]);

  return (
    <div className="timeline-news-container">
      {canPrev && (
        <div className="arrow left" onClick={() => swiperRef.current.swiper.slidePrev()}>
          <div className="corner"></div>
        </div>
      )}

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        grabCursor
        onSlideChange={updateButtons}
        onSwiper={updateButtons}
        ref={swiperRef}
      >
        {news.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="news-card">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {canNext && (
        <div className="arrow right" onClick={() => swiperRef.current.swiper.slideNext()}>
          <div className="corner"></div>
        </div>
      )}
    </div>
  );
};

export default TimelineNews;
