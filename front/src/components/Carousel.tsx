import React, { useState, useEffect } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="carousel">
      {/* <div className="carousel__controls">
        <button onClick={prevSlide} className="carousel__button carousel__prev">❮</button>
        <button onClick={nextSlide} className="carousel__button carousel__next">❯</button>
      </div> */}
      <div className="carousel__images-container" style={{
        transform: `translateX(-${currentIndex * 100}%)`, 
        transition: 'transform 0.5s ease-in-out', 
      }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} className="carousel__image" />
        ))}
      </div>
    </div>
  );
};

export default Carousel;