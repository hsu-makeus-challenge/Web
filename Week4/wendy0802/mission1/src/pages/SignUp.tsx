import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import  Navbar  from '../components/Navbar';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 단계 구분
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (step === 1) {
      if (!validateEmail(email)) {
        setEmailError('올바른 이메일 형식을 입력해 주세요!');
        return;
      } else {
        setEmailError('');
        setStep(2);
      }
    } else if (step === 2) {
      let valid = true;
  
      if (password.length < 8) {
        setPasswordError('비밀번호는 8자 이상이어야 합니다!');
        valid = false;
      } else {
        setPasswordError('');
      }
  
      if (password !== confirmPassword) {
        setConfirmPasswordError('비밀번호가 일치하지 않습니다!');
        valid = false;
      } else {
        setConfirmPasswordError('');
      }
  
      if (!valid) return;
  
      // 회원가입 최종 처리 로직 실행
      console.log('회원가입 성공');
    }
  };
  
  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
          {/* 뒤로가기 & 타이틀 */}
          <div className="w-full max-w-sm mb-6 flex items-center justify-center relative">
              <button
                  onClick={() => navigate(-1)}
                  className="absolute left-0 text-xl font-bold text-blue-500"
              >
                  {'<'}
              </button>
              <h1 className="text-2xl font-semibold mb-4 text-gray-500">회원가입</h1>
          </div>

          {/* 폼 */}
          <form onSubmit={handleNext} className="w-full max-w-sm space-y-4">
              {/* STEP 1: 이메일 입력 */}
              {step === 1 && (
                  <>
                      <button className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 bg-white text-gray-400">
                          <img src="./google.png" alt="google" className="w-5 h-5" />
                          <span>구글 로그인</span>
                      </button>

                      <div className="flex items-center justify-between text-gray-400">
                          <hr className="w-1/3" />
                          <span>OR</span>
                          <hr className="w-1/3" />
                      </div>

                      <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="이메일을 입력해주세요!"
                          className={`w-full px-4 py-2 border rounded bg-white text-black ${emailError ? 'border-red-500' : 'border-gray-300'}`} />
                      {emailError && (
                          <p className="text-red-500 text-sm ml-1">{emailError}</p>
                      )}

                      <button
                          type="submit"
                          className="w-full bg-blue-500 text-white py-2 rounded hover:opacity-80 transition"
                      >
                          다음
                      </button>
                  </>
              )}

              {/* STEP 2: 비밀번호 입력 */}
              {step === 2 && (
                  <>
                      {/* 이메일 표시 */}
                      <div className="w-full flex items-center justify-center gap-2 text-gray-700">
                          <span className="text-sm ">✉️</span>
                          <span className="text-sm text-gray-500">{email}</span>
                      </div>

                      {/* 비밀번호 입력 */}
                      <div className="relative">
                          <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="비밀번호를 입력해 주세요!"
                              className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 pr-10 focus:outline-none focus:border-blue-400" />
                          <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          >
                              <img
                                  src={showPassword ? "/eye_1.png" : "/eye_2.png"}
                                  alt="비밀번호 보기 전환"
                                  className="w-5 h-5" />
                          </button>
                      </div>

                      {/* 비밀번호 확인 입력 */}
                      <div className="relative">
                          <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="비밀번호를 다시 한 번 입력해 주세요!"
                              className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 pr-10 focus:outline-none focus:border-blue-400" />
                          <button
                              type="button"
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          >
                              <img
                                  src={showConfirmPassword ? "/eye_1.png" : "/eye_2.png"}
                                  alt="비밀번호 보기 전환"
                                  className="w-5 h-5" />
                          </button>
                      </div>

                      {passwordError && (
                          <p className="text-red-500 text-sm ml-1 mt-1">{passwordError}</p>
                      )}

                      {/* 다음 버튼 */}
                      <button
                          type="submit"
                          className="w-full bg-blue-500 text-white py-2 rounded hover:opacity-80 transition"
                      >
                          다음
                      </button>
                  </>
              )}

          </form>
      </div></>
  );
};

export default SignUp;

 {/*비밀번호*/}
            {/* <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요!"
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-black"
            /> */}
            {/*비밀번호 확인*/}
            {/* <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-black"
            /> */}
