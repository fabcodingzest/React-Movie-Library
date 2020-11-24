import tmdb from "../api/api";

async function getMovieDetails(dispatch, movieId) {
  dispatch({ type: "movie_loading" });
  try {
    const movie = await tmdb.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    await dispatch({ type: "fetch_movie", payload: movie.data });
    const castDetails = await tmdb.get(`movie/${movieId}/credits`);
    await dispatch({ type: "fetch_cast", payload: castDetails.data.cast });
    dispatch({ type: "movie_loaded" });
  } catch (error) {
    dispatch({ type: "movie_fetch_failed", payload: error });
  }
}
async function getRecommendations(dispatch, movieId, page) {
  try {
    dispatch({ type: "movie_recommendation_loading" });
    const recommendedMovies = await tmdb.get(
      `movie/${movieId}/recommendations`,
      {
        params: { page },
      }
    );
    dispatch({
      type: "fetch_movie_recommendations",
      payload: recommendedMovies.data,
    });
  } catch (error) {
    dispatch({ type: "movie_fetch_failed", payload: error });
  }
}
export { getMovieDetails, getRecommendations };
