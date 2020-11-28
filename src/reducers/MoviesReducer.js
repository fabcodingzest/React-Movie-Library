function MoviesReducer(state, action) {
  switch (action.type) {
    case "fetch_movies_loading":
      return { ...state, loadingMovies: true };
    case "fetch_movies":
      return { ...state, movies: action.payload };
    case "fetch_movies_loaded":
      return { ...state, loadingMovies: false };
    default:
      return state;
  }
}

export default MoviesReducer;
