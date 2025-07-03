interface InputProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export const Input = ({
    value,
    onChange,
    placeholder = "검색어를 입력하세요",
    className,
}: InputProps) => {
    return (
        <input
            className={`w-full rounded-md border border-gray-500 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    )
}
