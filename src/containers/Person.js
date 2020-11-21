import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import getPersonComponent from "../helpers/PersonHelper";
import PersonReducer from "../reducers/PersonReducer";

function Person({ match, baseURL, setSelected }) {
  const personId = match.params.id;
  const [state, dispatch] = useReducer(PersonReducer, {
    loadingPerson: true,
    loadingRecommendations: true,
    personDetails: {},
    recommendedMovies: {},
    personError: [],
    recommendationError: [],
  });
  const {
    loadingPerson,
    loadingRecommendations,
    personDetails,
    recommendedMovies,
    errors,
  } = state;
  useEffect(() => {
    setSelected("");
    getPersonComponent(dispatch, personId, 1, "popularity.desc");
  }, [personId, setSelected]);
  console.log("person");

  return (
    <div>
      {!loadingPerson && (
        <div>
          <h1>{personDetails.name}</h1>
          <Link to={`${process.env.PUBLIC_URL}/person/${personId}?page=3`}>
            page 2
          </Link>
          <div>
            {!loadingRecommendations &&
              recommendedMovies.results.map((movie) => (
                <h1 key={movie.id} className="text-4xl">
                  {movie.title}
                </h1>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Person;
