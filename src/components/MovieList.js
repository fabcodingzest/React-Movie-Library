import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import blankCanvas from "../assets/blank-canvas.svg";

function MovieList({ movies, baseURL }) {
  return (
    <div className="grid grid-cols-auto-sm sm:grid-cols-auto-lg gap-x-2 xl:gap-x-8 gap-y-16 align-content-between justify-evenly mt-8">
      {movies.results.map((movie) => (
        <Link to={`${process.env.PUBLIC_URL}/movie/${movie.id}`} key={movie.id}>
          <div
            key={movie.id}
            className="text-gray-500 hover:text-gray-100 bg-transparent flex flex-col justify-start items-center w-full max-w-xs rounded-lg transition duration-300 ease-in-out transform scale-100 hover:scale-105 hover:bg-gray-700"
          >
            <img
              src={`${
                movie.poster_path
                  ? `${baseURL}w780${movie.poster_path}`
                  : `${blankCanvas}`
              }`}
              alt={movie.title}
              className="h-72 sm:h-96 rounded-lg hover:rounded-br-none hover:rounded-bl-none object-contain shadow-xl hover:shadow-2xl"
            />
            <div className="w-full h-full my-auto text-center text-sm md:text-md py-4 px-2 flex flex-col justify-around">
              <p>{movie.title}</p>
              <Rating number={movie.vote_average} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
