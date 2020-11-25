import { useEffect, useReducer, useState } from "react";
import Loader from "../components/Loader";
import NotFound from "../containers/NotFound";
import { getGenreMovies } from "../helpers/MoviesHelpers";
import MoviesReducer from "../reducers/MoviesReducer";
import { INITIAL_MOVIES_STATE } from "../constants/state";
import MovieList from "../components/MovieList";
import SortBy from "../components/SortBy";
import { animateScroll as scroll } from "react-scroll";
import queryString from "query-string";
import { Helmet } from "react-helmet";

function Genre({ location, match, genres, baseURL, setSelected }) {
  const genreName = match.params.name;
  const params = queryString.parse(location.search);
  const [state, dispatch] = useReducer(MoviesReducer, INITIAL_MOVIES_STATE);
  const [option, setOption] = useState({
    value: "popularity.desc",
    label: "Popularity",
  });
  console.log("genre");
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 500,
    });
    setSelected(genreName);
    getGenreMovies(dispatch, genres, genreName, params.page, option.value);
  }, [genres, params.page, genreName, setSelected, option.value]);

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
        <NotFound title="Oops!" subtitle="Something went wrong..." home />
      </div>
    );
  }

  return (
    <div className="pt-16 text-gray-600 min-h-screen flex flex-col justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${genreName} Movies`}</title>
      </Helmet>
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{genreName}</h1>
      <p className="text-sm uppercase font-bold ml-4">movies</p>
      <div className="my-2 ml-4">
        <SortBy option={option} setOption={setOption} />
      </div>
      <MovieList movies={movies} baseURL={baseURL} />
    </div>
  );
}

export default Genre;
