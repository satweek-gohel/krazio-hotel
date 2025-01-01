import React from 'react';

const TipSection = ({ tips, selectedTip, onTipSelect }) => {
  return (
    <div className="mb-6 border p-3 rounded">
      <div className="flex items-center gap-2 mb-4">
        <img 
          src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=50&h=50&fit=crop" 
          alt="Tip" 
          className="w-8 h-8 rounded-full" 
        />
        <p className="text-sm text-gray-600">Show your support with a small tip.</p>
      </div>
      <div className="flex gap-3">
        {tips?.filter(tip => tip.tips_type === "0")?.map(tip => (
          <button
            key={tip.branch_tips_id}
            onClick={() => onTipSelect(Number(tip.tips_value))}
            className={`flex-1 py-2 ${
              selectedTip === Number(tip.tips_value)
                ? 'bg-red-600 text-white'
                : 'border border-gray-200 text-gray-700'
            } rounded-lg text-xs`}
          >
            ${tip.tips_value}
          </button>
        ))}
        <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700 text-xs">
          Other
        </button>
      </div>
    </div>
  );
};

export default TipSection;