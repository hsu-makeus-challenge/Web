import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LP } from "../types/lp";
import { FaHeart } from 'react-icons/fa';

interface Tag {
  id: number | string;
  name: string;
}

interface LPCardProps {
  lp: LP;
}

export default function LPCard({ lp }: LPCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative aspect-square w-40 cursor-pointer overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105"
        onClick={() => navigate(`/lp/${lp.id}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? 'opacity-70' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-white transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="mb-2 text-center text-lg font-bold">{lp.title}</h3>
          <div className="flex items-center gap-2">
            <FaHeart className="text-red-500" />
            <span>{lp.likes?.length || 0}</span>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}