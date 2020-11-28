import tmdb from "../api/api";

async function getMovieDetails(dispatch, history, movieId) {
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
    history.push(`${process.env.PUBLIC_URL}/error`);
  }
}
async function getRecommendations(dispatch, history, movieId, page) {
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
    history.push(`${process.env.PUBLIC_URL}/error`);
  }
}
export { getMovieDetails, getRecommendations };
