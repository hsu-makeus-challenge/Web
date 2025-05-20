import { useState } from "react";

export type NewLpForm = {
  name: string;
  content: string;
  tags: string[];
};
interface LpCreateModalProps {
  onClose: () => void;
  onSubmit: (lp: NewLpForm) => void;
}

const LpCreatmodal = ({ onClose, onSubmit }: LpCreateModalProps) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = () => {
    onSubmit({ name, content, tags });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-[400px] relative">
        <button
          className="absolute top-2 right-3 text-white text-xl"
          onClick={onClose}
        >
          x
        </button>
        <div className="flex flex-col items-center">
          <img src="/lpImg.jpeg" alt="lp" className="w-24 h-24 mb-6 " />
          <input
            type="text"
            placeholder="Lp Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 w-full p-2 rounded bg-gray-700 text-white"
          ></input>
          <input
            type="text"
            placeholder="Lp content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2 w-full p-2 rounded bg-gray-700 text-white"
          ></input>
          <div className="flex justify-between gap-2 w-full">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="mb-2 w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Lp tag"
            ></input>
            <button
              onClick={handleAddTag}
              className="mb-2 px-4 py-2 rounded bg-gray-400 text-white hover:bg-pink-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-600 px-2 py-1 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mb-2 w-full p-2 rounded bg-gray-400 text-white hover:bg-pink-600"
          >
            Add Lp
          </button>
        </div>
      </div>
    </div>
  );
};
export default LpCreatmodal;
