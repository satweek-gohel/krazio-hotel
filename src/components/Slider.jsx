import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "./Enumes/Enumes";

const CenterFocusSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getPreviousIndex = () => {
    return currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  };

  const handlePrevious = () => {
    setCurrentIndex(getPreviousIndex());
  };

  const handleNext = () => {
    setCurrentIndex(getNextIndex());
  };

  return (
    <div className="relative w-full mt-10 mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-4">
        {/* Previous Image: Hidden on small screens */}
        <div
          className="relative w-[15%] hidden md:block overflow-hidden opacity-50 cursor-pointer rounded-lg"
          onClick={handlePrevious}
        >
          <img
            src={images[getPreviousIndex()].src}
            alt={images[getPreviousIndex()].alt}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Center Image: Always Visible */}
        <div className="relative w-full h-100 md:w-[70%] rounded-lg">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-[100%] h-80  bg-right object-cover rounded-lg shadow-xl "
          />
        </div>

        {/* Next Image: Hidden on small screens */}
        <div
          className="relative w-[15%] hidden md:block overflow-hidden opacity-50 cursor-pointer rounded-lg"
          onClick={handleNext}
        >
          <img
            src={images[getNextIndex()].src}
            alt={images[getNextIndex()].alt}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-red-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CenterFocusSlider;
