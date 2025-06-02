import MovieList from '../components/movie/movieList';
import useSearchFetch from '../hooks/useSearchFetch';
import { useState, useCallback, useMemo } from 'react';

function Home() {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('한국어');
  const [showContent, setShowContent] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  const apiLanguage = useMemo(() => {
    return language === '한국어' ? 'ko-KR' : 'en-US';
  }, [language]);

  const { data, loading, error } = useSearchFetch({
    query: search || '코난',
    language: apiLanguage,
    isAdult: isAdult,
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    setShowContent(true);
  }, []);

  const movieContent = useMemo(() => {
    if (!showContent || loading || !data) return null;

    return (
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {data.map((movie) => (
          <MovieList key={movie.id} moviesData={data} isSearch={true} />
        ))}
      </div>
    );
  }, [showContent, loading, data]);

  const loadingComponent = useMemo(() => {
    return loading ? <div>로딩 중...</div> : null;
  }, [loading]);

  const errorComponent = useMemo(() => {
    return error ? <div>오류가 발생했습니다: {error}</div> : null;
  }, [error]);

  // console.log(isAdult);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="flex-1">
            <div className="relative">
              <div className="flex items-center border rounded-md">
                <span className="pl-3 pr-2">🎬</span>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="영화 제목을 입력하세요"
                  className="w-full p-2 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-52">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                🌐
              </span>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-2 pl-8 border rounded-md appearance-none"
              >
                <option value="한국어">한국어</option>
                <option value="English">English</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                ▼
              </span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            🔍 검색하기
          </button>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={isAdult}
              onChange={() => setIsAdult(!isAdult)}
              className="mr-2"
            />
            성인컨텐츠 표시
          </div>
        </div>
      </div>

      {movieContent}
      {loadingComponent}
      {errorComponent}
    </>
  );
}

export default Home;
