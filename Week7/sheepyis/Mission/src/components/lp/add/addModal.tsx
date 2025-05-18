import { useRef, useState } from "react";
import Lp from "../../../assets/lp.png";
import ListTag from "./list-tag";
import { AuthAPI } from "../../../apis/authAxios";
import { useLpMutation } from "../../../hooks/lp/useLpMutation";

type AddModalProps = {
  onClose: () => void;
};

const AddModal = ({ onClose }: AddModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { mutate, isPending } = useLpMutation(onClose);

  const isFormValid =
    name.trim() !== "" &&
    content.trim() !== "" &&
    tags.length > 0 &&
    selectedFile !== null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await AuthAPI.post("/uploads", formData);

    return res.data.data.imageUrl;
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.error("이미지가 선택되지 않았습니다.");
      return;
    }

    try {
      const uploadedUrl = await uploadImage(selectedFile);

      mutate({
        title: name,
        content,
        thumbnail: uploadedUrl,
        tags,
      });
    } catch (err) {
      alert("이미지 업로드에 실패했습니다.");
      console.error("업로드 실패:", err);
    }
  };

  const handleAddTag = () => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex z-10 justify-center items-center left-0 md:left-[20vw] top-[3vw]">
      <div className="bg-gray-800 text-white w-[40%] p-[2vw] rounded-[1vw] relative flex flex-col items-center gap-[1vw]">
        <button
          onClick={onClose}
          className="w-full flex justify-end text-[1.5vw] font-bold cursor-pointer"
        >
          ✕
        </button>

        <div
          className="relative w-[15vw] h-[15vw] cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={Lp}
            className="w-full h-full object-cover rounded-[0.5vw]"
            alt="default"
          />
          {preview && (
            <img
              src={preview}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-[0.5vw]"
              alt="preview"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <input
          className="w-full h-[3vw] border-[0.1vw] rounded-[0.5vw] border-white text-[1vw] px-[1vw]"
          placeholder="LP Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full h-[3vw] border-[0.1vw] rounded-[0.5vw] border-white text-[1vw] px-[1vw]"
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 태그 입력 */}
        <div className="w-full flex items-center justify-between gap-[1vw]">
          <input
            className="w-full h-[3vw] border-[0.1vw] rounded-[0.5vw] border-white text-[1vw] px-[1vw]"
            placeholder="LP Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTag();
            }}
          />
          <button
            className="bg-gray-500 px-[1vw] py-[0.5vw] text-[1vw] rounded-[0.5vw]"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>

        <ListTag tags={tags} onRemove={handleRemoveTag} />

        <button
          disabled={!isFormValid || isPending}
          onClick={handleSubmit}
          className={`w-full h-[3vw] text-[1vw] rounded-[0.5vw] mt-[1vw] transition ${
            isFormValid
              ? "bg-pink-500 hover:bg-pink-600 cursor-pointer"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {isPending ? "LP 생성 중.." : "Add LP"}
        </button>
      </div>
    </div>
  );
};

export default AddModal;
