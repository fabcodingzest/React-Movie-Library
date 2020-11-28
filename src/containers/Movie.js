import React, { useReducer, useEffect, useState } from "react";
import Loader from "../components/Loader";
import NotFound from "../containers/NotFound";
import blankCanvas from "../assets/blank-canvas.svg";
import { Link } from "react-router-dom";
import MovieReducer from "../reducers/MovieReducer";
import { INITIAL_MOVIE_STATE } from "../constants/state";
import { getMovieDetails, getRecommendations } from "../helpers/MovieHelpers";
import Rating from "../components/Rating";
import ListItem from "../components/ListItem";
import Button from "../components/Button";
import MovieList from "../components/MovieList";
import {
  faDotCircle,
  faArrowLeft,
  faLink,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import CastList from "../components/CastList";
import ModalVideo from "react-modal-video";
import queryString from "query-string";
import { Element, animateScroll as scroll } from "react-scroll";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import Header from "../components/Header";

function Movie({ location, history, match, baseURL, setSelected }) {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_MOVIE_STATE);
  const [isOpen, setOpen] = useState(false);
  const [imageloaded, setImgLoaded] = useState(false);
  const params = queryString.parse(location.search);

  const {
    movieDetails,
    castDetails,
    recommendedMovies,
    loadingMovie,
    loadingRecommendations,
  } = state;
  const movieId = match.params.id;

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 400,
    });
    setSelected("");
    getMovieDetails(dispatch, history, movieId);
    return () => setImgLoaded(false);
  }, [setSelected, movieId, history]);

  useEffect(() => {
    getRecommendations(dispatch, history, movieId, params.page);
  }, [movieId, params.page, history]);

  const renderBack = () => {
    if (history.action === "PUSH")
      return (
        <div onClick={history.goBack}>
          <Button title="Go back" icon={faArrowLeft} solid left />
        </div>
      );
  };

  return (
    <div className="py-16 text-gray-700 ">
      {loadingMovie ? (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <LazyLoad height={500}>
          <div className="movie flex flex-col md:flex-row justify-center items-center max-w-4xl 2xl:max-w-6xl mx-auto">
            <Helmet>
              <meta charSet="utf-8" />
              <title>{`${movieDetails.title} - Movie Library`}</title>
            </Helmet>
            <div className="w-full h-full max-w-xs lg:max-w-sm md:w-2/5 rounded-lg md:mr-4 xl:mr-20 mb-10 lg:mb-0">
              {!imageloaded ? (
                <div className="loader-wrapper w-full h-full flex justify-center items-center rounded-lg shadow-2xl transition-all">
                  <Loader imageLoader />
                </div>
              ) : null}
              <img
                onLoad={() => setImgLoaded(true)}
                className={`object-cover rounded-lg shadow-2xl ${
                  !imageloaded ? "hidden" : "block"
                }`}
                src={
                  movieDetails.poster_path
                    ? `${baseURL}w500${movieDetails.poster_path}`
                    : { blankCanvas }
                }
                alt={movieDetails.title}
              />
            </div>
            <div className="movie-details w-full md:w-3/5 sm:px-6">
              <h1 className="text-3xl xl:text-4xl w-full font-thin uppercase my-2">
                {movieDetails.title}
              </h1>
              <div className="ratings flex">
                <Rating number={movieDetails.vote_average} />
                <span className="px-2 font-semibold mb-8">
                  {movieDetails.vote_average}
                </span>
                <p className="text-sm text-gray-400 font-semibold ml-auto uppercase">
                  {`${movieDetails.spoken_languages[0].name} / ${
                    movieDetails.runtime
                  }
              min / ${movieDetails.release_date.slice(0, 4)}`}
                </p>
              </div>
              <div className="genres text-sm">
                <p className="font-semibold mb-2 uppercase">The Genres</p>
                {movieDetails.genres.map((genre) => {
                  return (
                    <Link
                      to={`${process.env.PUBLIC_URL}/genre/${genre.name}`}
                      key={genre.id}
                      className="pr-1"
                    >
                      <ListItem icon={faDotCircle} text={genre.name} hover />
                    </Link>
                  );
                })}
              </div>
              <div className="synopsis text-md md:text-sm">
                <p className="font-semibold mt-6 mb-2 uppercase">
                  The Synopsis
                </p>
                <p className="">
                  {movieDetails.overview.length !== 0
                    ? movieDetails.overview
                    : "No Synopsis found..."}
                </p>
              </div>
              <div className="castList text-sm">
                <p className="font-semibold mt-6 mb-2 uppercase">The Cast</p>
                <CastList castDetails={castDetails} baseURL={baseURL} />
              </div>
              <div className="links w-full flex flex-row justify-between items-center">
                <div className="buttons flex flex-wrap sm:flex-nowrap gap-1 items-center">
                  {renderWebsite(movieDetails.homepage)}
                  {renderIMDB(movieDetails.imdb_id)}
                  {renderTrailer(isOpen, setOpen, movieDetails.videos.results)}
                </div>
                {renderBack()}
              </div>
            </div>
          </div>
        </LazyLoad>
      )}
      <div className="recommended mt-20">
        <Header name="Recommended" />
        {renderRecommendedMovies(
          recommendedMovies,
          baseURL,
          loadingRecommendations
        )}
      </div>
    </div>
  );
}

const renderWebsite = (link) => {
  if (!link) return null;
  return (
    <a href={link} target="_blank" rel="noreferrer" className="mr-1">
      <Button title="Website" icon={faLink} />
    </a>
  );
};
const renderIMDB = (id) => {
  if (!id) return null;
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.imdb.com/title/${id}`}
      className="mr-1"
    >
      <Button title="IMDB" icon={faImdb} />
    </a>
  );
};
const renderTrailer = (isOpen, setOpen, videos) => {
  if (videos.length === 0 || !videos) return;
  const { key } = videos.find(
    (video) =>
      video.type === "Trailer" ||
      (video.type === "Teaser" && video.site === "YouTube")
  );
  return (
    <>
      <div onClick={() => setOpen(true)}>
        <Button title="Trailer" icon={faPlay} />
      </div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={key}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const renderRecommendedMovies = (movies, baseURL, loading) => {
  if (loading) {
    return (
      <div className="mt-32 flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (movies.results.length === 0) {
    return (
      <div className="mt-24 max-w-xl lg:max-w-5xl mx-auto flex justify-center items-center">
        <NotFound title="Sorry!" subtitle="No recommendations found..." />
      </div>
    );
  }
  return (
    <Element name="scroll-to-element">
      <MovieList movies={movies} baseURL={baseURL} />
    </Element>
  );
};

export default Movie;
