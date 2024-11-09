import React, { useState } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[]; // An array of image URLs to display in the carousel
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop back to the first image
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Loop to the last image
  };

  return (
    <div className="carousel">
      <div className="carousel__controls">
        <button onClick={prevSlide} className="carousel__button carousel__prev">❮</button>
        <button onClick={nextSlide} className="carousel__button carousel__next">❯</button>
      </div>
      <div className="carousel__images">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel__image" />
      </div>
    </div>
  );
};

export default Carousel;