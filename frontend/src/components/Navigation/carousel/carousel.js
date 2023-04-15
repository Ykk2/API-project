import React, { useState, useEffect } from 'react';
import './carousel.css';

const CarouselItem = ({ description, src }) => (

  <div className="carousel-item">
    <img src={src} className={`item-icon`} />
    <p className="item-description">{description}</p>
  </div>
);


const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(Math.floor((window.innerWidth - 100) / 120));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex(currentIndex - visibleItems);
    setTranslateValue(translateValue - visibleItems * (100 + 16));
  };

  const handleNext = () => {
    const remainingItems = items.length - (currentIndex + visibleItems);
    const itemsToShow = Math.min(remainingItems, visibleItems);
    setCurrentIndex(currentIndex + itemsToShow);
  };

  return (
    <div className="carousel-container">
      {currentIndex > 0 && (
        <button className="carousel-button prev" onClick={handlePrev}>
          &lsaquo;
        </button>
      )}
      <div className="carousel-items">
        <div
          className="carousel-items-inner"
          style={{
            transform: `translateX(-${currentIndex * (50)}px)`,
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          {items.map((item, index) => (
            <CarouselItem key={index} src={item.src} description={item.description} />
          ))}
        </div>
      </div>
      {currentIndex + visibleItems < items.length && (
        <button className="carousel-button next" onClick={handleNext}>
          &rsaquo;
        </button>
      )}
    </div>
  );
};

export default Carousel;
