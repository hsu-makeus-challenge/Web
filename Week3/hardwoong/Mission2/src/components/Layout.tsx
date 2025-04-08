import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    {/* min-h-screen: 최소 높이를 브라우저 화면 전체 높이(100vh)로 설정 */}
    {/* bg-gray-100: 배경을 아주 연한 회색으로 설정 */}
      <Navbar />
        <main className="pt-4"> {/* Navbar를 fix하여서 배경색 통일감을 위해 pt 부여 */}
          <Outlet /> {/* 현재 라우트에 해당하는 컴포넌트가 여기에 렌더됨 */}
        </main>
    </div>
  );
};

export default Layout;