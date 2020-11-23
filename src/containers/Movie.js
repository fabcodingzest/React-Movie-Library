import React, { useReducer, useEffect } from "react";
import Loader from "../components/Loader";
import NotFound from "../containers/NotFound";
import blankCanvas from "../assets/blank-canvas.svg";
import { Link } from "react-router-dom";
import MovieReducer from "../reducers/MovieReducer";
import { INITIAL_MOVIE_STATE } from "../constants/state";
import { getMovieDetails } from "../helpers/MovieHelpers";
import Rating from "../components/Rating";
import ListItem from "../components/ListItem";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import CastList from "../components/CastList";

function Movie({ match, baseURL, setSelected }) {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_MOVIE_STATE);
  const {
    movieDetails,
    castDetails,
    recommendedMovies,
    loadingMovie,
    errors,
  } = state;
  const movieId = match.params.id;
  useEffect(() => {
    setSelected("");
    getMovieDetails(dispatch, movieId);
  }, [movieId, setSelected]);
  console.log("movie");

  if (loadingMovie) {
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
  return (
    <div className="pt-24 text-gray-700 ">
      <div className="movie flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-20 max-w-5xl mx-auto">
        <div className="image-wrapper w-3/5 md:w-2/5 rounded-lg">
          <img
            className="object-cover rounded-lg shadow-2xl"
            src={
              movieDetails.poster_path
                ? `${baseURL}w780${movieDetails.poster_path}`
                : { blankCanvas }
            }
            alt={movieDetails.title}
          />
        </div>
        <div className="movie-details w-full md:w-2/4 sm:px-6">
          <h1 className="text-3xl xl:text-4xl w-full font-thin uppercase my-2">
            {movieDetails.title}
          </h1>
          <div className="flex">
            <Rating number={movieDetails.vote_average} />
            <span className="px-2 font-semibold mb-8">
              {movieDetails.vote_average}
            </span>
            <p className="text-md text-gray-400 font-semibold ml-auto uppercase">
              {`${movieDetails.spoken_languages[0].name} / ${
                movieDetails.runtime
              }
              min / ${movieDetails.release_date.slice(0, 4)}`}
            </p>
          </div>
          <div className="genres text-md">
            <p className="font-semibold">The Genres</p>
            {movieDetails.genres.map((genre) => {
              return (
                <Link to={`${process.env.PUBLIC_URL}/genre/${genre.name}`}>
                  <ListItem
                    icon={faDotCircle}
                    text={genre.name}
                    className="hover:translate-y-2"
                  />
                </Link>
              );
            })}
          </div>
          <div className="synopsis text-md">
            <p className="font-semibold mt-6 mb-2">The Synopsis</p>
            <p>{movieDetails.overview}</p>
          </div>
          <CastList castDetails={castDetails} baseURL={baseURL} />
        </div>
      </div>
    </div>
  );
}

export default Movie;
