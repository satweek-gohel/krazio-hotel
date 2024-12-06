import React, { useState } from 'react';

const ImageSlider = ({ 
  images, 
  height = "350px" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-xl"
      style={{ height }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Previous Image Peek */}
        <div className="absolute left-0 w-[15%] sm:w-[20%] h-full opacity-50">
          <div className="relative h-full transform scale-95 transition-transform">
            <img
              src={images[(currentIndex - 1 + images.length) % images.length]}
              alt="previous"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

        {/* Current Image */}
        <div className="w-[100%] sm:w-[60%] h-full z-10 px-1 sm:px-2">
          <div className="relative h-full transform scale-100 transition-all duration-500">
            <img
              src={images[currentIndex]}
              alt="current"
              className="w-full h-full rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Next Image Peek */}
        <div className="absolute right-0 w-[15%] sm:w-[20%] h-full opacity-50">
          <div className="relative h-full transform scale-95 transition-transform">
            <img
              src={images[(currentIndex + 1) % images.length]}
              alt="next"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === index 
                ? 'bg-white w-4' 
                : 'bg-white/50 w-1.5'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;