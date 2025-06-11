interface LanguageOption {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: LanguageOption[];
  className?: string;
}

const LanguageSelector = ({
  value,
  onChange,
  options,
  className = "",
}: LanguageSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-zinc-900 text-white border border-red-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
