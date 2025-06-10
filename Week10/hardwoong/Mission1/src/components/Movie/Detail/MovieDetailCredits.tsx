import { JSX } from "react";

const MovieDetailCredits = ({
  crew,
  cast,
}: {
  crew: { id: number; name: string }[];
  cast: { id: number; name: string; character?: string }[];
}): JSX.Element => (
  <div className="mb-2">
    <h2 className="text-lg font-bold mb-1">감독/출연</h2>
    <div className="flex flex-wrap gap-3">
      {crew.map((person) => (
        <div key={person.id} className="text-xs text-gray-700 font-bold">
          🎬 {person.name} (감독)
        </div>
      ))}
      {cast.map((person) => (
        <div key={person.id} className="text-xs text-gray-600">
          {person.name} {person.character && `- ${person.character}`}
        </div>
      ))}
    </div>
  </div>
);

export default MovieDetailCredits;