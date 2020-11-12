import { createContext, useReducer, useContext } from "react";
import tmdb from "../api/api";

const MoviesStateContext = createContext();
const MoviesDispatchContext = createContext();

function MoviesReducer(state, action) {
  switch (action.type) {
    case "fetch_movies_loading":
      return { ...state, loadingMovies: true };
    case "fetch_movies":
      return { ...state, movies: action.payload, loadingMovies: false };
    case "movies_fetch_failed":
      return { ...state, errors: state.errors.push(action.payload) };
    default:
      return state;
  }
}

function MoviesProvider({ children }) {
  const [state, dispatch] = useReducer(MoviesReducer, {
    errors: [],
  });
  return (
    <MoviesStateContext.Provider value={state}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesStateContext.Provider>
  );
}

function useMoviesState() {
  const context = useContext(MoviesStateContext);
  if (context === undefined) {
    throw new Error("useMoviesState must be used within a MoviesProvider");
  }
  return context;
}
function useMoviesDispatch() {
  const context = useContext(MoviesStateContext);
  if (context === undefined) {
    throw new Error("useMoviesDispatch must be used within a MoviesProvider");
  }
  return context;
}

async function getDiscoverMovies(dispatch, name, page, sort) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    const movies = await tmdb.get(`/movie/${name}`, { params: { page } });
    await dispatch({ type: "fetch_movies", payload: movies });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

async function getGenreMovies(dispatch, genreId, page, sort) {
  dispatch({ type: "fetch_movies_loading" });
  try {
    const movies = await tmdb.get(`discover/movie`, {
      params: { with_genre: genreId, page, sort_by: sort },
    });
    dispatch({ type: "fetch_movies", payload: movies });
  } catch (error) {
    dispatch({ type: "movies_fetch_failed", payload: error });
  }
}

export {
  MoviesProvider,
  useMoviesState,
  useMoviesDispatch,
  getDiscoverMovies,
  getGenreMovies,
};
