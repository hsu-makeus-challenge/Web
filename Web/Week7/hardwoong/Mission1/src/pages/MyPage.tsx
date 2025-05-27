import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import useUpdateUserInfo from "../hooks/mutations/useUpdateUserInfo";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { uploadThumbnail } from "../apis/lp";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();
  const { data, refetch } = useGetMyInfo(accessToken);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // for resetting input

  useEffect(() => {
    if (data) {
      setName(data.data?.name || "");
      setBio(data.data?.bio || "");
      setAvatar(data.data?.avatar || "");
    }
  }, [data]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await uploadThumbnail(e.target.files[0]);
      setAvatar(url);
    }
  };

  const { mutate: updateMutate } = useUpdateUserInfo();

  const handleSave = () => {
    if (!name.trim()) {
      alert("닉네임은 필수입니다.");
      return;
    }
    updateMutate(
      { name, bio, avatar },
      {
        onSuccess: () => {
          setEditing(false);
          refetch();
        },
      }
    );
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <label className="cursor-pointer relative group">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-white"
            src={avatar || '/default-avatar.png'}
            alt="프로필 이미지"
          />
          {editing && (
            <input
              type="file"
              key={fileInputKey}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => {
                handleAvatarUpload(e);
                setFileInputKey(Date.now()); 
              }}
            />
          )}
        </label>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{data?.data?.name}</h1>
          <p className="text-sm text-gray-400 mt-1">{data?.data?.bio}</p>
          <p className="text-xs text-gray-500 mt-1">{data?.data?.email}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          로그아웃
        </button>
        <Settings
          onClick={() => setEditing(!editing)}
          className="cursor-pointer hover:text-gray-400"
        />
      </div>

      {editing && (
        <div className="w-full max-w-md space-y-4">
          <input
            className="block w-full border border-gray-600 bg-[#1e1e1e] text-white p-2 rounded"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="block w-full border border-gray-600 bg-[#1e1e1e] text-white p-2 rounded"
            placeholder="한 줄 소개"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="w-full bg-[#FF4E6B] hover:bg-[#e0435e] text-white p-2 rounded"
          >
            저장
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPage;
