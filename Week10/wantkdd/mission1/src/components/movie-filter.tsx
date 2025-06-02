import React, { memo, useState } from 'react';
import { MovieFilters, MovieLanguage } from '../types/movie';
import LanguageSelector from './language-selector';
import { Input } from './input';
import { SelectBox } from './select-box';
import { LANGUAGE_OPTIONS } from '../constants/movie';

interface MovieFilterProps {
  onChange: (filters: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  // console.log('리렌더링');
  const [query, setQuery] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<MovieLanguage>('ko-KR');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      const filters: MovieFilters = {
        query: query,
        include_adult: includeAdult,
        language,
      };
      onChange(filters);
    }
  };

  return (
    <div className="bg-gray-500 p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-md font-bold text-white mb-2">
            영화 제목
          </label>
          <Input
            value={query}
            onChange={setQuery}
            placeholder="영화 제목을 입력하세요"
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="adult-content"
          />

          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
          />
        </div>

        <button
          type="submit"
          disabled={!query}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            query
              ? 'bg-green-300 hover:bg-green-400 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🎬 영화 검색
        </button>
      </form>
    </div>
  );
};

export default memo(MovieFilter);
