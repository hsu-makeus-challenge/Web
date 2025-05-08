import { useNavigate } from 'react-router-dom';

const Error = ({ message = '알 수 없는 오류가 발생했어요!' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-6xl">⚠️</div>
      <h1 className="text-2xl font-bold mt-4">앗! 문제가 발생했어요!</h1>
      <p className="text-md text-gray-600 mt-2">{message}</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-lime-500 text-white rounded-lg shadow-md hover:bg-lime-600 transition cursor-pointer"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default Error;
