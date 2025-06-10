import { JSX } from "react";

const MovieDetailOverview = ({ overview }: { overview: string }): JSX.Element => (
  <div className="mb-4">
    <h2 className="text-lg font-bold mb-1">줄거리</h2>
    <p className="text-gray-800 text-sm">{overview}</p>
  </div>
);

export default MovieDetailOverview;