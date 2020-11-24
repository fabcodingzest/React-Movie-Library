import { useEffect, useReducer } from "react";
import MovieList from "../components/MovieList";
import NotFound from "../containers/NotFound";
import Loader from "../components/Loader";
import { getDiscoverMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import { INITIAL_MOVIES_STATE } from "../constants/state";
import { animateScroll as scroll } from "react-scroll";
import queryString from "query-string";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";

function Discover({ location, match, baseURL, setSelected }) {
  const category = match.params.name;
  const params = queryString.parse(location.search);
  console.log("discover");
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 400,
    });
    setSelected(category);
    getDiscoverMovies(
      dispatch,
      category.toLowerCase().replace(/\s/, "_"),
      params.page
    );
  }, [dispatch, category, params.page, setSelected]);

  const { movies, loadingMovies, errors } = state;

  if (loadingMovies) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (errors.length !== 0 || movies.results.length === 0) {
    return (
      <div className="h-screen mt-auto max-w-2xl mx-auto flex justify-center items-center">
        <NotFound title="Oops!" subtitle="Something went wrong..." />
      </div>
    );
  }

  return (
    <div className="text-gray-600 pt-32 min-h-screen flex flex-col justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${category} Movies`}</title>
      </Helmet>
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{category}</h1>
      <p className="text-sm uppercase font-bold ml-4">movies</p>
      <div className="text-gray-700 my-8">
        <MovieList movies={movies} baseURL={baseURL} />
      </div>
      <div className="w-full mb-12">
        <Pagination movies={movies} />
      </div>
    </div>
  );
}

export default Discover;
