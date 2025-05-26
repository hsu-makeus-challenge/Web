import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../apis/lp";
import { Lp } from "../types/lp";

const LpDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: lp,
    isLoading,
    isError,
  } = useQuery<Lp>({
    queryKey: ["lp", id],
    queryFn: () => getLpById(id!),
    enabled: !!id, // id가 있을 때만 요청
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{lp.title}</h1>
      <p className="mt-2 text-gray-700">{lp.content}</p>
      <div className="flex justify-end gap-3">
        <button className="mt-2 text-sm text-gray-500">수정 버튼</button>
        <button className="mt-2 text-sm text-gray-500">삭제 버튼</button>
      </div>
      <img src={lp.thumbnail} alt={lp.title} className="mt-4 rounded" />
      <div className="flex justify-between">
        <p className="mt-2 text-sm text-gray-500">
          ❤️ 좋아요 {lp.likes.length}개
        </p>
        <button className="mt-2 text-sm text-gray-500">❤️ 좋아요 버튼</button>
      </div>
    </div>
  );
};

export default LpDetailPage;
