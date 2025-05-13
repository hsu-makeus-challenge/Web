import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';
import { useProfileMutation } from '../hooks/useProfileMutation';
import { useProfileEdit } from '../hooks/useProfileEdit';
import { useLpSort } from '../hooks/useLpSort';

const MyPage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const {
    isEditing,
    setIsEditing,
    editedName,
    setEditedName,
    editedBio,
    setEditedBio,
    previewUrl,
    setPreviewUrl,
    handleImageChange,
    resetEditForm
  } = useProfileEdit(user);

  const {
    order,
    setOrder,
    data,
    isLoading,
    isError,
    error
  } = useLpSort();

  const updateProfileMutation = useProfileMutation(user, updateUser);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = () => {
    if (!editedName.trim()) {
      alert('닉네임은 필수입니다.');
      return;
    }

    const data: { name: string; bio?: string | null; avatar?: string } = {
      name: editedName,
      bio: editedBio.trim() || null,
    };

    if (previewUrl) {
      data.avatar = previewUrl;
    }

    updateProfileMutation.mutate(data);
    setIsEditing(false);
    setPreviewUrl(null);
  };

  if (!user) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  const lps = data?.data.data ?? [];

  const handleLpClick = (lpId: number) => {
    navigate(`/lp/${lpId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-200">마이페이지</h1>
      <div className="bg-gray-900 shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative">
          <img 
            src={previewUrl || user.avatar || '/images/user.png'} 
            alt="프로필" 
            className={`w-20 h-20 rounded-full object-cover bg-white ${isEditing ? 'cursor-pointer' : ''}`}
            onClick={() => isEditing && document.getElementById('avatarInput')?.click()}
          />
          {isEditing && (
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          )}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="닉네임"
              />
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="자기소개"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  저장
                </button>
                <button
                  onClick={resetEditForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xl font-bold text-gray-200">{user.name}</p>
              {user.bio && <p className="text-gray-300 mt-1">{user.bio}</p>}
              <p className="text-gray-400">{user.email}</p>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <MdSettings size={24} />
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            로그아웃
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${order === 'asc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setOrder('asc')}
        >
          오래된순
        </button>
        <button
          className={`px-4 py-2 rounded ${order === 'desc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setOrder('desc')}
        >
          최신순
        </button>
      </div>
      {isLoading && <div>로딩 중...</div>}
      {isError && <div>에러 발생: {error instanceof Error ? error.message : '에러'} </div>}
      <div className="grid grid-cols-5 gap-4">
        {lps.length === 0 && <div>LP가 없습니다.</div>}
        {lps.map(lp => (
          <div
            key={lp.id}
            onClick={() => handleLpClick(lp.id)}
            className="relative cursor-pointer bg-[#232b3b] rounded shadow flex flex-col items-center overflow-hidden transition-transform duration-200 hover:scale-105 group"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full aspect-square object-cover"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            {/* 하단 정보 영역 */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div>
                <div className="text-white text-base font-bold mb-1">{lp.title}</div>
                <div className="text-gray-200 text-xs">{new Date(lp.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-1 text-white text-sm mb-1">
                <span>♥</span>
                <span>{lp.likes?.length ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage; 