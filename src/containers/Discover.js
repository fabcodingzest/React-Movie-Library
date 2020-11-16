import { useEffect } from "react";
import { getDiscoverMovies } from "../helpers/MovieHelpers";

function Discover({ dispatch, movieState, match, baseURL }) {
  const category = match.params.name.toLowerCase().replace(/\s/, "_");

  useEffect(() => {
    getDiscoverMovies(dispatch, category, 1);
  }, [dispatch, category]);
  const { movies, loadingMovies } = movieState;
  return (
    <div className="text-gray-700 mt-8">
      <p className="font-semibold">Discover</p>
      <ul className="flex flex-wrap">
        {!loadingMovies &&
          movies.results.map((movie) => (
            <li key={movie.id} className="flex w-64">
              <img
                className="m-4"
                src={`${baseURL}w780${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Discover;
