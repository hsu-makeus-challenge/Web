import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lp } from '../../types/lp';

interface LpCardProps {
  lp: Lp;
}

const LpCard: React.FC<LpCardProps> = ({ lp }) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleCardClick = () => {
    if (!accessToken) {
      if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
        navigate('/login-page');
      }
      return;
    }
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden aspect-square relative shadow-lg">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex justify-between items-end">
            <div className="truncate">
              <h3 className="text-white font-medium truncate group-hover:text-indigo-300 transition-colors">
                {lp.title}
              </h3>
              <p className="text-gray-300 text-xs mt-1">
                {new Date(lp.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-white flex items-center gap-1 bg-black bg-opacity-50 px-2 py-1 rounded-full">
              <span className="text-red-500">♥</span>
              <span className="text-xs font-medium">
                {lp.likes?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
