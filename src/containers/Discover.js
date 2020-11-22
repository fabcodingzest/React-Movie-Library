import { useEffect, useReducer } from "react";
import MovieList from "../components/MovieList";
import NotFound from "../containers/NotFound";
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

  const { movies, loadingMovies, errors } = state;

  if (errors.length !== 0) {
    return <NotFound />;
  }

  return (
    <div className="text-gray-600 pt-24 min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{category}</h1>
      <p className="text-sm uppercase font-bold ml-4">movies</p>
      {loadingMovies ? (
        <Loader />
      ) : (
        <div className="text-gray-700 my-8">
          <MovieList movies={movies} baseURL={baseURL} />
        </div>
      )}
    </div>
  );
}

export default Discover;
