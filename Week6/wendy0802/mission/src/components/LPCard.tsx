import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LP } from "../types/lp";

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
      className={` relative w-40 h-40 rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 cursor-pointer ${isHovered ? "scale-105 z-20" : "z-10"}`}
      style={{ paddingBottom: "100%" }}
      onClick={() => navigate(`/lp/${lp.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="absolute top-0 left-0 w-full h-full object-cover select-none"
        draggable={false}
      />
      {isHovered && (
        <div
          className="absolute inset-0 bg-black bg-opacity-80 p-4 text-white flex flex-col justify-center items-center z-30 transition-opacity duration-200 cursor-pointer"
          onClick={e => { e.stopPropagation(); navigate(`/lp/${lp.id}`); }}
        >
          <h3 className="text-lg font-bold mb-2 text-center drop-shadow">{lp.title}</h3>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-200 drop-shadow">업로드: {lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : '알 수 없음'}</span>
            <span className="text-xs text-gray-200 drop-shadow">좋아요: {lp.likes.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}