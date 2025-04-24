import React from 'react';

interface ErrorFallbackProps {
  message?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  message = '에러가 발생했습니다.' 
}) => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <span className="text-red-500 text-2xl">{message}</span>
    </div>
  );
}; 