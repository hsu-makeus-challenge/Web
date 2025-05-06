import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../apis/auth';

interface LpDetail {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  likes: {
    id: number;
    userId: number;
    lpId: number;
  }[];
  audioUrl?: string;
}

const fetchLpDetail = async (lpId: string): Promise<LpDetail> => {
  try {
    const res = await axiosInstance.get(`/v1/lps/${lpId}`);
    console.log('API 응답:', res.data);
    return res.data.data;
  } catch (error) {
    console.error('LP 상세 정보 조회 실패:', error);
    throw error;
  }
};

const LpDetailPage = () => {
  const { lpId } = useParams();
  console.log('현재 lpId:', lpId);

  const query = useQuery({
    queryKey: ['lpDetail', lpId],
    queryFn: () => fetchLpDetail(lpId!),
    enabled: !!lpId,
    retry: 1,
  });

  console.log('쿼리 상태:', {
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    data: query.data
  });

  const data = query.data as LpDetail | undefined;
  const { isLoading, isError } = query;

  if (isLoading) return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">로딩 중...</div>;
  if (isError) {
    console.error('에러 상세:', query.error);
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)] text-red-500">LP 정보를 불러올 수 없습니다.</div>;
  }
  if (!data) return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">데이터가 없습니다.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <div className="bg-[#232b3b] rounded-xl p-8 w-full max-w-2xl shadow-lg relative">
        {/* 작성자, 제목, 날짜 */}
        <div className="flex items-center gap-3 mb-2">
          <img src={data.author?.avatar || '/default-profile.png'} alt="작성자" className="w-10 h-10 rounded-full" />
          <span className="text-base font-semibold">{data.author?.name}</span>
          <span className="ml-auto text-xs text-gray-400">{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="text-2xl font-bold mb-4">{data.title}</div>
        {/* 앨범 이미지와 수정/삭제 버튼 */}
        <div className="relative flex justify-center mb-6">
          <img src={data.thumbnail} alt={data.title} className="w-80 h-80 object-cover rounded-lg shadow spin-slow" />
          {/* 수정/삭제 버튼을 앨범 이미지 우상단에 배치 */}
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button className="text-gray-400 hover:text-white bg-[#232b3b] rounded-full p-1"><span className="material-icons">edit</span></button>
            <button className="text-gray-400 hover:text-red-500 bg-[#232b3b] rounded-full p-1"><span className="material-icons">delete</span></button>
          </div>
        </div>
        {/* 오디오 플레이어 (audioUrl이 있다고 가정) */}
        {data.audioUrl && (
          <audio src={data.audioUrl} controls autoPlay loop className="mx-auto mb-4" />
        )}
        {/* 설명 */}
        <div className="text-gray-200 text-center mb-4">{data.content}</div>
        {/* 태그 */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {data.tags?.map((tag: { id: number; name: string }) => (
            <span key={tag.id} className="bg-gray-700 text-xs px-3 py-1 rounded-full text-gray-200">#{tag.name}</span>
          ))}
        </div>
        {/* 좋아요 버튼 (디자인만) */}
        <div className="flex justify-center items-center gap-1 text-pink-400 text-xl mt-2">
          <span className="material-icons">favorite</span>
          <span>{data.likes?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage; 