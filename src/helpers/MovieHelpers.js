import tmdb from "../api/api";

async function getDiscoverMovies(dispatch, name, page) {
  try {
    const movies = await tmdb.get(`/movie/${name}`, {
      params: { page },
    });
    await dispatch({ type: "fetch_movies", payload: movies.data });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

async function getGenreMovies(dispatch, genres, genreName, page, sort) {
  try {
    let { id } = genres.filter((g) => g.name === genreName)[0];
    const movies = await tmdb.get(`discover/movie`, {
      params: { with_genres: id, page, sort_by: sort },
    });
    dispatch({ type: "fetch_movies", payload: movies.data });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

async function getSearchResults(dispatch, query, page) {
  try {
    const movies = await tmdb.get(`search/movie`, { params: { query, page } });
    dispatch({ type: "fetch_movies", payload: movies.data });
    console.log(movies.data);
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

export { getDiscoverMovies, getGenreMovies, getSearchResults };
