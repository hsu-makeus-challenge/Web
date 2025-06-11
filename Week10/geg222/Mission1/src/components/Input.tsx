import { memo, JSX } from "react";

interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = memo(
  ({
    value = "",
    onChange,
    placeholder = "검색어를 입력하세요",
    className,
  }: InputProps): JSX.Element => {
    return (
      <input
        className={`w-full bg-zinc-900 text-white border border-red-600 p-2 rounded-md focus:ring-2 focus:ring-red-600 ${className ?? ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);
