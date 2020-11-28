function PersonReducer(state, action) {
  switch (action.type) {
    case "fetch_person_loading":
      return { ...state, loadingPerson: true };
    case "fetch_person_movies_loading":
      return { ...state, loadingMovies: true };
    case "fetch_person":
      return { ...state, personDetails: action.payload, loadingPerson: false };
    case "fetch_person_movies":
      return {
        ...state,
        personMovies: action.payload,
        loadingMovies: false,
      };
    default:
      return state;
  }
}

export default PersonReducer;
