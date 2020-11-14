import { useEffect } from "react";
import { getGenreMovies } from "../helpers/MovieHelpers";

function Genre({ match, dispatch, state }) {
  useEffect(() => {
    getGenreMovies(dispatch, 18, 1, "popularity.desc");
  }, []);

  console.log(state, "hey");
  const { movies, loadingMovies } = state;
  const { results } = movies;
  console.log(results);

  return (
    <div>
      <ul>
        {!loadingMovies &&
          state.movies.results.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
      </ul>
    </div>
  );
}

export default Genre;
