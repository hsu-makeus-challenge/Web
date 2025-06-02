import { MovieLanguage } from '../types/movie';

interface LanguageOption {
  value: string;
  label: string;
}
interface LanguageSelectorProps {
  value: MovieLanguage;
  onChange: (value: MovieLanguage) => void;
  options: LanguageOption[];
  className?: string;
}

const LanguageSelector = ({
  value,
  onChange,
  options,
  className = '',
}: LanguageSelectorProps) => {
  return (
    <div>
      <label
        htmlFor="language"
        className="block text-sm font-medium text-white mb-1"
      >
        언어 선택
      </label>
      <select
        id="language"
        value={value}
        onChange={(e) => onChange(e.target.value as MovieLanguage)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
