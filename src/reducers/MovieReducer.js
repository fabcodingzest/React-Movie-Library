function MovieReducer(state, action) {
  switch (action.type) {
    case "fetch_movie":
      return { ...state, movieDetails: action.payload };
    case "fetch_cast":
      return { ...state, castDetails: action.payload };
    case "fetch_movie_recommendations":
      return { ...state, recommendedMovies: action.payload };
    case "movie_loaded":
      return { ...state, loadingMovie: false };
    case "movie_fetch_failed":
      return { ...state, errors: [action.payload.message] };
    case "cast_fetch_failed":
    default:
      return state;
  }
}

export default MovieReducer;
