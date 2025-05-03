import { Outlet } from "react-router-dom";
// import  Navbar  from "../components/Navbar"

const HomePage = (): JSX.Element => {
  return <div>
    {/* <Navbar /> 제거 */}
    <Outlet /> 
  </div>;
};

export default HomePage;