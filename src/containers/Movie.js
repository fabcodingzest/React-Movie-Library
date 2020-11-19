import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieReducer from "../reducers/MovieReducer";
import { getMovieDetails } from "../helpers/MovieHelpers";

function Movie({ match }) {
  const [state, dispatch] = useReducer(MovieReducer, {
    loadingMovie: true,
    movieDetails: {},
    castDetails: {},
    recommendedMovies: {},
    errors: [],
  });
  const {
    movieDetails,
    castDetails,
    recommendedMovies,
    loadingMovie,
    errors,
  } = state;
  const movieId = match.params.id;
  useEffect(() => {
    getMovieDetails(dispatch, movieId);
  }, [movieId]);
  console.log("movie");
  return (
    <div>
      {errors.length !== 0 ? (
        <h1>
          {errors.map((error) => (
            <p>{error}</p>
          ))}
        </h1>
      ) : loadingMovie ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{movieDetails.title}</h1>
          <ul>
            {castDetails.map((person) => (
              <Link
                key={person.id}
                to={`${process.env.PUBLIC_URL}/person/${person.id}`}
              >
                <li className="m-2">{person.character}</li>
              </Link>
            ))}
          </ul>
          <div className="bg-pink-400">
            hello
            {recommendedMovies.results.map((movie) => (
              <Link
                key={movie.id}
                className="block m-2"
                to={`${process.env.PUBLIC_URL}/movie/${movie.id}`}
              >
                {movie.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
