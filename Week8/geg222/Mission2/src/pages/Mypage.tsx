import { useEffect, useState, useRef } from "react";
import { getMyInfo, patchUser } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserData {
  name: string;
  avatar: string | null;
  email: string;
  bio?: string | null;
}

const Mypage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const [data, setData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response.data);
      setName(response.data.name);
      setBio(response.data.bio || "");
      setAvatar(response.data.avatar || "");
    };

    getData();
  }, []);

  const { mutate } = useMutation({
    mutationFn: patchUser,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["user"] });

      const previousUser = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          name: newData.name,
          bio: newData.bio,
          avatar: newData.avatar,
        },
      }));

      setData((prev) => (prev ? { ...prev, ...newData } : null));
      setIsEditing(false);

      return { previousUser };
    },
    onError: (err, newData, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user"], context.previousUser);
        setData(context.previousUser.data);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("이름은 필수입니다.");
      return;
    }
    mutate({ name, bio, avatar, file });
  };

  if (!data) return LoadingSpinner();

  return (
    <div className="flex flex-col items-center p-6 text-white">
      <div className="flex flex-col items-center w-full max-w-3xl">
        <div className="flex items-center gap-8 w-full">
          <div className="relative">
            <img
              src={avatar || "https://via.placeholder.com/150"}
              alt="avatar"
              className="w-36 h-36 rounded-full object-cover cursor-pointer"
              onClick={() => isEditing && fileInputRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                  setAvatar(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black border border-white text-white p-2 rounded w-full max-w-xs"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-[#1DB954] text-white px-4 py-2 rounded hover:bg-[#1ed760] transition"
                  >
                    완료
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{data.name}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-white text-xl"
                  >
                    ⚙️
                  </button>
                </>
              )}
            </div>
            {isEditing ? (
              <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-black border border-white text-white p-2 rounded w-full max-w-xs"
              />
            ) : (
              data.bio && <p className="text-sm text-gray-400">{data.bio}</p>
            )}
            <p className="text-sm text-gray-500">{data.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
