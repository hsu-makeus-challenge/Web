import { useParams, useNavigate } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Likes } from "../types/lp";
import useDeleteLike from "../hooks/mutation/useDeleteLike";
import usePostLike from "../hooks/mutation/usePostLike";
import LpDetailWithComments from "../components/LpDetailComments";
import useDeleteLp from "../hooks/mutation/useDeleteLp";

const LpDetailPage = () => {
  const { accessToken } = useAuth();
  const { lpId } = useParams();
  const navigate = useNavigate(); // ✅ 추가
  const {
    data: lp,
    isError,
    isPending,
  } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);

  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes.some(
    (like: Likes) => like.userId === me?.data.id
  );
  const { mutate: deleteLpMutate } = useDeleteLp({
    onSuccess: () => {
      alert("삭제 완료!");
      navigate("/"); // 홈으로 이동
    },
  });

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDisLikeLp = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  if (isError) {
    return <div>error...</div>;
  }

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{lp?.data.title}</h1>
        {me?.data.id === lp?.data.author.id && (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/lps/${lpId}/edit`)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              수정
            </button>
            <button
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  deleteLpMutate(Number(lpId));
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <img
        src={lp?.data.thumbnail}
        alt="썸네일"
        className="my-4 rounded-md w-full max-w-md"
      />
      <p className="mb-6 whitespace-pre-wrap">{lp?.data.content}</p>

      <button onClick={isLiked ? handleDisLikeLp : handleLikeLp}>
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>

      <LpDetailWithComments />
    </div>
  );
};

export default LpDetailPage;
