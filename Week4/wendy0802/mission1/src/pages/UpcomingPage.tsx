import { Navigate } from "react-router-dom";

const TopRatedPage = (): JSX.Element => {
  return <Navigate to="/movies/top-rated" />;
};

export default TopRatedPage;
