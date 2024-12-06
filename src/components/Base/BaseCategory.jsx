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

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex >= categories.length ? 0 : newIndex;
    });
  }, [categories.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? categories.length - 1 : newIndex;
    });
  };

  // Autoplay functionality
  useEffect(() => {
    let intervalId;
    
    if (isPlaying && categories.length > 1) {
      intervalId = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, handleNext, autoplaySpeed, categories.length]);

  // Pause autoplay when hovering
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

  if (!categories.length) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }

  const getVisibleCategories = () => {
    const visibleCategories = [];
    const totalCategories = categories.length;
    const visibleCount = getVisibleItemCount().default; 
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % totalCategories;
      visibleCategories.push(categories[index]);
    }
    return visibleCategories;
  };

  return (
    <div 
      className="relative w-full mt-5 mb-10 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-2xl font-bold text-left">{title}</h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
            aria-label="Next category"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    
      <div className="relative group bg-white-500 shadow rounded ">
        <div className="relative overflow-hidden px-4">
          <div className="flex transition-transform duration-500 ease-in-out gap-0"> 
            {getVisibleCategories().map((category, index) => (
             <div
             key={`${currentIndex}-${index}`}
             className="flex-shrink-0 transition-all duration-300
                        w-1/4 sm:w-1/6 md:w-1/8 lg:w-1/10 xl:w-1/12 flex justify-center p-[10px]" 
           >
             <div 
               className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
               onClick={() => onSelect && onSelect(category)}
             >
               <div className="relative w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden mb-2">
                 <img
                   src={category.category_image || 'https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp'}
                   alt={category.name}
                   className="max-w-full max-h-full object-contain" 
                 />
               </div>
               <p className="text-xs text-center font-bold line-clamp-2">{category.category_name}</p>
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