import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useGetLpList from '../hooks/queries/useGetLpList';
import { Lp } from '../types/lp';

const HomePage = () => {
  const [order, setOrder] = useState('desc');
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const { data, isLoading, isError, error } = useGetLpList({});

  const handleCardClick = (id: number) => {
    if (!accessToken) {
      if (window.confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
        navigate('/login-page');
      }
      return;
    }
    navigate(`/lp/${id}`);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl font-medium animate-pulse">
          로딩 중...
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">에러 발생: {error.message}</div>
      </div>
    );

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <div className="bg-gray-800 rounded-lg p-1 inline-flex">
          <button
            className={`px-4 py-2 rounded-md transition-all ${
              order === 'asc'
                ? 'bg-pink-600 text-white'
                : 'bg-transparent text-gray-300 hover:text-white'
            }`}
            onClick={() => setOrder('asc')}
          >
            오래된순
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-all ${
              order === 'desc'
                ? 'bg-pink-600 text-white'
                : 'bg-transparent text-gray-300 hover:text-white'
            }`}
            onClick={() => setOrder('desc')}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.length === 0 && (
          <div className="text-white text-lg col-span-full text-center py-10">
            LP가 없습니다.
          </div>
        )}

        {data?.map((lp: Lp) => (
          <div
            key={lp.id}
            onClick={() => handleCardClick(lp.id)}
            className="group cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden aspect-square relative shadow-lg">
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover"
              />

              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

              {/* 컨텐츠 */}
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
        ))}
      </div>
    </div>
  );
};

export default HomePage;
