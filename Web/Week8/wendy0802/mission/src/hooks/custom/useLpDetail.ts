import { useState } from "react";
// import { LP } from "../../types/lp";

export default function useLpDetail(lpId: number) {
  // 예시 상태
  const [lpData, setLpData] = useState<any>(null);
  const [isLpLoading, setIsLpLoading] = useState(false);
  const [lpError, setLpError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  return {
    lpData,
    isLpLoading,
    lpError,
    isEditMode,
    setIsEditMode,
    isPlaying,
    setIsPlaying,
    isLiked,

    isDeleting,
  };
} 