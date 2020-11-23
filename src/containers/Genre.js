import { useEffect, useReducer } from "react";
import Loader from "../components/Loader";
import NotFound from "../containers/NotFound";
import { getGenreMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import { INITIAL_MOVIES_STATE } from "../constants/state";
import MovieList from "../components/MovieList";
import queryString from "query-string";

function Genre({ location, match, genres, baseURL, setSelected }) {
  const genreName = match.params.name;
  const params = queryString.parse(location.search);
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);
  console.log("genre");
  useEffect(() => {
    setSelected(genreName);
    getGenreMovies(dispatch, genres, genreName, params.page, "popularity.desc");
  }, [genres, params.page, genreName, setSelected]);

  const { movies, loadingMovies, errors } = state;

  if (loadingMovies) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (errors.length !== 0) {
    return (
      <div className="h-screen mt-auto max-w-2xl mx-auto flex justify-center items-center">
        <NotFound title="Oops!" subtitle="Something went wrong..." />
      </div>
    );
  }

  return (
    <div className="pt-24 text-gray-600 min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{genreName}</h1>
      <p className="text-sm uppercase font-bold ml-4">movies</p>
      <MovieList movies={movies} baseURL={baseURL} />
    </div>
  );
}

export default Genre;
