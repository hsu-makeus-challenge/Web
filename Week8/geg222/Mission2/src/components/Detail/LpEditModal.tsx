import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

interface Props {
  lpId: number;
  defaultTitle: string;
  defaultContent: string;
  defaultThumbnail: string;
  defaultTags: string[];
  onClose: () => void;
}

const LpEditModal = ({
  lpId,
  defaultTitle,
  defaultContent,
  defaultThumbnail,
  defaultTags,
  onClose,
}: Props) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [thumbnail, setThumbnail] = useState<string>(defaultThumbnail);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updateData: {
      lpId: number;
      title: string;
      content: string;
      tags: string[];
      published: boolean;
      thumbnail: string;
      file?: File;
    }) =>
      patchLp(updateData.lpId, {
        title: updateData.title,
        content: updateData.content,
        tags: updateData.tags,
        published: updateData.published,
        thumbnail: updateData.thumbnail,
        file: updateData.file,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update LP:", error);
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

  const handleSubmit = () => {
    const file = fileInputRef.current?.files?.[0];

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    mutation.mutate({
      lpId,
      title: title.trim(),
      content: content.trim(),
      tags,
      published: true,
      thumbnail,
      file,
    });
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

        <input
          className="w-full bg-[#2A2A2A] border border-[#3E3E3E] text-white rounded px-3 py-2 text-sm"
          placeholder="LP Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full bg-[#2A2A2A] border border-[#3E3E3E] text-white rounded px-3 py-2 text-sm"
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="w-full flex gap-2">
          <input
            className="flex-1 bg-[#2A2A2A] border border-[#3E3E3E] text-white rounded px-3 py-2 text-sm"
            placeholder="LP Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            className="bg-[#1DB954] px-3 py-2 rounded text-sm text-white hover:bg-[#1ED760]"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>

        <div className="w-full flex flex-wrap gap-2">
          {(tags ?? []).map((t, index) => (
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

        <button
          className="w-full mt-2 bg-[#1DB954] hover:bg-[#1ED760] text-white font-semibold py-2 rounded"
          onClick={handleSubmit}
        >
          LP 수정하기
        </button>
      </div>
    </div>
  );
};

export default LpEditModal;