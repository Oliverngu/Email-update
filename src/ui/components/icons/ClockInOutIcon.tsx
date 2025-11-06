import React from 'react';

const ClockInOutIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m-4-8a8 8 0 100 16 8 8 0 000-16z" />
  </svg>
);

export default ClockInOutIcon;