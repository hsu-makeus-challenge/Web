// pages/MoviePage.tsx
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import NotFoundPage from "./NotFoundPage";
import { useState, useCallback, useMemo } from "react";
import useFetchMovies from "../hooks/useFecthMovies";
import SearchForm from "../components/searchForm";
import { useDispatch } from "react-redux";
import { openModal } from "../modal/modalslice";
import MovieModal from "../modal/MovieModal";
 
export default function MoviePage(): JSX.Element {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();
  const { movies, isPending, isError } = useFetchMovies(category, page);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("ko-KR");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;
  const TMDB_API_URL = "https://api.themoviedb.org/3/search/movie";

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;
    setSearchLoading(true);
    setSearchError("");
    try {
      const res = await fetch(
        `${TMDB_API_URL}?query=${encodeURIComponent(query)}&language=${language}&include_adult=${includeAdult}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
            accept: "application/json",
          },
        }
      );
      const data = await res.json();
      const results = data.results || [];
      setSearchResults(results);
    } catch (err) {
      setSearchError("검색 중 오류가 발생했습니다.");
    } finally {
      setSearchLoading(false);
    }
  };

  // ✅ 검색 결과 클릭 시 모달 오픈 함수 (useCallback으로 메모이제이션)
  const handleCardClick = useCallback(
    async (movie: any) => {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=ko-KR&append_to_response=credits`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        }
      );
      const detail = await res.json();
      dispatch(openModal(detail));
    },
    [dispatch]
  );

  // ✅ 검색된 영화 리스트는 useMemo로 캐싱
  const renderedSearchResults = useMemo(() => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
      {searchResults.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => handleCardClick(movie)}
        />
      ))}
    </div>
  ), [searchResults, handleCardClick]);

  if (!category || isError) return <NotFoundPage />;

  return (
    <>
      <SearchForm
        query={query}
        setQuery={setQuery}
        language={language}
        setLanguage={setLanguage}
        includeAdult={includeAdult}
        setIncludeAdult={setIncludeAdult}
        onSubmit={handleSearch}
      />

      <h1 className="text-2xl font-bold text-center mb-6">
        📜 {category.replace("_", " ")} 📜
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded bg-green-500 text-white hover:bg-purple-600 disabled:bg-gray-300"
        >
          {"<"}
        </button>
        <span className="text-lg font-bold">{page} 페이지</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-2 py-1 rounded bg-yellow-400 text-white hover:bg-green-500"
        >
          {">"}
        </button>
      </div>

      {query ? (
        searchLoading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : searchError ? (
          <div className="text-center text-red-500 py-4">{searchError}</div>
        ) : searchResults.length > 0 ? (
          renderedSearchResults // ✅ useMemo로 캐싱된 영화 카드 리스트
        ) : (
          <div className="text-center text-gray-400 py-8">검색 결과가 없습니다.</div>
        )
      ) : (
        <div>
          {isPending && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <LoadingSpinner />
            </div>
          )}
          {movies && movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => navigate(`/movies/now_playing/${movie.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center mt-10">영화 목록이 없습니다.</div>
          )}
        </div>
      )}

      <MovieModal />
    </>
  );
}
