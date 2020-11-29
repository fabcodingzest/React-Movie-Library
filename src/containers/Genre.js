import { useEffect, useReducer, useState } from "react";
import Loader from "../components/Loader";
import { getGenreMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import { INITIAL_MOVIES_STATE } from "../constants/state";
import MovieList from "../components/MovieList";
import SortBy from "../components/SortBy";
import { animateScroll as scroll } from "react-scroll";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import Header from "../components/Header";

function Genre({ history, location, match, genres, baseURL, setSelected }) {
  const genreName = match.params.name;
  const params = queryString.parse(location.search);
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);
  const [option, setOption] = useState({
    value: "popularity.desc",
    label: "Popularity",
  });
  if (!genres.some((genre) => genre.name === genreName)) {
    history.push(`${process.env.PUBLIC_URL}/404`);
  }
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    setSelected(genreName);
    getGenreMovies(
      dispatch,
      history,
      genres,
      genreName,
      params.page,
      option.value
    );
  }, [genres, params.page, genreName, setSelected, option.value, history]);

  const { movies, loadingMovies } = state;

  if (loadingMovies) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-16 text-gray-600 min-h-screen flex flex-col justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${genreName} Movies`}</title>
      </Helmet>
      <Header name={genreName} />
      <div className="my-2 ml-4">
        <SortBy option={option} setOption={setOption} />
      </div>
      <MovieList movies={movies} baseURL={baseURL} />
    </div>
  );
}

export default Genre;
