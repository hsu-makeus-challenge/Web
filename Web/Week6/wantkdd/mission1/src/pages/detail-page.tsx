import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../apis/axios';
import { QUERY_KEY } from '../constants/key';
import { Tag, Likes } from '../types/lp';

interface LpDetailData {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
  author?: {
    id: number;
    nickname: string;
  };
}

interface LpDetailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LpDetailData;
}

const getLpDetail = async (id: string): Promise<LpDetailData> => {
  const { data } = await axiosInstance.get<LpDetailResponse>(`/v1/lps/${id}`);
  return data.data;
};

const LpDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.lps, id],
    queryFn: () => getLpDetail(id as string),
  });
  console.log(data);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-xl text-white mb-4">로딩 중...</h2>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl text-red-500 mb-4">
          LP를 불러오는데 실패했습니다
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                {data.author?.nickname?.charAt(0) || '?'}
              </div>
              <span className="ml-3 text-sm text-gray-300">
                {data.author?.nickname || '익명'}
              </span>
            </div>

            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-white">
                수정
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                삭제
              </button>
            </div>
          </div>

          <div className="text-center my-4">
            <h1 className="text-xl font-bold">{data.title}</h1>
            <p className="text-sm text-gray-400">
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-center py-8 relative">
            <div
              className={`w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg cursor-pointer ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 bg-gray-900 rounded-full border-2 border-gray-700"></div>
              </div>
            </div>
          </div>

          <div className="p-6 text-center">
            <p className="text-sm text-gray-400 mb-4">{data.content}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {data.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button className="flex items-center justify-center text-pink-500 hover:text-pink-400">
                <span>♥</span>
                <span className="ml-2">{data.likes.length}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LpDetailPage;
