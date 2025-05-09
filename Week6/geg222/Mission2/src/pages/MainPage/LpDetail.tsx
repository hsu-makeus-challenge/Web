import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../../apis/lp";
import LpAuthorInfo from "../../components/Detail/LpAuthorInfo";
import LpRecordPlayer from "../../components/Detail/LpRecordPlayer";
import LpTagList from "../../components/Detail/LpTagList";
import LpLikeDisplay from "../../components/Detail/LpLikeDisplay";
import LpCommentSection from "../../components/Detail/Comment/LpCommentSection";

const LpDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { LPid } = useParams<{ LPid: string }>();
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lp", LPid],
    queryFn: () => getLpById(LPid!),
    enabled: !!LPid,
  });
  const data = response?.data;

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <div className="text-white">데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#181818] rounded-lg shadow-lg text-white space-y-6">
      <LpAuthorInfo
        author={data.author}
        authorId={data.authorId}
        createdAt={data.createdAt}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-white">
          {data.title}
        </h1>
        <div className="flex gap-2 text-gray-400">
          <button className="hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 113.001 2.937L8.25 19.036 3 21l1.964-5.25 11.898-11.263z" />
            </svg>
          </button>
          <button className="hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V18a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 18V7.5M4.5 7.5h15m-10.5 0V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5" />
            </svg>
          </button>
        </div>
      </div>
      <LpRecordPlayer thumbnail={data.thumbnail} title={data.title} />
      <p className="text-center text-sm text-gray-400 leading-relaxed">
        {data.content}
      </p>
      <LpTagList tags={data.tags} />
      <LpLikeDisplay likes={data.likes} />
      <LpCommentSection lpId={Number(LPid)} />
    </div>
  );
};

export default LpDetail;
