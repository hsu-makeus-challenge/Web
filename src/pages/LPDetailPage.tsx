import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchLPDetail = async (lpid: string) => {
  const res = await fetch(`/v1/lps/${lpid}`);
  if (!res.ok) throw new Error("LP 상세 정보를 불러오지 못했습니다.");
  const json = await res.json();
  return json.data;
};

export default function LPDetailPage() {
  const { lpid } = useParams();
  const { data: lp, isLoading, isError } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => fetchLPDetail(lpid!)
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !lp) return <div>에러 발생!</div>;

  return (
    <div className="lp-detail-container p-6 bg-lightgrey min-h-screen text-black">
      <div className="relative mb-8">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-[400px] object-cover rounded-lg mb-4 filter blur-sm"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 text-white p-6 flex flex-col justify-center rounded-lg">
          <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
          <div className="text-lg mb-2">by {lp.author?.name}</div>
          <div className="mb-2">{lp.content}</div>
          <div className="mb-2">
            <b>태그:</b> {lp.tags && lp.tags.length > 0 ? lp.tags.map((tag: any) => <span key={tag.id} className="mr-2 text-blue-300">#{tag.name}</span>) : "없음"}
          </div>
          <div className="mb-2">
            <b>좋아요:</b> {lp.likes ? lp.likes.length : 0}
          </div>
          <div className="text-xs text-gray-300">
            생성일: {new Date(lp.createdAt).toLocaleString()}<br />
            수정일: {new Date(lp.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
      {/* 추가 정보가 있다면 아래에 더 표시 가능 */}
    </div>
  );
} 