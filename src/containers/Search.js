import { useReducer } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesReducer from "../reducers/MoviesReducer";
import { getSearchResults } from "../helpers/MoviesHelpers";
import Loader from "../components/Loader";
import MovieList from "../components/MovieList";

function Search({ match, baseURL }) {
  const query = match.params.query;

  const [state, dispatch] = useReducer(MoviesReducer, {
    loadingMovies: true,
    movies: {},
    errors: [],
  });

  useEffect(() => {
    getSearchResults(dispatch, query, 1);
  }, [query]);
  console.log("search");

  const { movies, loadingMovies } = state;
  return (
    <div className="pt-24">
      <h1>Search</h1>
      <ul className="flex flex-wrap">
        {loadingMovies ? (
          <Loader />
        ) : (
          <MovieList movies={movies} baseURL={baseURL} />
        )}
      </ul>
    </div>
  );
}

export default Search;
