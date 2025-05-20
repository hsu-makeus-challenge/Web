import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useUpdateLp from "../hooks/mutation/useUpdateLp";

const LpEditPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const { data: lp } = useGetLpDetail({ lpId: Number(lpId) });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { mutate: updateLpMutate } = useUpdateLp(Number(lpId), {
    onSuccess: () => {
      alert("수정 완료!");
      navigate(`/lps/${lpId}`);
    },
  });

  useEffect(() => {
    if (lp) {
      setTitle(lp.data.title);
      setContent(lp.data.content);
      setThumbnail(lp.data.thumbnail);
      setTags(lp.data.tags.map((tag) => tag.name));
    }
  }, [lp]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title || !content) return alert("빈 칸이 있어요!");
    updateLpMutate({
      title,
      content,
      thumbnail,
      tags,
      published: true,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">LP 수정하기</h1>

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-3 rounded h-40 resize-none"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="썸네일 URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      {/* 태그 입력 폼 */}
      <div className="mb-4">
        <label className="block font-medium mb-1">태그</label>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 border p-2 rounded"
            placeholder="태그 입력 후 엔터 또는 추가 버튼"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-3 py-2 bg-gray-200 rounded"
          >
            추가
          </button>
        </div>

        {/* 현재 태그 목록 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        수정 완료
      </button>
    </div>
  );
};

export default LpEditPage;
