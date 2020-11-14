import tmdb from "../api/api";

async function getDiscoverMovies(dispatch, name, page) {
  try {
    const movies = await tmdb.get(`/movie/${name}`, { params: { page } });
    await dispatch({ type: "fetch_movies", payload: movies.data });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

async function getGenreMovies(dispatch, genreId, page, sort) {
  try {
    const movies = await tmdb.get(`discover/movie`, {
      params: { with_genre: genreId, page, sort_by: sort },
    });
    dispatch({ type: "fetch_movies", payload: movies.data });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

export { getDiscoverMovies, getGenreMovies };
