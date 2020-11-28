import tmdb from "../api/api";

async function getPersonDetails(dispatch, history, personId) {
  try {
    dispatch({ type: "fetch_person_loading" });
    const person = await tmdb.get(`person/${personId}`);
    dispatch({ type: "fetch_person", payload: person.data });
  } catch (error) {
    history.push(`${process.env.PUBLIC_URL}/error`);
  }
}

async function getPersonMovies(dispatch, history, personId, page, sort) {
  try {
    dispatch({ type: "fetch_person_movies_loading" });
    const personMovies = await tmdb.get(`/discover/movie`, {
      params: {
        with_cast: personId,
        page,
        sort_by: sort,
      },
    });
    dispatch({
      type: "fetch_person_movies",
      payload: personMovies.data,
    });
  } catch (error) {
    history.push(`${process.env.PUBLIC_URL}/error`);
  }
}

export { getPersonDetails, getPersonMovies };
