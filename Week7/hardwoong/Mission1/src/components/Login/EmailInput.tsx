interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const EmailInput = ({ value, onChange, onBlur, error, touched }: EmailInputProps) => {
  return (
    <div className="flex flex-col">
      <input
        name="email"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm text-white bg-[#2C2C2E]
          ${touched && error ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="email"
        placeholder="이메일"
      />
      <div className="w-full h-5 mt-1.5 mb-1.5">
        {touched && error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </div>
  );
};

export default EmailInput;