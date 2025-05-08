import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-200">마이페이지</h1>
      <div className="bg-gray-900 shadow-md rounded-lg p-6 mb-6">
        <p className="mb-2 text-gray-200"><span className="font-semibold">이메일:</span> {user.email}</p>
        <p className="mb-4 text-gray-200"><span className="font-semibold">닉네임:</span> {user.name}</p>
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage; 