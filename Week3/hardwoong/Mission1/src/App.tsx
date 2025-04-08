import MoviePage from './pages/MoviePage';

function App() {
  return (
    // 최소 높이를 브라우저 뷰포트 높이(100vh)로 설정
    // min-h = 최소 높이(min-height)
    // screen = 브라우저 전체 높이 (100vh)
    // bg-gray-100 = 배경색을 연한 회색으로 설정
    <div className="min-h-screen bg-gray-100 pl-50 pr-50 pt-4 pb-4">
      <MoviePage />
    </div>
  );
}

export default App;