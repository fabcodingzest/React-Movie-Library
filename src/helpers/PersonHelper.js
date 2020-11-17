import tmdb from "../api/api";

function getPersonComponent(dispatch, personId, page, sort) {
  getMovieDetails(dispatch, personId);
  getRecommendedMovies(dispatch, personId, page, sort);
}

async function getMovieDetails(dispatch, personId) {
  try {
    const person = await tmdb.get(`person/${personId}`);
    dispatch({ type: "fetch_person", payload: person.data });
  } catch (error) {
    dispatch({ type: "person_fetch_failed", payload: error });
  }
}

async function getRecommendedMovies(dispatch, personId, page, sort) {
  try {
    const recommendedMovies = await tmdb.get(`/discover/movie`, {
      params: {
        with_cast: personId,
        page,
        sort_by: sort,
      },
    });
    dispatch({
      type: "fetch_person_recommendations",
      payload: recommendedMovies.data,
    });
  } catch (error) {
    dispatch({ type: "recommendation_fetch_failed", payload: error });
  }
}

export default getPersonComponent;
