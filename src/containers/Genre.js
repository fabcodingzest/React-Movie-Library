import { useEffect, useReducer } from "react";
import { getGenreMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import {INITIAL_MOVIES_STATE} from "../constants/state";

function Genre({ match, genres, baseURL }) {
  const genreName = match.params.name;
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);
  console.log("genre");
  useEffect(() => {
    getGenreMovies(dispatch, genres, genreName, 1, "popularity.desc");
  }, [ genres, genreName]);

  const { movies, loadingMovies } = state;

  return (
    <div className="text-gray-700">
      <h1 className="font-bold text-4xl">{genreName}</h1>
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

export default Genre;
