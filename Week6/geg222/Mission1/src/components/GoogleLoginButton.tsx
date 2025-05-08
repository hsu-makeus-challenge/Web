import React from 'react';

interface GoogleLoginButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const GoogleLoginButton = ({ onClick, className = '', children }: GoogleLoginButtonProps) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`w-full py-3 px-8 rounded-full border border-[#727272] hover:border-white text-white font-semibold flex items-center justify-center gap-2 transition-colors ${className}`}
    >
      <img
        src="/images/google.png"
        alt="Google logo"
        className="w-6 h-6"
      />
      {children}
    </button>
  );
};

export default GoogleLoginButton;