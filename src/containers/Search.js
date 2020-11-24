import { useReducer } from "react";
import { useEffect } from "react";
import NotFound from "../containers/NotFound";
import MoviesReducer from "../reducers/MoviesReducer";
import { getSearchResults } from "../helpers/MoviesHelpers";
import Loader from "../components/Loader";
import MovieList from "../components/MovieList";
import { animateScroll as scroll } from "react-scroll";
import queryString from "query-string";
import Pagination from "../components/Pagination";

function Search({ location, match, baseURL, setSelected }) {
  const { query } = match.params;
  const params = queryString.parse(location.search);
  console.log(params);
  const [state, dispatch] = useReducer(MoviesReducer, {
    loadingMovies: true,
    movies: {},
    errors: [],
  });

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 400,
    });
    setSelected("");
    getSearchResults(dispatch, query, params.page);
  }, [query, params.page, setSelected]);

  console.log("search");

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

  if (movies.results.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <NotFound title="Sorry!" subtitle={`No Results Found for: ${query}`} />
      </div>
    );
  }
  return (
    <div className="text-gray-600 pt-32 min-h-screen">
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{query}</h1>
      <p className="text-sm uppercase font-bold ml-4">Search Results</p>
      <MovieList movies={movies} baseURL={baseURL} name={query} />
      <div className="w-full mb-12">
        <Pagination movies={movies} />
      </div>
    </div>
  );
}

export default Search;
