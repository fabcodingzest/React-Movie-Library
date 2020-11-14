function MoviesReducer(state, action) {
  switch (action.type) {
    case "fetch_movies":
      return { ...state, movies: action.payload, loadingMovies: false };
    case "movies_fetch_failed":
      return { ...state, errors: [action.payload.message] };
    default:
      return state;
  }
}

export default MoviesReducer;
