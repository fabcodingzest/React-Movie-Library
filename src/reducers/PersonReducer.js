function PersonReducer(state, action) {
  switch (action.type) {
    case "fetch_person_loaded":
      return { ...state, loadingPerson: true };
    case "fetch_person":
      return { ...state, personDetails: action.payload };
    case "fetch_person_recommendations":
      return {
        ...state,
        recommendedMovies: action.payload,
      };
    case "fetch_person_loading":
      return { ...state, loadingPerson: false };
    case "person_fetch_failed":
      return { ...state, personError: [action.payload.message] };
    case "recommendation_fetch_failed":
      return { ...state, recommendationError: [action.payload.message] };
    default:
      return state;
  }
}

export default PersonReducer;
