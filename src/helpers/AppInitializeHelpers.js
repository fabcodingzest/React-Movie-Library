import tmdb from "../api/api";

async function appInit(dispatch, history) {
  dispatch({ type: "app_loading" });
  await getGenres(dispatch, history);
  await getConfig(dispatch, history);
  dispatch({ type: "app_loaded" });
}

async function getGenres(dispatch, history) {
  try {
    const genres = await tmdb.get(`/genre/movie/list`);
    dispatch({ type: "fetch_genres", payload: genres.data.genres });
  } catch (error) {
    history.push(`${process.env.PUBLIC_URL}/error`);
  }
}

async function getConfig(dispatch, history) {
  try {
    const config = await tmdb.get(`/configuration`);
    dispatch({ type: "fetch_config", payload: config.data.images });
  } catch (error) {
    history.push(`${process.env.PUBLIC_URL}/error`);
  }
}

export default appInit;
