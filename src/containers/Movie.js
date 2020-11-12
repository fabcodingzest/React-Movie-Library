import React, { useReducer, useEffect } from "react";
import tmdb from "../api/api";

function MovieReducer(state, action) {
  switch (action.type) {
    case "movie_detail_loading":
      return { ...state, loading: true };
    case "fetch_movie_details":
      return { ...state, movieDetails: action.payload };
    case "fetch_movie_cast":
      return { ...state, cast: action.payload };
    case "fetch_movie_finished":
      return { ...state, loading: false };
    case "movie_detail_fetch_failed":
      return { ...state, errors: state.errors.push(action.payload) };
    default:
      return state;
  }
}

async function getMovieDetails(dispatch, movieId) {
  dispatch({ type: "movie_detail_loading" });
  try {
    const movieDetails = await tmdb.get(`/movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    dispatch({ type: "fetch_movie_details", payload: movieDetails });
    const castDetails = await tmdb.get(`/movie/${movieId}/credits`);
    await dispatch({ type: "fetch_movie_cast", payload: castDetails });
    dispatch({ type: "fetch_movie_finished" });
  } catch (error) {
    dispatch({ type: "movie_detail_fetch_failed" });
  }
}

function Movie({ movieId }) {
  const [state, dispatch] = useReducer(MovieReducer, { errors: [] });
  const { movie, loading } = state;
  useEffect(() => {
    getMovieDetails(dispatch, movieId);
  });
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
        </div>
      )}
    </div>
  );
}

export default Movie;
