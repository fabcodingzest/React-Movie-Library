import { useEffect } from "react";
import { getDiscoverMovies } from "../helpers/MovieHelpers";

function Discover({ dispatch, state, match }) {
  useEffect(() => {
    getDiscoverMovies(dispatch, "popular", 1);
  }, []);
  console.log(state);
  return (
    <div className="text-gray-700 mt-8">
      <p className="font-semibold">Discover</p>
    </div>
  );
}

export default Discover;
