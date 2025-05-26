import {useParams} from "react-router-dom";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuth } from "../context/AuthContext.tsx";
import usePostLike from "../hooks/mutations/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/useDeleteLike.ts";
import LpCommentSection from "../components/LpComment/LpCommentSection";
import useEditLp from "../hooks/mutations/useEditLp.ts";
import useDeleteLp from "../hooks/mutations/useDeleteLp.ts";
import { useState } from "react";
import { uploadThumbnail } from "../apis/lp.ts";

const LpPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { data: lp, isLoading: lpLoading, isError: lpError } = useGetLpDetail(Number(lpId));
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken); 
  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate, mutateAsync } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: editLpMutate } = useEditLp(Number(lpId));
  const { mutate: deleteLpMutate } = useDeleteLp();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(lp?.title || "");
  const [editContent, setEditContent] = useState(lp?.content || "");
  const [editTags, setEditTags] = useState(lp?.tags.map(tag => tag.name) || []);
  const [tagInput, setTagInput] = useState("");
  const [editThumbnail, setEditThumbnail] = useState(lp?.thumbnail || "");

  const isLiked = lp?.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate({ id: Number(lpId) });
  };

  const handleDislikeLp = () => {
    disLikeMutate({ id: Number(lpId) });
  }

  if (lpLoading) return <div className="text-white p-10">로딩 중...</div>;
  if (lpError || !lp) return <div className="text-white p-10">LP 정보를 찾을 수 없습니다.</div>;
  const soundcloudSrc = `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${lp.soundcloud}&auto_play=true`;
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white p-6">
      <div className="bg-[#1e1e1e] p-8 rounded-xl max-w-2xl w-full shadow-lg">
        {isEditing ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-2xl font-bold mb-1 w-full bg-[#1b1b1b] text-white border border-gray-600 rounded p-2"
            />
          </>
        ) : (
          <h2 className="text-2xl font-bold mb-1">{lp.title}</h2>
        )}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
          <span className="text-[18px]">{lp.author.name}</span>
          <div className="flex space-x-2">
            {isEditing ? (
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    editLpMutate({
                      title: editTitle,
                      content: editContent,
                      tags: editTags,
                      soundcloud: lp.soundcloud,
                      thumbnail: editThumbnail
                    });
                    setIsEditing(false);
                  }}
                  className="text-sm bg-[#FF4E6B] text-white px-3 py-1 rounded hover:bg-[#FF0436]"
                >
                  저장
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                <EditButton />
              </button>
            )}
            <button onClick={() => deleteLpMutate(Number(lpId))}>
              <DeleteButton />
            </button>
          </div>
        </div>
        <div className="relative flex justify-center mb-6">
          <div className="w-80 h-80 rounded-full shadow-lg overflow-hidden relative">
            {isEditing ? (
              <label className="cursor-pointer">
                <img
                  src={editThumbnail || lp.thumbnail}
                  alt="LP thumbnail"
                  className="w-full h-full object-cover animate-spin"
                  style={{ animationDuration: '4s' }}
                />
                <input
                  type="file"
                  hidden
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const url = await uploadThumbnail(e.target.files[0]);
                      setEditThumbnail(url);
                    }
                  }}
                />
              </label>
            ) : (
              <img
                src={lp.thumbnail}
                alt="LP thumbnail"
                className="w-full h-full object-cover animate-spin"
                style={{ animationDuration: '4s' }}
              />
            )}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full z-10 border border-black" />
          </div>
          <iframe
            width="0"
            height="0"
            allow="autoplay"
            src={soundcloudSrc}
          />
        </div>
        {isEditing && (
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 px-2 py-1 rounded bg-gray-700"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (tagInput && !editTags.includes(tagInput)) {
                  setEditTags([...editTags, tagInput]);
                  setTagInput("");
                }
              }}
              className="px-3 bg-[#FF4E6B] rounded cursor-pointer hover:bg-[#FF0436] transition"
            >
              Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {(isEditing ? editTags : lp.tags.map(tag => tag.name)).map((tag) => (
            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-[#FF4E6B] rounded text-sm">
              #{tag}
              {isEditing && (
                <button
                  type="button"
                  className="text-white hover:text-gray-300"
                  onClick={() => setEditTags(editTags.filter((t) => t !== tag))}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="text-base mb-4 w-full bg-[#1b1b1b] text-white border border-gray-600 rounded p-2"
            rows={4}
          />
        ) : (
          <p className="text-base mb-4">{lp.content}</p>
        )}
        <div className="text-sm text-gray-400 mb-4">
          {new Date(lp.createdAt).toLocaleDateString()}
        </div>
        <button onClick={isLiked ? handleDislikeLp : handleLikeLp} className="flex">
          <Heart 
            className="mr-2"
            color={isLiked ? "red" : "black"}
            fill={isLiked ? "red" : "transparent"}
          />
          {lp.likes.length}
        </button>
        <LpCommentSection lpId={Number(lpId)} />
      </div>
    </div>
  );
};

export default LpPage;
