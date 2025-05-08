import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="flex h-dvh flex-col">
      <nav>it is nav bar</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>it is footer</footer>
    </div>
  );
};
export default HomeLayout;
