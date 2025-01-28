import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";



export const Category = ({
  title,
  categories = [],
  autoplay = true,
  autoplaySpeed = 3000,
  onSelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [itemsPerView, setItemsPerView] = useState(6);
  const sliderRef = useRef(null);

  
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(3);      
      else if (width < 768) setItemsPerView(4); 
      else if (width < 1024) setItemsPerView(5); 
      else if (width < 1280) setItemsPerView(6);
      else setItemsPerView(8);                  
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.max(0, categories.length - itemsPerView);
  const showNavigation = categories.length > itemsPerView;

  const handleNext = useCallback(() => {
    if (!showNavigation) return;
    setCurrentIndex(prev => (prev + 1) % (totalSlides + 1));
  }, [totalSlides, showNavigation]);

  const handlePrevious = useCallback(() => {
    if (!showNavigation) return;
    setCurrentIndex(prev => (prev - 1 + totalSlides + 1) % (totalSlides + 1));
  }, [totalSlides, showNavigation]);

  useEffect(() => {
    let intervalId;
    
    if (isPlaying && showNavigation) {
      intervalId = setInterval(handleNext, autoplaySpeed);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, handleNext, autoplaySpeed, showNavigation]);

  const handleMouseEnter = () => {
    if (autoplay && showNavigation) setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoplay && showNavigation) setIsPlaying(true);
  };

  if (!categories.length) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden bg-light"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center mb-4 px-2 sm:px-4">
        <h2 className="text-2xl font-semibold text-left mt-3">{title}</h2>
        {showNavigation && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className="p-2 bg-primary text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-primary text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
              aria-label="Next category"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex-shrink-0 transition-all duration-300`}
              style={{ width: `${90 / itemsPerView}%` }}
            >
              <div
                className="flex flex-col items-center justify-center cursor-pointer 
                           hover:scale-105 transition-transform gap-1 sm:gap-2
                           px-1 sm:px-2 py-2"
                onClick={() => onSelect?.(category)}
              >
                <div className="w- h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-gray-50 p-1.5 sm:p-2 flex items-center justify-center">
                  <img
                    src={category.category_image}
                    alt={category.category_name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm text-center font-medium line-clamp-2 px-0.5">
                  {category.category_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;