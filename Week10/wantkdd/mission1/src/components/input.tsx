interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder = '검색어를 입력하세요.',
  className,
}: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-md border border-white px-3 py-2 shadow-sm focus:border-green-300 focus:ring-green-300 focus:outline-none ${className}`}
    />
  );
};
