import { JSX } from "react";

const HomePage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="pt-20 px-6">
        <section className="text-center max-w-3xl mx-auto mt-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">영화 정보 제공 사이트 🎬</h1>
          <p className="text-lg text-gray-600">
            인기 영화부터 개봉 예정작까지, 다양한 영화를 확인해보세요!
            <br />
            상단 탭에서 카테고리를 선택해 탐색할 수 있습니다.
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
