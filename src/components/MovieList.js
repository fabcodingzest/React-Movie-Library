import React from "react";

function MovieList({ movies, baseURL }) {
  return (
    <div className="flex flex-wrap">
      {movies.results.map((movie) => (
        <li key={movie.id} className="flex w-64">
          <img
            className="m-4"
            src={`${baseURL}w780${movie.poster_path}`}
            alt={movie.title}
          />
        </li>
      ))}
    </div>
  );
}

export default MovieList;
