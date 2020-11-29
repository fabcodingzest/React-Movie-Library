import { useEffect, useReducer } from "react";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import { getDiscoverMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import { INITIAL_MOVIES_STATE } from "../constants/state";
import { animateScroll as scroll } from "react-scroll";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

function Discover({
  staticCategories,
  history,
  location,
  match,
  baseURL,
  setSelected,
}) {
  const category = match.params.name;
  const params = queryString.parse(location.search);
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 400,
    });
    setSelected(category);
    getDiscoverMovies(
      dispatch,
      staticCategories,
      history,
      category,
      params.page
    );
  }, [category, history, params.page, setSelected, staticCategories]);
  const { movies, loadingMovies } = state;

  if (loadingMovies) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-gray-600 py-16 min-h-screen flex flex-col justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${category} Movies`}</title>
      </Helmet>
      <Header name={category} />
      <div className="text-gray-700 my-8">
        <MovieList movies={movies} baseURL={baseURL} />
      </div>
    </div>
  );
}

export default Discover;
