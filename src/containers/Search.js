import { useReducer } from "react";
import { useEffect } from "react";
import NotFound from "../containers/NotFound";
import MoviesReducer from "../reducers/MoviesReducer";
import { getSearchResults } from "../helpers/MoviesHelpers";
import Loader from "../components/Loader";
import MovieList from "../components/MovieList";
import { animateScroll as scroll } from "react-scroll";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

function Search({ history, location, match, baseURL, setSelected }) {
  const { query } = match.params;
  const params = queryString.parse(location.search);
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
    getSearchResults(dispatch, history, query, params.page);
  }, [query, params.page, setSelected, history]);

  const { movies, loadingMovies } = state;

  if (loadingMovies) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (movies.results.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <NotFound
          title="Sorry!"
          subtitle={`No Results Found for: ${query}`}
          home
        />
      </div>
    );
  }
  return (
    <div className="text-gray-600 py-16 min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${query} Movies`}</title>
      </Helmet>
      <Header name={query} />
      <MovieList movies={movies} baseURL={baseURL} name={query} />
    </div>
  );
}

export default Search;
