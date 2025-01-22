import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Clock, Home, ArrowLeft, CircleDot } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="relative">
          {/* Plate Design */}
       
          <h1 className="text-9xl font-bold text-primary">404</h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Oops! Your plate seems to be empty
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for has been cleared from our table. Let's get you back to our main dining area!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-full hover:bg-red-50 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Previous Menu
          </button>
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-red-700 transition-all duration-300"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Main Dining
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Clock className="w-5 h-5" />
          <span>Returning to main dining in {timer} seconds</span>
        </div>

        {/* Animated plate border */}
        <div className="relative mt-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-red-200"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-gradient-to-b from-red-50 to-white">
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-red-200 bg-white flex items-center justify-center animate-bounce"
                    style={{ 
                      animationDelay: `${i * 200}ms`,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {i === 0 && <span className="text-xl">🍽️</span>}
                    {i === 1 && <span className="text-xl">🍴</span>}
                    {i === 2 && <span className="text-xl">🥄</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;