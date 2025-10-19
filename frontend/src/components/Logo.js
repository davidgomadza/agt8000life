import React from 'react';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: { diamond: 40, text: 'text-xl', container: 'w-16 h-16' },
    md: { diamond: 60, text: 'text-3xl', container: 'w-24 h-24' },
    lg: { diamond: 100, text: 'text-5xl', container: 'w-40 h-40' },
    xl: { diamond: 150, text: 'text-7xl', container: 'w-60 h-60' }
  };

  const currentSize = sizes[size];

  return (
    <div className="relative flex items-center justify-center" data-testid="agt-logo">
      {/* Animated Diamond */}
      <div className={`${currentSize.container} relative bounce-slow`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#188ade', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="url(#diamondGradient)"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        
        {/* AGT Text */}
        <div className={`absolute inset-0 flex items-center justify-center ${currentSize.text} font-bold text-white`}>
          AGT
        </div>
        
        {/* Sparkling Gold Sparkles */}
        <div className="absolute inset-0">
          <div className="sparkle absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full" style={{ animationDelay: '0s' }}></div>
          <div className="sparkle absolute top-1/4 right-0 w-2 h-2 bg-yellow-400 rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="sparkle absolute bottom-0 right-1/4 w-2 h-2 bg-yellow-400 rounded-full" style={{ animationDelay: '1s' }}></div>
          <div className="sparkle absolute bottom-1/4 left-0 w-2 h-2 bg-yellow-400 rounded-full" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;