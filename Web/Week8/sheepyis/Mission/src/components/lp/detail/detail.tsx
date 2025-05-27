import { useEffect, useRef, useState } from "react";
import type { LpDetailItem } from "../../../types/lp";
import { FiTrash2, FiEdit2, FiCheck } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ListTag from "./list-tag";
import ListTag2 from "../add/list-tag";
import Comment from "./comment";
import { useNavigate } from "react-router-dom";
import { useLpUpdateMutation } from "../../../hooks/lp/useLpUpdateMutation";
import { useLpDeleteMutation } from "../../../hooks/lp/useLpDeleteMutation";
import { useLpLikeMutation } from "../../../hooks/lp/useLpLikeMutation";
import { useLpUnlikeMutation } from "../../../hooks/lp/useLpUnlikeMutation";
import { useLpDetail } from "../../../hooks/lp/useLpDetailQuery";
import { uploadImage } from "../../../apis/uploadAxios";

type Props = {
  data: LpDetailItem;
};

const Detail = ({ data }: Props) => {
  const navigate = useNavigate();
  const currentUserId = Number(localStorage.getItem("userId"));
  const { data: lpData, isLoading, refetch } = useLpDetail(String(data.id));

  const updateMutation = useLpUpdateMutation();
  const deleteMutation = useLpDeleteMutation();
  const likeMutation = useLpLikeMutation();
  const unlikeMutation = useLpUnlikeMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  type Like = LpDetailItem["likes"][number];
  type Tag = LpDetailItem["tags"][number];

  useEffect(() => {
    if (lpData) {
      setTitle(lpData.title);
      setContent(lpData.content);
      setThumbnail(lpData.thumbnail);
      setTags(lpData.tags.map((tag: Tag) => tag.name));
    }
  }, [lpData]);

const isLiked = lpData.likes.some((like: Like) => like.userId === currentUserId);
  const likeCount = lpData.likes.length;
  const formattedDate = lpData.createdAt.slice(0, 10);

  const handleSave = async () => {
    try {
      let thumbnailToUse = thumbnail;

      if (thumbnailFile) {
        thumbnailToUse = await uploadImage(thumbnailFile);
      }

      updateMutation.mutate(
        {
          id: lpData.id,
          payload: {
            title,
            content,
            thumbnail: thumbnailToUse,
            tags,
            published: true,
          },
        },
        {
          onSuccess: () => {
            alert("수정이 완료되었습니다.");
            setIsEditing(false);
          },
          onError: () => {
            alert("수정 실패");
          },
        }
      );
    } catch (err) {
      alert("이미지 업로드 또는 수정 중 오류가 발생했습니다.");
      console.error("에러 내용:", err);
    }
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(lpData.id, {
        onSuccess: () => {
          alert("삭제 완료가 완료되었습니다.");
          navigate("/");
          window.location.reload();
        },
        onError: () => {
          alert("삭제 실패. 다시 시도해주세요.");
        },
      });
    }
  };

  const handleLikeToggle = () => {
    const mutation = isLiked ? unlikeMutation : likeMutation;
    mutation.mutate(lpData.id, {
      onSettled: () => {
        refetch();
      },
    });
  };

  return (
    <div className="flex flex-col gap-[1vw]">
      <div className="w-full h-full rounded bg-gray-700 flex justify-center py-[1vw]">
        <div className="w-[80%] flex gap-[2vw] flex-col items-center">

          <div className="w-full flex justify-between items-center">
            <div className="flex gap-[1vw] items-center">
              {lpData.author.avatar ? (
                <img src={lpData.author.avatar} alt="author" className="w-[2vw] h-[2vw] rounded-full object-cover" />
              ) : (
                <div className="w-[2vw] h-[2vw] rounded-full bg-gray-500" />
              )}
              <p className="text-[1vw]">{lpData.author.name}</p>
            </div>
            <p className="text-[1vw]">{formattedDate}</p>
          </div>

          <div className="w-full flex justify-between items-center">
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[90%] text-[1vw] px-[1vw] py-[0.5vw] rounded bg-gray-600 text-white"
              />
            ) : (
              <p className="w-[80%] text-[1vw]">{lpData.title}</p>
            )}
            <div className="flex gap-[1vw]">
              {isEditing ? (
                <button onClick={handleSave} className="hover:text-green-400 text-[2vw] font-bold cursor-pointer">
                  <FiCheck />
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)}>
                  <FiEdit2 className="text-[1.2vw] text-white hover:text-pink-400 cursor-pointer" />
                </button>
              )}
              <button onClick={handleDelete}>
                <FiTrash2 className="text-[1.2vw] text-white hover:text-red-400 cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="relative w-[30vw] h-[30vw] shadow-lg shadow-black flex justify-center items-center">
            <img
              src={
                thumbnailFile
                  ? URL.createObjectURL(thumbnailFile)
                  : typeof thumbnail === "string"
                  ? thumbnail
                  : ""
              }
              alt={title}
              className="w-[25vw] h-[25vw] rounded-full border-black border-[0.5vw] cursor-pointer"
              onClick={() => {
                if (isEditing && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setThumbnailFile(file);
                }
              }}
            />
            <div className="bg-white w-[6vw] h-[6vw] absolute rounded-full border-[0.3vw] border-gray-700" />
          </div>

          <div className="w-full">
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-[1vw] bg-gray-600 text-white px-[1vw] py-[0.5vw] rounded resize-none"
              />
            ) : (
              <p className="text-[1vw]">{lpData.content}</p>
            )}
          </div>

          <div className="w-full">
            {isEditing ? (
              <ListTag2
                tags={tags}
                onRemove={(tagToRemove) => {
                  setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
                }}
              />
            ): (
              <ListTag data={lpData.tags} />
            )}
          </div>

          <div className="w-full flex justify-center items-center gap-[0.5vw]">
            <button onClick={handleLikeToggle}>
              {isLiked ? (
                <AiFillHeart className="text-[1.5vw] text-pink-500" />
              ) : (
                <AiOutlineHeart className="text-[1.5vw] text-white hover:text-pink-400" />
              )}
            </button>
            <p className="text-white text-[1vw]">{likeCount}</p>
          </div>
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default Detail;