import { useEffect, useReducer } from "react";
import Loader from "../components/Loader";
import { getGenreMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import { INITIAL_MOVIES_STATE } from "../constants/state";
import MovieList from "../components/MovieList";

function Genre({ match, genres, baseURL, setSelected }) {
  const genreName = match.params.name;
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);
  console.log("genre");
  useEffect(() => {
    setSelected(genreName);
    getGenreMovies(dispatch, genres, genreName, 1, "popularity.desc");
  }, [genres, genreName, setSelected]);

  const { movies, loadingMovies } = state;

  return (
    <div className="pt-24">
      <h1 className="font-bold text-4xl">{genreName}</h1>
      {loadingMovies ? (
        <div className="w-full">
          <Loader />
        </div>
      ) : (
        <MovieList movies={movies} baseURL={baseURL} />
      )}
    </div>
  );
}

export default Genre;
