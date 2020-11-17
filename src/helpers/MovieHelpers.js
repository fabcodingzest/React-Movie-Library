import tmdb from "../api/api";

async function getMovieDetails(dispatch, movieId) {
  dispatch({ type: "movie_loading" });
  try {
    const movie = await tmdb.get(`movie/${movieId}`);
    dispatch({ type: "fetch_movie", payload: movie.data });
    const recommendedMovies = await tmdb.get(
      `movie/${movieId}/recommendations`
    );
    const castDetails = await tmdb.get(`movie/${movieId}/credits`);
    dispatch({ type: "fetch_cast", payload: castDetails.data.cast });
    dispatch({
      type: "fetch_movie_recommendations",
      payload: recommendedMovies.data,
    });
    dispatch({ type: "movie_loaded" });
  } catch (error) {
    dispatch({ type: "movie_fetch_failed", payload: error });
  }
}

export { getMovieDetails };
