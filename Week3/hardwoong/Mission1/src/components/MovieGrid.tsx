import MovieCard from './MovieCard';
import MovieType from '../types/MovieType'; 

const MovieGrid = ({ movies }: { movies: MovieType[] }) => {
  return (
    // 최소 2개의 열로 시작하는 grid
    // sm = 반응형 prefix, 화면이 640px 이상일 때 3개의 열로 변경
    // md = 반응형 prefix, 화면이 768px 이상일 때 4개의 열로 변경
    // lg = 반응형 prefix, 화면이 1024px 이상일 때 5개의 열로 변경
    // gap-6 = 열 간격을 6으로 설정
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;