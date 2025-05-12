import { useRef, useState, useEffect } from "react";
import type { LpDetailItem } from "../../../types/lp";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ListTag from "./list-tag";
import ListTag2 from "../add/list-tag";
import Comment from "./comment";
import { useLpUpdateMutation } from "../../../hooks/lp/useLpUpdateMutation";
import { uploadImage } from "../../../apis/uploadAxios";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLpDeleteMutation } from "../../../hooks/lp/useLpDeleteMutation";
import { useLpLikeMutation } from "../../../hooks/lp/useLpLikeMutation";
import { useLpUnlikeMutation } from "../../../hooks/lp/useLpUnlikeMutation";

type Props = {
  data: LpDetailItem;
};

const Detail = ({ data }: Props) => {
  const navigate = useNavigate();
  const formattedDate = data.createdAt.slice(0, 10);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likes.length);

  useEffect(() => {
    const currentUserId = Number(localStorage.getItem("userId"));
    const liked = data.likes.some((like) => like.userId === currentUserId);
    setIsLiked(liked);
  }, [data.likes]);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [thumbnail, setThumbnail] = useState(data.thumbnail);
  const [tags, setTags] = useState(data.tags.map((tag) => tag.name));

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateMutation = useLpUpdateMutation();
  const deleteMutation = useLpDeleteMutation();
  const likeMutation = useLpLikeMutation();
  const unlikeMutation = useLpUnlikeMutation();

  const handleSave = async () => {
    try {
      let thumbnailToUse = thumbnail;

      if (thumbnailFile) {
        thumbnailToUse = await uploadImage(thumbnailFile);
      }

      updateMutation.mutate(
        {
          id: data.id,
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
      deleteMutation.mutate(data.id, {
        onSuccess: () => {
          alert("삭제 완료가 완료되었습니다.");
          navigate("/");
        },
        onError: () => {
          alert("삭제 실패. 다시 시도해주세요.");
        },
      });
    }
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      unlikeMutation.mutate(data.id, {
        onSuccess: () => {
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
        },
        onError: () => alert("좋아요 취소 실패"),
      });
    } else {
      likeMutation.mutate(data.id, {
        onSuccess: () => {
          setIsLiked(true);
          setLikeCount((prev) => prev + 1);
        },
        onError: () => alert("좋아요 추가 실패"),
      });
    }
  };

  return (
    <div className="flex flex-col gap-[1vw]">
      <div className="w-full h-full rounded bg-gray-700 flex justify-center py-[1vw]">
        <div className="w-[80%] flex gap-[2vw] flex-col items-center">

          <div className="w-full flex justify-between items-center">
            <div className="flex gap-[1vw] items-center">
              {data.author.avatar ? (
                <img src={data.author.avatar} alt="author" className="w-[2vw] h-[2vw] rounded-full object-cover" />
              ) : (
                <div className="w-[2vw] h-[2vw] rounded-full bg-gray-500" />
              )}
              <p className="text-[1vw]">{data.author.name}</p>
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
              <p className="w-[80%] text-[1vw]">{data.title}</p>
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
              <p className="text-[1vw]">{data.content}</p>
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
              <ListTag data={data.tags} />
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