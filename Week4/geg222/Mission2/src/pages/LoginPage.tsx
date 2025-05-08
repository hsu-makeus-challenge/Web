import React, { useState } from 'react'
import { UserSigninInformation, validateSignin } from '../utils/validate';
import useForm from '../hooks/useForm'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = () => {
        console.log(values);
    };

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) || Object.values(values).some((value) => value === "");

  return (
      <div className="flex items-start justify-center w-full h-full pt-30">
        <div className="bg-black bg-opacity-80 p-10 rounded-md shadow-md w-full max-w-md flex flex-col gap-4 text-white">
          <div className="relative flex items-center justify-center mb-4">
            <button
              className="absolute left-0 text-white text-2xl"
              onClick={() => navigate(-1)}
            >
              &lt;
            </button>
            <h2 className="text-3xl font-bold text-white text-center">로그인</h2>
          </div>
  
          <button className="w-full py-2 border border-white rounded text-white hover:bg-white hover:text-black transition duration-200 px-4 flex items-center justify-center gap-2">
            <img
              src="/src/images/google.png"
              alt="Google logo"
              className="w-5 h-5 justify-start"
            />
            <span className="font-medium">구글 로그인</span>
          </button>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="text-gray-400 text-sm">또는</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <input 
            {...getInputProps('email')}
            name='email'
            className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
              errors?.email && touched?.email ? 'border-red-50' : 'border-[#555]'
            }`}
            type="email"
            placeholder="이메일 주소 또는 휴대폰 번호"
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input 
            {...getInputProps('password')}
            name='password'
            className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
              errors?.password && touched?.password ? 'border-red-500' : 'border-[#555]'
            }`}
            type="password"
            placeholder="비밀번호"
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
              isDisabled ? 'bg-[#3e1313] text-white cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            로그인
          </button>
        </div>
      </div>
  );
}

export default LoginPage
