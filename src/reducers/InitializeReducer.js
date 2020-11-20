function InitializeReducer(state, action) {
  switch (action.type) {
    case "app_loading":
      return { ...state, loadingApp: true };
    case "fetch_genres":
      return { ...state, genres: action.payload };
    case "fetch_config":
      return { ...state, config: action.payload };
    case "app_loaded":
      return { ...state, loadingApp: false };
    case "fetch_failed":
      return { ...state, errors: [action.payload.message] };
    default:
      return state;
  }
}

export default InitializeReducer;
