import { useReducer } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesReducer from "../reducers/MoviesReducer";
import { getSearchResults } from "../helpers/MoviesHelpers";

function Search({ match, baseURL }) {
  const query = match.params.query;

  const [state, dispatch] = useReducer(MoviesReducer, {
    movies: {},
    loadingMovies: true,
    errors: [],
  });

  useEffect(() => {
    getSearchResults(dispatch, query, 1);
  }, [query]);

  const { movies, loadingMovies } = state;
  return (
    <div>
      <h1>Search</h1>
      <ul className="flex flex-wrap">
        {!loadingMovies &&
          movies.results.map((movie) => (
            <Link
              key={movie.id}
              to={`${process.env.PUBLIC_URL}/movie/${movie.id}`}
            >
              <li key={movie.id} className="flex w-64">
                <img
                  className="object-contain m-4 shadow-xl"
                  src={
                    movie.poster_path
                      ? `${baseURL}w780${movie.poster_path}`
                      : "https://cdn.dribbble.com/users/3500380/screenshots/7139980/lalanotfound_4x.png"
                  }
                  alt={movie.title}
                />
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}

export default Search;
