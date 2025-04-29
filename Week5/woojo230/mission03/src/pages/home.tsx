import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <>
      <div>홈입니다</div>
      <Outlet />
    </>
  );
}

export default Home;
