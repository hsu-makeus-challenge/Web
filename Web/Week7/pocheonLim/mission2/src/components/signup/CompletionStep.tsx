import { useSignup } from '../../contexts/SignupContext';
import { useNavigate } from 'react-router-dom';

const CompletionStep = () => {
  const { email, nickname } = useSignup();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="material-icons text-4xl text-gray-400">person</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold">{nickname}님,</h2>
        <p className="text-gray-400">환영합니다!</p>
      </div>

      <div className="space-y-2 text-gray-400">
        <p>가입하신 이메일</p>
        <div className="flex items-center justify-center gap-2 text-white">
          <span className="material-icons">mail</span>
          <span>{email}</span>
        </div>
      </div>

      <button
        onClick={() => {
          navigate('/login');
        }}
        className="w-full py-3 bg-pink-500 hover:bg-pink-600 rounded-lg transition-colors"
      >
        시작하기
      </button>
    </div>
  );
};

export default CompletionStep;
