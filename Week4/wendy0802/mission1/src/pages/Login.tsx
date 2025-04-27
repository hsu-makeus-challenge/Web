import { useNavigate } from 'react-router-dom';
import  Navbar  from "../components/Navbar";
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해 주세요! 🥺');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다! 🥺');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    alert('성공!');
    // 로그인 성공 시 navigate('/home') 등 추가 가능
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm mb-6 flex items-center justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 text-xl font-bold text-blue-500"
          >
            {'<'}
          </button>
          <h1 className="text-xl font-semibold text-center w-full text-gray-500">로그인</h1>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 text-blue-500">
          <button className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 text-gray-500">
            <img
              src="./google.png"
              alt="google"
              className="w-5 h-5"
            />
            <span>구글 로그인</span>
          </button>

          <div className="flex items-center justify-between text-gray-500">
            <hr className="w-1/3" />
            <span>OR</span>
            <hr className="w-1/3" />
          </div>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요!"
            className={`w-full px-4 py-2 border rounded bg-white text-black ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-sm ml-1">{emailError}</p>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요!"
            className={`w-full px-4 py-2 border rounded bg-white text-black ${
              passwordError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm ml-1 mt-1">{passwordError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:opacity-80 transition"
          >
            로그인
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
