import tmdb from "../api/api";

async function getDiscoverMovies(dispatch, name, page) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    const movies = await tmdb.get(`/movie/${name}`, {
      params: { page },
    });
    await dispatch({ type: "fetch_movies", payload: movies.data });
    dispatch({ type: "fetch_movies_loaded" });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

async function getGenreMovies(dispatch, genres, genreName, page, sort) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    let { id } = genres.filter((g) => g.name === genreName)[0];
    const movies = await tmdb.get(`discover/movie`, {
      params: { with_genres: id, page, sort_by: sort },
    });
    await dispatch({ type: "fetch_movies", payload: movies.data });
    dispatch({ type: "fetch_movies_loaded" });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

async function getSearchResults(dispatch, query, page) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    const movies = await tmdb.get(`search/movie`, { params: { query, page } });
    await dispatch({ type: "fetch_movies", payload: movies.data });
    dispatch({ type: "fetch_movies_loaded" });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

export { getDiscoverMovies, getGenreMovies, getSearchResults };
