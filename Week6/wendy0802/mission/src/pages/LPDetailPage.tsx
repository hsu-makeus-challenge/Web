import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLPDetail } from '../api/lp';
import { LP } from '../types/lp';
import { string } from 'zod';

const LPDetailPage = (): JSX.Element => {
  const { lpId } = useParams<{ lpId: string }>();
  const [lp, setLp] = useState<LP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLPDetail = async () => {
      if (!lpId) return;
      
      try {
        setLoading(true);
        const response = await getLPDetail(lpId);
        setLp(response.data);
        setError(null);
      } catch (err) {
        setError('LP 상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchLPDetail();
  }, [lpId]);

  if (loading) return <div className="text-center p-4">로딩 중...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!lp) return <div className="text-center p-4">LP를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div
          onClick={() => navigate(`${lp.id}`)}
          className="w-full h-96 object-cover"
        >
          <img 
            src={lp.thumbnail} 
            alt={lp.title}
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-4">{lp.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{lp.content}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {lp.tags.map((tag) => (
              <span key={tag.id} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                {tag.name}
              </span>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex items-center gap-4 mb-4">
              {lp.author?.avatar && (
                <img 
                  src={lp.author.avatar} 
                  alt={lp.author.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="text-white font-semibold">{lp.author?.name}</h3>
                <p className="text-gray-400 text-sm">{lp.author?.email}</p>
              </div>
            </div>
            {lp.author?.bio && (
              <p className="text-gray-300 text-sm">{lp.author.bio}</p>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center text-gray-400 text-sm">
            <span>작성일: {new Date(lp.createdAt).toLocaleDateString()}</span>
            <span>좋아요: {lp.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPDetailPage; 