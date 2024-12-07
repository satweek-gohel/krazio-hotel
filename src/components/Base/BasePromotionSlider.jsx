import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PromotionalSlider = ({ 
  title, 
  images = [], 
  autoplay = true, 
  autoplaySpeed = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const formattedImages = images.map((image, index) => {
    if (typeof image === 'string') {
      return {
        src: image,
        alt: `Image ${index + 1}`
      };
    }
    return image;
  });

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex >= formattedImages.length ? 0 : newIndex;
    });
  }, [formattedImages.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? formattedImages.length - 1 : newIndex;
    });
  };

  // Autoplay functionality
  useEffect(() => {
    let intervalId;
    
    if (isPlaying && formattedImages.length > 1) {
      intervalId = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, handleNext, autoplaySpeed, formattedImages.length]);

  // Pause autoplay when hovering over the slider
  const handleMouseEnter = () => {
    if (autoplay) {
      setIsPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay) {
      setIsPlaying(true);
    }
  };

  if (!formattedImages.length) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const getVisibleImages = () => {
    const visibleImages = [];
    const totalImages = formattedImages.length;
    
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % totalImages;
      visibleImages.push(formattedImages[index]);
    }
    return visibleImages;
  };

  return (
    <div 
      className="relative w-full mt-10 mx-auto px-4 py-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title and Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-left text-white">{title}</h2>

        {/* Navigation Controls */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 k transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700  transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Slider Images Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-4"
        >
          {getVisibleImages().map((image, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 transition-all duration-300"
            >
              <div className="relative aspect-[4/2] rounded-lg overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain transition-transform hover:scale-110 duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionalSlider;