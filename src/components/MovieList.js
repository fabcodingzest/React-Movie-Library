import MovieItem from "./MovieItem";
import Pagination from "../components/Pagination";

function MovieList({ movies, baseURL }) {
  return (
    <>
      <div className="grid grid-cols-auto-sm sm:grid-cols-auto-lg gap-x-2 xl:gap-x-8 gap-y-16 align-content-between justify-evenly mt-8">
        {movies.results.map((movie) => (
          <MovieItem movie={movie} baseURL={baseURL} key={movie.id} />
        ))}
      </div>
      <div className="w-full mb-6">
        <Pagination movies={movies} />
      </div>
    </>
  );
}

export default MovieList;
