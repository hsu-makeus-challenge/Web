import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyInfo, updateProfile } from '../api/auth';
import { useMutation } from '@tanstack/react-query';

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<any>(null); // 실제 타입으로 교체하기기
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
        setName(response?.data?.name || '');
        setBio(response?.data?.bio || '');
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: async () => {
      alert('프로필이 수정되었습니다!');
      setEditMode(false);
      setIsLoading(true);
      const response = await getMyInfo();
      setData(response);
      setIsLoading(false);
    }
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (avatar) formData.append('avatar', avatar);
    mutation.mutate(formData);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center gap-4 bg-black p-8 rounded-xl">
        <div className="relative">
          <img
            src={avatar ? URL.createObjectURL(avatar) : data?.data?.avatar || 'https://via.placeholder.com/120'}
            alt="프로필"
            className="w-32 h-32 rounded-full object-cover bg-gray-700"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              className="absolute left-0 top-0 w-32 h-32 opacity-0 cursor-pointer"
              onChange={e => setAvatar(e.target.files?.[0] || null)}
              title="프로필 사진 변경"
            />
          )}
        </div>
        {editMode ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <input
              className="bg-black border border-white rounded-lg px-4 py-2 text-white text-xl font-bold"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="이름"
              required
            />
            <input
              className="bg-black border border-white rounded-lg px-4 py-2 text-white"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="한 줄 소개"
            />
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg px-4 py-2 font-bold hover:bg-green-600 transition"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? '저장 중...' : '저장'}
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-white mt-2"
              onClick={() => setEditMode(false)}
            >
              취소
            </button>
          </form>
        ) : (
          <>
            <div className="border border-white rounded-lg px-4 py-2 text-xl font-bold flex items-center gap-2 min-w-[320px]">
              {data?.data?.name}
            </div>
            <div className="border border-white rounded-lg px-4 py-2 min-w-[320px]">
              {data?.data?.bio || '한 줄 소개 없음'}
            </div>
            <div className="text-gray-300 mt-2">{data?.data?.email}</div>
            <button
              className="mt-4 bg-gray-700 text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-600 transition"
              onClick={() => setEditMode(true)}
            >
              설정
            </button>
            <button
              className="mt-2 bg-red-500 text-white rounded-lg px-4 py-2 font-bold hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;