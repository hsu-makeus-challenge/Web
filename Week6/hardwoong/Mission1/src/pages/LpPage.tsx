import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

interface Author {
  id: number;
  name: string;
  avatar?: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Like {
  id: number;
  userId: number;
  lpId: number;
}

interface LpData {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  likes: Like[];
  tags: Tag[];
  author: Author;
  soundcloud:string;
}

const LpPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const [lp, setLp] = useState<LpData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lpId) return;

    const fetchLp = async () => {
      try {
        const numericId = Number(lpId);
        const response = await axios.get(`http://localhost:8000/v1/lps/${numericId}`);
        setLp(response.data.data);
      } catch (error) {
        console.error("LP 조회 실패", error);
        setLp(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLp();
  }, [lpId]);

  if (loading) return <div className="text-white p-10">로딩 중...</div>;
  if (!lp) return <div className="text-white p-10">LP 정보를 찾을 수 없습니다.</div>;
  const soundcloudSrc = `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${lp.soundcloud}&auto_play=true`;
  console.log(soundcloudSrc);
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
      <div className="bg-[#1e1e1e] p-8 rounded-xl max-w-2xl w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-1">{lp.title}</h2>
        <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
          <span className="text-[18px]">{lp.author.name}</span>
          <div className="flex space-x-2">
            <EditButton />
            <DeleteButton />
          </div>
        </div>
        <div className="relative flex justify-center mb-6">
          <div className="w-80 h-80 rounded-full shadow-lg overflow-hidden relative">
            <img
              src={lp.thumbnail}
              alt="LP thumbnail"
              className="w-full h-full object-cover animate-spin"
              style={{ animationDuration: '4s' }}
            />
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full z-10 border border-black" />
          </div>
          <iframe
            width="0"
            height="0"
            allow="autoplay"
            src={soundcloudSrc}
          />
        </div>
        <p className="text-base mb-4">{lp.content}</p>
        <div className="text-sm text-gray-400 mb-4">
          {new Date(lp.createdAt).toLocaleDateString()}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {lp.tags.map(tag => (
            <span key={tag.id} className="bg-gray-700 px-2 py-0 rounded text-sm">#{tag.name}</span>
          ))}
        </div>
        <div className="text-center mt-2">
          <span className="text-[#FF4E6B] text-lg">👍 {lp.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpPage;