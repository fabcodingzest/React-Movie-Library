import tmdb from "../api/api";

async function appInit(dispatch) {
  dispatch({ type: "app_loading" });
  await getGenres(dispatch);
  await getConfig(dispatch);
  dispatch({ type: "app_loaded" });
}

async function getGenres(dispatch) {
  try {
    const genres = await tmdb.get(`/genre/movie/list`);
    dispatch({ type: "fetch_genres", payload: genres.data.genres });
  } catch (error) {
    dispatch({ type: "fetch_failed", payload: error });
  }
}

async function getConfig(dispatch) {
  try {
    const config = await tmdb.get(`/configuration`);
    dispatch({ type: "fetch_config", payload: config.data.images });
  } catch (error) {
    dispatch({ type: "fetch_failed", payload: error });
  }
}

export default appInit;
