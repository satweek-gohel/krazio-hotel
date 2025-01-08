import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Category = ({ 
  title, 
  categories = [],
  autoplay = true,
  autoplaySpeed = 3000,
  onSelect
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const getVisibleItemCount = () => {
    return {
      default: 12, 
      sm: 6,      
      md: 8,      
      lg: 10,   
      xl: 12      
    };
  };

  
  const getVisibleCategories = () => {
    const visibleCount = getVisibleItemCount().default;
    const uniqueCategories = Array.from(new Set(categories.map(c => c.category_name)))
      .map(name => categories.find(c => c.category_name === name));

   
    if (uniqueCategories.length <= visibleCount) {
      return uniqueCategories;
    }

   
    return uniqueCategories.slice(0, visibleCount);
  };

  const handleNext = useCallback(() => {
    const visibleCategories = getVisibleCategories();
    
   
    if (visibleCategories.length <= getVisibleItemCount().default) {
      return;
    }

    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex >= visibleCategories.length ? 0 : newIndex;
    });
  }, [categories]);

  const handlePrevious = () => {
    const visibleCategories = getVisibleCategories();
    
   
    if (visibleCategories.length <= getVisibleItemCount().default) {
      return;
    }

    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? visibleCategories.length - 1 : newIndex;
    });
  };


  useEffect(() => {
    let intervalId;
    const visibleCategories = getVisibleCategories();
    
   
    if (visibleCategories.length <= getVisibleItemCount().default) {
      setIsPlaying(false);
      return;
    }
    
    if (isPlaying && visibleCategories.length > 1) {
      intervalId = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, handleNext, autoplaySpeed, categories]);


  const handleMouseEnter = () => {
    const visibleCategories = getVisibleCategories();
    if (autoplay && visibleCategories.length > getVisibleItemCount().default) {
      setIsPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    const visibleCategories = getVisibleCategories();
    if (autoplay && visibleCategories.length > getVisibleItemCount().default) {
      setIsPlaying(true);
    }
  };

  if (!categories.length) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }

  const visibleCategories = getVisibleCategories();
  const showNavigation = visibleCategories.length > getVisibleItemCount().default;

  return (
    <div 
      className="relative w-full mb-10 rounded shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center mb-6  px-4">
        <h2 className="text-2xl font-semibold text-left">{title}</h2>
        {showNavigation && (
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              className="p-2 bg-primary text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-primary text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
              aria-label="Next category"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    
      <div className="relative group bg-white-500 shadow rounded">
        <div className="relative overflow-hidden px-4">
          <div className="flex transition-transform duration-500 ease-in-out gap-0"> 
            {visibleCategories.map((category, index) => (
              <div
                key={`${index}`}
                className="flex-shrink-0 transition-all duration-300
                           w-1/4 sm:w-1/6 md:w-1/8 lg:w-1/10 xl:w-1/12 flex justify-center p-[10px]" 
              >
                <div 
                  className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => onSelect && onSelect(category)}
                >
                  <div className="relative w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg overflow-hidden mb-2">
                    <img
                      src={category.category_image || 'https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp'}
                      alt={category.name}
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <p className="text-[9px] sm:text-[9px] lg:text-[12px] text-center font-semibold line-clamp-2">
                    {category.category_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;