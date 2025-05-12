import { useState, useRef, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import LP from "../../assets/lp.png";
import { useAuthUpdateMutation } from "../../hooks/\bauth/useAuthUpdateMutation";
import { AuthAPI } from "../../apis/authAxios";

type ProfileProps = {
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
};

const Profile = ({ email, name, bio = "", avatar }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newBio, setNewBio] = useState(bio || "");
  const [preview, setPreview] = useState<string>(avatar || LP);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useAuthUpdateMutation();

  useEffect(() => {
    setPreview(avatar || LP);
  }, [avatar]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!newName.trim()) {
      alert("닉네임은 비워둘 수 없습니다.");
      return;
    }

    let uploadedUrl = avatar;

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await AuthAPI.post("/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        uploadedUrl = res.data.data.imageUrl;
      } catch (err) {
        console.error("이미지 업로드 실패:", err);
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    mutate(
      {
        name: newName,
        bio: newBio,
        avatar: uploadedUrl,
      },
      {
        onSuccess: () => {
          alert("프로필 수정 완료!");
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col mt-[1vw] w-full items-center">
      <div className="border-white border-[0.1vw] w-[80%] h-[15vw] rounded-[1vw] flex justify-center items-center gap-[1vw]">
        <div
          className="w-[10vw] h-[10vw] cursor-pointer"
          onClick={() => isEditing && fileInputRef.current?.click()}
        >
          <img
            src={preview}
            className="w-full h-full object-cover border-[0.1vw] border-white rounded-full"
            alt="profile"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex flex-col gap-[0.5vw]">
          {isEditing ? (
            <>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-black border border-white rounded px-[1vw] py-[0.5vw] text-white text-[1vw]"
              />
              <input
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="한 줄 소개 (선택)"
                className="bg-black border border-white rounded px-[1vw] py-[0.5vw] text-white text-[1vw]"
              />
            </>
          ) : (
            <>
              <p className="text-white text-[1.2vw]">{name}</p>
              <p className="text-white text-[1.2vw]">{bio}</p>
              <p className="text-white text-[1.2vw]">{email}</p>
            </>
          )}
        </div>
      </div>

      <div className="w-[80%] flex justify-end mt-[1vw]">
        {isEditing ? (
          <button onClick={handleSubmit} className="text-white hover:text-green-400">
            <FiCheck size={16} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-[1vw] py-[0.5vw] rounded text-[1vw] border-[0.1vw] border-white text-white hover:bg-white hover:text-black"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
