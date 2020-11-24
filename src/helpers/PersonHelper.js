import tmdb from "../api/api";

async function getPersonDetails(dispatch, personId) {
  try {
    dispatch({ type: "fetch_person_loading" });
    const person = await tmdb.get(`person/${personId}`);
    dispatch({ type: "fetch_person", payload: person.data });
  } catch (error) {
    dispatch({ type: "person_fetch_failed", payload: error });
  }
}

async function getPersonMovies(dispatch, personId, page, sort) {
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
    dispatch({ type: "person_fetch_failed", payload: error });
  }
}

export { getPersonDetails, getPersonMovies };
