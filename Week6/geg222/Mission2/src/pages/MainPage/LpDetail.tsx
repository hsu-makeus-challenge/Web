import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../../apis/lp";
import LpAuthorInfo from "../../components/Detail/LpAuthorInfo";
import LpRecordPlayer from "../../components/Detail/LpRecordPlayer";
import LpTagList from "../../components/Detail/LpTagList";
import LpLikeDisplay from "../../components/Detail/LpLikeDisplay";
import LpCommentSection from "../../components/Detail/Comment/LpCommentSection";

const LpDetail = () => {
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
      <h1 className="text-xl font-bold tracking-tight text-white">
        {data.title}
      </h1>
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
