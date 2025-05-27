import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMyInfo, patchUpdateProfile } from "../apis/auth";
import { ResponseMyInfoDto, RequestUpdateProfileDto } from "../types/auth";
import { QUERY_KEY } from "../constants/key";
import { queryClient } from "../App";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: userInfo } = useQuery<ResponseMyInfoDto>({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
  });

  const [form, setForm] = useState({ name: "", bio: "", avatar: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setForm({
        name: userInfo.data.name,
        bio: userInfo.data.bio ?? "",
        avatar: userInfo.data.avatar ?? "",
      });
    }
  }, [userInfo]);

  const updateProfileMutation = useMutation({
    mutationFn: patchUpdateProfile,
    onMutate: async (payload: RequestUpdateProfileDto) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });
      const previous = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      if (previous) {
        const optimistic = {
          ...previous,
          data: {
            ...previous.data,
            ...payload,
          },
        };
        queryClient.setQueryData([QUERY_KEY.myInfo], optimistic);
      }

      return { previous };
    },
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });

  const handleUpdate = () => {
    updateProfileMutation.mutate(form);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!userInfo) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      <div className="bg-white px-10 py-12 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold">
          {userInfo.data.name}님 환영합니다
        </h1>
        <img
          src={userInfo.data.avatar || "/default-avatar.png"}
          alt="프로필 사진"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-gray-700">{userInfo.data.email}</h2>
        {userInfo.data.bio && (
          <p className="text-sm text-gray-600 italic">"{userInfo.data.bio}"</p>
        )}

        {isEditing ? (
          <>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 w-full rounded"
              placeholder="이름"
            />
            <input
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="border p-2 w-full rounded"
              placeholder="소개글"
            />
            <input
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              className="border p-2 w-full rounded"
              placeholder="프로필 이미지 URL"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 mt-1"
            >
              취소
            </button>
          </>
        ) : (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setIsEditing(true)}
          >
            프로필 수정
          </button>
        )}

        <button
          className="w-48 bg-blue-600 text-white py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Mypage;
