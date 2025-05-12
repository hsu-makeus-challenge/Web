import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Google 로그인 콜백 처리 로직은 추후 구현
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          로그인 처리 중...
        </h2>
      </div>
    </div>
  );
};

export default GoogleLoginRedirectPage; 