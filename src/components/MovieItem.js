import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import blankCanvas from "../assets/blank-canvas.svg";
import LazyLoad from "react-lazyload";
import Loader from "./Loader";

function MovieItem({ movie, baseURL }) {
  const [imageloaded, setImgLoaded] = useState(false);

  useEffect(() => {
    return () => setImgLoaded(false);
  }, []);

  return (
    <LazyLoad height={200} offset={200}>
      <Link to={`${process.env.PUBLIC_URL}/movie/${movie.id}`} key={movie.id}>
        <div className="group text-gray-500 hover:text-gray-100 bg-transparent flex flex-col justify-start items-center w-full max-w-xs rounded-lg transition duration-300 ease-in-out transform scale-100 hover:scale-105 hover:bg-gray-700">
          {!imageloaded ? (
            <div className="movie-img-wrapper w-full h-full flex justify-center items-center rounded-lg shadow-2xl transition-all">
              <Loader imageLoader />
            </div>
          ) : null}
          <img
            onLoad={() => setImgLoaded(true)}
            src={`${
              movie.poster_path
                ? `${baseURL}w500${movie.poster_path}`
                : `${blankCanvas}`
            }`}
            alt={movie.title}
            className={`h-72 sm:h-96 ${
              !imageloaded ? "hidden" : "block"
            } rounded-lg group-hover:rounded-br-none group-hover:rounded-bl-none object-cover shadow-xl group-hover:shadow-2xl`}
          />
          <div className="w-full h-full my-auto text-center text-sm md:text-md py-4 px-2 flex flex-col justify-around">
            <p>{movie.title}</p>
            <Rating number={movie.vote_average} />
          </div>
        </div>
      </Link>
    </LazyLoad>
  );
}

export default MovieItem;
