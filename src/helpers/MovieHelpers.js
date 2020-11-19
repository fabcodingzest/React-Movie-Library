import tmdb from "../api/api";

async function getMovieDetails(dispatch, movieId) {
  try {
    const movie = await tmdb.get(`movie/${movieId}`);
    await dispatch({ type: "fetch_movie", payload: movie.data });
    const castDetails = await tmdb.get(`movie/${movieId}/credits`);
    await dispatch({ type: "fetch_cast", payload: castDetails.data.cast });
    const recommendedMovies = await tmdb.get(
      `movie/${movieId}/recommendations`
    );
    await dispatch({
      type: "fetch_movie_recommendations",
      payload: recommendedMovies.data,
    });
    dispatch({ type: "movie_loaded" });
  } catch (error) {
    dispatch({ type: "movie_fetch_failed", payload: error });
  }
}

export { getMovieDetails };
