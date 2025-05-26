import { useState } from "react";
import { createLp, uploadThumbnail } from "../apis/lp";
import ClickOutside from "./ClickOutside";
import useCreateLp from "../hooks/mutations/useCreateLp";

const LpModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [published, setPublished] = useState(true);
  const [soundcloud, setSoundcloud] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate: createLpMutate } = useCreateLp();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      try {
        const url = await uploadThumbnail(e.target.files[0]);
        setThumbnail(url);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    const newLp = {
      title,
      content,
      thumbnail,
      tags,
      published,
      soundcloud,
    };
    createLpMutate(newLp, {
      onSuccess: onClose,
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <ClickOutside onClickOutside={onClose}>
        <div className="bg-[#1e1e1e] p-6 rounded-md w-[400px] relative text-white">
          <button className="absolute top-2 right-3 text-xl" onClick={onClose}>×</button>
          <div className="flex justify-center mb-4">
            <label className="cursor-pointer">
              <img
                src={thumbnail || "/defaultLp.webp"}
                alt="thumbnail"
                className="w-28 h-28 object-cover rounded-full"
              />
              <input type="file" hidden onChange={handleFileChange} />
            </label>
          </div>
          <input
            className="w-full mb-2 px-2 py-1 rounded bg-gray-700"
            placeholder="LP Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full mb-2 px-2 py-1 rounded bg-gray-700"
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 px-2 py-1 rounded bg-gray-700"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button onClick={handleAddTag} className="px-3 bg-[#FF4E6B] rounded cursor-pointer hover:bg-[#FF0436] transition">Add</button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-[#FF4E6B] rounded text-sm">
                {tag}
                <button
                  type="button"
                  className="text-white hover:text-gray-300"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            className="w-full mb-2 px-2 py-1 rounded bg-gray-700"
            placeholder="SoundCloud"
            value={soundcloud}
            onChange={(e) => setSoundcloud(e.target.value)}
          />
          <button
            className="w-full mt-2 bg-[#FF4E6B] hover:bg-[#FF0436] py-2 rounded disabled:bg-gray-500"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "업로드 중..." : "Add LP"}
          </button>
        </div>
      </ClickOutside>
    </div>
  );
};

export default LpModal;
