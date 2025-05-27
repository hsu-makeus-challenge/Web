import { useState } from "react";
import EyeToggleIcon from "../EyeToggleIcon.tsx";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const PasswordInput = ({ value, onChange, onBlur, error, touched }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <input
          name="password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`border p-[10px] focus:border-[#807bff] rounded-sm text-white bg-[#2C2C2E] w-full
            ${touched && error ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"
        >
          <EyeToggleIcon visible={showPassword} />
        </button>
      </div>
      <div className="w-full h-5 mt-1.5 mb-1.5">
        {touched && error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </>
  );
};

export default PasswordInput;
