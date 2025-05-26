import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLpById, patchLp, deleteLp } from "../../apis/lp";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import LpAuthorInfo from "../../components/Detail/LpAuthorInfo";
import LpRecordPlayer from "../../components/Detail/LpRecordPlayer";
import LpTagList from "../../components/Detail/LpTagList";
import usePostLike from "../../hooks/mutations/usePostLike";
import useDeleteLike from "../../hooks/mutations/useDeleteLike";
import LpCommentSection from "../../components/Detail/Comment/LpCommentSection";
import { QUERY_KEY } from "../../constants/key";

interface Tag {
  id: number;
  name: string;
}

interface LpEditModalProps {
  title: string;
  content: string;
  thumbnail: string;
  tags: Tag[];
  onClose: () => void;
  lpId: number;
}

const LpEditModal = ({
  title,
  content,
  thumbnail,
  tags,
  onClose,
  lpId,
}: LpEditModalProps) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedTags, setEditedTags] = useState(tags.map((tag) => tag.name));
  const [editedThumbnail, setEditedThumbnail] = useState(thumbnail);
  const [editedFile, setEditedFile] = useState<File | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateLp, isLoading } = useMutation({
    mutationFn: (payload: any) => patchLp(lpId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpId],
        exact: true,
      });
      onClose();
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181818] rounded-lg shadow-lg max-w-3xl w-full p-6 space-y-6 text-white overflow-auto max-h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">LP 수정</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl leading-none hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <input
          className="w-full text-xl font-bold bg-transparent text-white border border-gray-500 rounded px-2 py-1"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Title"
        />
        <div className="flex items-center gap-4">
          {/* LP 이미지 */}
          <label className="cursor-pointer w-24 h-24 rounded-full overflow-hidden bg-gray-700">
            <img
              src={editedThumbnail}
              alt="thumbnail preview"
              className="w-full h-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <textarea
          className="w-full p-2 text-sm bg-[#1f1f1f] text-white border border-gray-500 rounded"
          rows={4}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder="Content"
        />
        <div className="flex flex-wrap gap-2">
          {editedTags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-[#2a2a2a] text-white rounded-full px-3 py-1 text-sm"
            >
              {tag}
              <button
                className="ml-2 text-gray-400 hover:text-white"
                onClick={() =>
                  setEditedTags((prev) => prev.filter((_, i) => i !== index))
                }
                type="button"
              >
                ×
              </button>
            </div>
          ))}
          <input
            className="bg-[#1f1f1f] border border-gray-600 text-white px-2 py-1 rounded text-sm"
            placeholder="새 태그 입력"
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isComposing) {
                e.preventDefault();
                const input = e.currentTarget;
                const value = input.value.trim();
                if (value && !editedTags.includes(value)) {
                  setEditedTags((prev) => [...prev, value]);
                  input.value = "";
                }
              }
            }}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              updateLp({
                title: editedTitle,
                content: editedContent,
                tags: editedTags,
                thumbnail: editedThumbnail,
                published: true,
                ...(editedFile && { file: editedFile }),
              })
            }
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            type="button"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

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

  const accessToken = localStorage.getItem("accessToken");
  const { data: me } = useGetMyInfo(accessToken || "");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const postLikeMutation = usePostLike();
  const deleteLikeMutation = useDeleteLike();

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
        {data.author.id === me?.data.id && (
          <div className="flex gap-2 text-gray-400">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487a2.1 2.1 0 113.001 2.937L8.25 19.036 3 21l1.964-5.25 11.898-11.263z"
                />
              </svg>
            </button>
            <button
              className="hover:text-white"
              onClick={async () => {
                if (!LPid) return;
                const confirmed = window.confirm("정말로 삭제하시겠습니까?");
                if (confirmed) {
                  try {
                    await deleteLp(Number(LPid));
                    window.location.href = "/";
                  } catch (err) {
                    console.error("삭제 실패:", err);
                    alert("삭제에 실패했습니다.");
                  }
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7.5V18a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 18V7.5M4.5 7.5h15m-10.5 0V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <LpRecordPlayer thumbnail={data.thumbnail} title={data.title} />
      <p className="text-center text-sm text-gray-400 leading-relaxed">
        {data.content}
      </p>
      <LpTagList tags={data.tags} />
      <div className="flex justify-center">
        <button
          onClick={() => {
            if (!me?.data?.id || !LPid) {
              console.warn("Missing userId or lpId");
              return;
            }

            const liked = data.likes.some((like) => like.userId === me.data.id);

            if (liked) {
              deleteLikeMutation.mutate(
                { lpId: Number(LPid) },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: [QUERY_KEY.lps, Number(LPid)],
                      exact: true,
                    });
                  },
                  onError: (error) => {
                    console.error("Failed to delete like:", error);
                  },
                }
              );
            } else {
              postLikeMutation.mutate(
                { lpId: Number(LPid) },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: [QUERY_KEY.lps, Number(LPid)],
                      exact: true,
                    });
                  },
                  onError: (error) => {
                    console.error("Failed to post like:", error);
                  },
                }
              );
            }
          }}
          className={`flex items-center ${
            data.likes.some((like) => like.userId === me?.data?.id)
              ? "text-pink-400"
              : "text-gray-400"
          } text-[11px] px-2 py-0.5 rounded-full gap-1 tracking-wide bg-[#282828] hover:opacity-80`}
        >
          <span>❤️</span>
          <span>{data.likes?.length || 0}</span>
        </button>
      </div>
      <LpCommentSection lpId={Number(LPid)} />

      {isEditModalOpen && LPid && (
        <LpEditModal
          title={data.title}
          content={data.content}
          thumbnail={data.thumbnail}
          tags={data.tags}
          onClose={() => setIsEditModalOpen(false)}
          lpId={Number(LPid)}
        />
      )}
    </div>
  );
};

export default LpDetail;
