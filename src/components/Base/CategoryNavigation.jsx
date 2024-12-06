import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryNavigation = ({ title, onPrevious, onNext }) => {
  return (
    <div className="flex justify-between items-center mb-6 px-4">
      <h2 className="text-2xl font-bold text-left">{title}</h2>
      <div className="flex gap-4">
        <button
          onClick={onPrevious}
          className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
          aria-label="Previous category"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
          aria-label="Next category"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryNavigation;