import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-b from-background to-background/95">
      {/* Main spinner container with floating animation */}
      <div className="relative animate-[float_3s_ease-in-out_infinite]">
        {/* Decorative elements */}
        <div className="absolute -inset-8">
          <div className="absolute inset-0 rotate-45 opacity-20">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute h-4 w-4 rounded-full bg-primary animate-ping"
                style={{
                  top: `${i * 25}%`,
                  left: `${i * 25}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main plate container */}
        <div className="relative h-24 w-24">
          {/* Outer ring with gradient */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 bg-gradient-to-tr from-primary/5 to-primary/10" />
          
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-[spin_1s_linear_infinite]" />
          
          {/* Inner plate with steam effect */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/10 to-primary/5 backdrop-blur-sm">
            {/* Steam particles */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute -top-8 left-1/2 h-6 w-1.5 rounded-full bg-primary/40"
                style={{
                  transform: `translateX(${(i - 1) * 8}px)`,
                  animation: 'steam 2s ease-out infinite',
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* Utensils */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 space-y-1">
            <div className="h-8 w-1.5 rounded-full bg-primary animate-[bounce_1s_ease-in-out_infinite]" />
            <div className="h-6 w-1.5 rounded-full bg-primary animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
          </div>
        </div>
      </div>

      {/* Loading text with typewriter effect */}
      <div className="text-center space-y-2">
        <div className="text-primary/90 font-medium text-lg animate-pulse">
          Preparing your culinary experience
        </div>
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;