import React from "react";
 
interface SearchFormProps {
  query: string;
  setQuery: (v: string) => void;
  language: string;
  setLanguage: (v: string) => void;
  includeAdult: boolean;
  setIncludeAdult: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm = ({
  query,
  setQuery,
  language,
  setLanguage,
  includeAdult,
  setIncludeAdult,
  onSubmit,
}: SearchFormProps) => (
  <form
    onSubmit={onSubmit}
    className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col gap-6 max-w-3xl mx-auto mt-12"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="font-bold mb-1 flex items-center gap-1">
          <span role="img" aria-label="movie">🎬</span> 영화 제목
        </label>
        <input
          type="text"
          placeholder="영화 제목을 입력하세요"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border rounded px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-bold mb-1 flex items-center gap-1">
          <span role="img" aria-label="option">⚙️</span> 옵션
        </label>
        <div className="flex items-center h-full">
          <input
            id="includeAdult"
            type="checkbox"
            checked={includeAdult}
            onChange={e => setIncludeAdult(e.target.checked)}
            className="w-4 h-4 mr-2"
          />
          <label htmlFor="includeAdult" className="text-sm font-medium">성인 콘텐츠 표시</label>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      <label className="font-bold mb-1 flex items-center gap-1">
        <span role="img" aria-label="language">🌐</span> 언어
      </label>
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="ko-KR">한국어</option>
        <option value="en-US">영어</option>
        <option value="ja-JP">일본어</option>
      </select>
    </div>
    <button
      type="submit"
      className="bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 flex items-center gap-2 justify-center w-full"
    >
      <span role="img" aria-label="search">🔍</span> 검색하기
    </button>
  </form>
);

export default SearchForm;