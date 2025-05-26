import { axiosInstance } from "../apis/axios";
import axios from "axios";
import { postLp } from "../apis/lp";
import { useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";

const LpCreateModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      onClose();
    },
    onError: (error) => {
      console.error("Failed to create LP:", error);
      if (axios.isAxiosError(error)) {
        console.error("서버 응답:", error.response?.data);
      }
    },
  });

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#121212] rounded-xl p-6 w-[400px] relative flex flex-col items-center gap-4 shadow-lg shadow-black/30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-white text-lg"
          onClick={onClose}
        >
          ×
        </button>

        {/* LP 이미지 */}
        <div
          onClick={handleThumbnailClick}
          className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-700 cursor-pointer"
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="LP"
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
              alt="LP 기본"
              className="w-full h-full object-cover opacity-40"
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* 제목 입력 */}
        <input
          className="w-full bg-[#2A2A2A] border border-[#3E3E3E] text-white rounded px-3 py-2 text-sm"
          placeholder="LP Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 내용 입력 */}
        <input
          className="w-full bg-[#2A2A2A] border border-[#3E3E3E] text-white rounded px-3 py-2 text-sm"
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 태그 입력 */}
        <div className="w-full flex gap-2">
          <input
            className="flex-1 bg-[#2A2A2A] border border-[#3E3E3E] text-white rounded px-3 py-2 text-sm"
            placeholder="LP Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTag();
            }}
          />
          <button
            className="bg-[#1DB954] px-3 py-2 rounded text-sm text-white hover:bg-[#1ED760]"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>

        {/* 태그 리스트 */}
        <div className="w-full flex flex-wrap gap-2">
          {tags.map((t, index) => (
            <div
              key={index}
              className="flex items-center bg-[#2a2a2a] text-white rounded-full px-4 py-1 text-sm font-medium"
            >
              <span className="mr-2">{t}</span>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() =>
                  setTags((prev) => prev.filter((_, i) => i !== index))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* 등록 버튼 */}
        <button
          className="w-full mt-2 bg-[#1DB954] hover:bg-[#1ED760] text-white font-semibold py-2 rounded"
          onClick={() => {
            if (!title.trim() || !content.trim()) {
              alert("제목과 내용을 모두 입력해주세요.");
              return;
            }

            const file = fileInputRef.current?.files?.[0];

            if (file) {
              const formData = new FormData();
              formData.append("file", file);

              axiosInstance
                .post("/v1/uploads", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                })
                .then((uploadRes) => {
                  const imageUrl = uploadRes.data?.data?.imageUrl ?? "";
                  mutation.mutate({
                    title: title.trim(),
                    content: content.trim(),
                    thumbnail: imageUrl,
                    tags: tags.filter((tag) => tag.trim() !== ""),
                    published: true,
                  });
                })
                .catch((error) => {
                  console.error("이미지 업로드 실패:", error);
                });
            } else {
              mutation.mutate({
                title: title.trim(),
                content: content.trim(),
                thumbnail: "",
                tags: tags.filter((tag) => tag.trim() !== ""),
                published: true,
              });
            }
          }}
        >
          LP 추가하기
        </button>
      </div>
    </div>
  );
};

export default LpCreateModal;
