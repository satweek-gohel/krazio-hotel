import React from 'react';



const OptionsSelector = ({
  selectedOptions,
  onOptionToggle
}) => {
  const options = ['Ham & Cheese', 'Panner', 'Mushroom'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div key={option} className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => onOptionToggle(option)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="ml-3">{option}</span>
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Whole</span>
            <span className="text-sm text-gray-600">$25</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionsSelector;