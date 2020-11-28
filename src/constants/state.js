export const INITIAL_APP_STATE = {
  loadingApp: true,
  genres: [],
  config: {},
};

export const INITIAL_MOVIES_STATE = {
  loadingMovies: true,
  movies: {},
};

export const INITIAL_PERSON_STATE = {
  loadingPerson: true,
  loadingMovies: true,
  personMovies: {},
  personDetails: {},
  errors: [],
  recommendationError: [],
};

export const INITIAL_MOVIE_STATE = {
  loadingMovie: true,
  loadingRecommendations: true,
  movieDetails: {},
  castDetails: {},
  recommendedMovies: {},
};

export const staticCategories = ["Popular", "Top Rated", "Upcoming"];
