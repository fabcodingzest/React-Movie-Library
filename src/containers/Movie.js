import React, { useReducer, useEffect, ErrorBoundary } from "react";
import tmdb from "../api/api";

function MovieReducer(state, action) {
  switch (action.type) {
    case "fetch_movie_details":
      return {
        ...state,
        movieDetails: action.movieDetails,
        castDetails: action.castDetails.cast,
        loading: false,
        errors: [],
      };
    case "movie_detail_fetch_failed":
      return { ...state, errors: [action.payload.message] };
    default:
      return state;
  }
}

async function getMovieDetails(dispatch, movieId) {
  try {
    const movieDetails = await tmdb.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    const castDetails = await tmdb.get(`/movie/${movieId}/credits`);
    console.log(castDetails);
    dispatch({
      type: "fetch_movie_details",
      movieDetails: movieDetails.data,
      castDetails: castDetails.data,
    });
  } catch (error) {
    dispatch({ type: "movie_detail_fetch_failed", payload: error });
  }
}

function Movie({ match }) {
  const [state, dispatch] = useReducer(MovieReducer, {
    movieDetails: {},
    castDetails: {},
    loading: true,
    errors: [],
  });
  let { movieDetails, castDetails, loading, errors } = state;
  useEffect(() => {
    getMovieDetails(dispatch, match.params.id);
  }, [match.params.id, dispatch]);
  console.log(state);
  return (
    <div>
      {errors.length !== 0 ? (
        <h1>
          {errors.map((error) => (
            <p>{error}</p>
          ))}
        </h1>
      ) : loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movieDetails.title}
          <ul>
            {castDetails.map((item) => (
              <li key={item.id}>{item.character}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Movie;
