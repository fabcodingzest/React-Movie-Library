function MovieReducer(state, action) {
  switch (action.type) {
    case "movie_loading":
      return { ...state, loadingMovie: true };
    case "movie_recommendation_loading":
      return { ...state, loadingRecommendations: true };
    case "fetch_movie":
      return { ...state, movieDetails: action.payload };
    case "fetch_cast":
      return { ...state, castDetails: action.payload };
    case "fetch_movie_recommendations":
      return {
        ...state,
        recommendedMovies: action.payload,
        loadingRecommendations: false,
      };
    case "movie_loaded":
      return { ...state, loadingMovie: false };
    case "movie_fetch_failed":
    case "cast_fetch_failed":
      return { ...state, errors: [action.payload.message] };
    default:
      return state;
  }
}

export default MovieReducer;
