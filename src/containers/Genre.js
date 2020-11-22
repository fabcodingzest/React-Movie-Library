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
    <div className="pt-24 text-gray-600 min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{genreName}</h1>
      <p className="text-sm uppercase font-bold ml-4">movies</p>
      {loadingMovies ? (
          <Loader />
      ) : (
        <MovieList movies={movies} baseURL={baseURL} />
      )}
    </div>
  );
}

export default Genre;
