import { useEffect, useReducer } from "react";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import { getDiscoverMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import { INITIAL_MOVIES_STATE } from "../constants/state";

function Discover({ match, baseURL, setSelected }) {
  const category = match.params.name;
  console.log("discover");
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);

  useEffect(() => {
    setSelected(category);
    getDiscoverMovies(dispatch, category.toLowerCase().replace(/\s/, "_"), 1);
  }, [dispatch, category, setSelected]);

  const { movies, loadingMovies } = state;
  return (
    <div className="w-full min-h-screen pt-24">
      {loadingMovies ? (
        <Loader />
      ) : (
        <div className="text-gray-700 mt-8">
          <h1 className="font-semibold text-4xl">{category}</h1>
          <MovieList movies={movies} baseURL={baseURL} />
        </div>
      )}
    </div>
  );
}

export default Discover;
