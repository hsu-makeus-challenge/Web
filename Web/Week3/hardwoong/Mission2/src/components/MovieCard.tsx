import { Movie } from '../types/movie';

const MovieCard = ({ movie }: { movie: Movie }) => {
  // TMDB API에서 제공받은 URL을 가공
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    // 카드 전체에 대한 스타일링
    // relative: 자식 요소의 위치를 해당 요소 기준으로 설정
    // group: 자식 요소에 대한 hover 효과를 부모 요소에 적용
    // cursor-pointer: 마우스 커서를 손가락 모양으로 변경
    // overflow-hidden: 자식 요소의 넘치는 부분을 숨김
    // rounded-lg: 요소의 모서리를 둥글게 만듦
    // shadow-lg: 그림자 효과를 추가
    <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg mx-4">
      {/* 영화 포스터에 대한 스타일링 */}
      {/* w-full: 요소의 너비를 100%로 설정 */}
      {/* h-auto: 요소의 높이를 자동으로 설정 */}
      <img src={posterUrl} alt={movie.original_title} className="w-full h-auto" />
      {/* Hover 시 보이는 스타일링 */}
      {/* group-hover:opacity-100: group 클래스에 hover 시 투명도를 100으로 설정 */}
      {/* inset-0: 요소를 부모 요소의 네 모서리에 배치 */}
      {/* backdrop-blur-sm: 배경을 흐리게 만듦 */}
      {/* bg-white/30: 배경색을 흰색으로 설정하고 투명도를 30%로 설정 */}
      {/* bg-opacity-70: 배경색의 투명도를 70%로 설정 */}
      {/* opacity-0: 요소의 투명도를 0으로 설정 */}
      {/* transition-opacity: 투명도 변화에 대한 전환 효과 설정 */}
      <div className="
        group-hover:opacity-100 
        absolute 
        inset-0 
        backdrop-blur-sm 
        bg-white/30 
        opacity-0 
        transition-opacity 
        duration-400 
        flex 
        flex-col 
        justify-center 
        items-center 
        text-white 
        p-2 
        text-center
      ">
        {/* 영화 제목 출력 */}
        {/* text-lg: 텍스트 크기를 크게 설정 */}
        <h2 className="text-lg font-bold mb-2">{movie.original_title}</h2>
        {/* 영화 줄거리 출력 */}
        {/* text-sm: 텍스트 크기를 작게 설정 */}
        <p className="text-sm">{movie.overview.slice(0, 100)}...</p>
      </div>
    </div>
  );
};

export default MovieCard;