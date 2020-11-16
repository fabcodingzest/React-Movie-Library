import { useEffect, useState } from "react";
import { getGenreMovies } from "../helpers/MovieHelpers";

function Genre({ match, genres, dispatch, movieState, baseURL }) {
  const genreName = match.params.name;

  useEffect(() => {
    getGenreMovies(dispatch, genres, genreName, 1, "popularity.desc");
  }, [dispatch, genres, genreName]);

  const { movies, loadingMovies } = movieState;

  return (
    <div>
      <ul className="flex flex-wrap">
        {!loadingMovies &&
          movies.results.map((movie) => (
            <li key={movie.id} className="flex w-64">
              <img
                className="m-4"
                src={`${baseURL}w780${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Genre;
