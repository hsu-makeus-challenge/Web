import { useEffect, useState } from "react";
import ItemMovies from "./item-movies";
import { Movie } from "../../types/movie";
import { useGet } from "../../hooks/useGet";
import Spinner from "../spinner/spinner";
import Error from "../error/error";
import Pagination from "../pagination/pagination";

interface ListProps {
  url: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

const ListMovies = ({ url }: ListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const finalUrl = url.includes("?")
    ? `${url}&page=${currentPage}`
    : `${url}?page=${currentPage}`;

  const { data, loading, error } = useGet<MovieResponse>(finalUrl);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => setShowSpinner(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      {data?.total_pages && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.total_pages}
          onPageChange={setCurrentPage}
        />
      )}

      <div className="flex-1 flex justify-center items-center">
        {loading || showSpinner ? (
          <Spinner />
        ) : (
          <div className="w-[90%] mx-auto grid grid-cols-6 gap-[1vw] m-[2vw]">
            {data?.results?.map((movie) => (
              <ItemMovies key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListMovies;
