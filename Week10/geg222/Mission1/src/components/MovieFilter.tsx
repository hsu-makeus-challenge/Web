import { JSX, memo, useState, useCallback } from "react";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { MovieFilters } from "../types/movie";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import { Input } from "./Input";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const handleSubmit = (): void => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };
  return (
    <div className="w-full max-w-6xl mx-auto bg-[#141414] text-white rounded-lg p-8 shadow-md transition duration-300 hover:shadow-xl">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            영화 제목
          </label>
          <Input value={query} onChange={handleQueryChange} />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2
            shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="pt-2 w-full max-w-3xl">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#e50914] hover:bg-[#f40612] text-white py-3 px-6 rounded-md font-bold transition duration-200"
            >
              검색하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
