import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LP } from "../types/lp";
import { FaHeart } from 'react-icons/fa';

// 임시 타입 정의 (실제 타입이 있다면 import해서 사용)
interface Tag {
  id: number | string;
  name: string;
}
interface Author {
  name?: string;
}

interface LPCardProps {
  lp: LP;
}

export default function LPCard({ lp }: LPCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`relative w-40 h-40 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 cursor-pointer ${isHovered ? "scale-110 shadow-xl z-20" : "z-10"}`}
      style={{ paddingBottom: "100%" }}
      onClick={() => navigate(`/lp/${lp.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="absolute top-0 left-0 w-full h-full object-cover select-none transition-transform duration-300"
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        draggable={false}
      />
      
      {/* 호버 시 어두운 오버레이와 정보 */}
      <div
        className={`absolute inset-0 bg-black p-4 flex flex-col justify-center items-center transition-all duration-300 ${
          isHovered 
            ? "bg-opacity-75 opacity-100" 
            : "bg-opacity-0 opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/lp/${lp.id}`);
        }}
      >
        <h3 className="text-lg font-bold mb-3 text-center text-white drop-shadow-lg">{lp.title}</h3>
        
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-200 drop-shadow-md">
            {lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : '알 수 없음'}
          </span>
          
          <div className="flex items-center gap-1 text-pink-400">
            <FaHeart />
            <span className="text-sm font-bold">{lp.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}