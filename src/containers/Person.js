import { useEffect, useReducer, useState } from "react";
import Avatar from "../assets/avatar.svg";
import NotFound from "../containers/NotFound";
import Loader from "../components/Loader";
import { getPersonDetails, getPersonMovies } from "../helpers/PersonHelper";
import PersonReducer from "../reducers/PersonReducer";
import { INITIAL_PERSON_STATE } from "../constants/state";
import MovieList from "../components/MovieList";
import queryString from "query-string";
import Button from "../components/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { Element, animateScroll as scroll } from "react-scroll";
import Pagination from "../components/Pagination";
import SortBy from "../components/SortBy";
import { Helmet } from "react-helmet";

function Person({ location, history, match, baseURL, setSelected }) {
  const personId = match.params.id;
  const params = queryString.parse(location.search);
  const [state, dispatch] = useReducer(PersonReducer, INITIAL_PERSON_STATE);
  const [option, setOption] = useState({
    value: "popularity.desc",
    label: "Popularity",
  });
  const {
    loadingPerson,
    loadingMovies,
    personDetails,
    personMovies,
    errors,
  } = state;
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 400,
    });
    setSelected("");
    getPersonDetails(dispatch, personId);
  }, [personId, setSelected]);
  useEffect(() => {
    getPersonMovies(dispatch, personId, params.page, option.value);
  }, [personId, params.page, option]);
  console.log("person");

  if (errors.length !== 0) {
    return (
      <div className="h-screen mt-auto max-w-2xl mx-auto flex justify-center items-center">
        <NotFound title="Oops!" subtitle="Something went wrong..." />
      </div>
    );
  }

  const renderBack = () => {
    if (history.action === "PUSH")
      return (
        <div onClick={history.goBack}>
          <Button title="Go back" icon={faArrowLeft} solid left />
        </div>
      );
  };

  return (
    <div className="pt-16 text-gray-700 ">
      {loadingPerson ? (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="movie flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16 max-w-6xl mx-auto">
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`${personDetails.name} - Movie Library`}</title>
          </Helmet>
          <div className="image-wrapper max-w-sm rounded-lg">
            <img
              className="object-cover rounded-lg"
              src={
                personDetails.profile_path
                  ? `${baseURL}w500${personDetails.profile_path}`
                  : Avatar
              }
              alt={personDetails.title}
            />
          </div>
          <div className="movie-details w-full lg:w-2/4 sm:px-6">
            <h1 className="text-3xl xl:text-4xl w-full font-thin uppercase my-2">
              {personDetails.name}
            </h1>
            <div className="Biography text-md">
              <p className="font-semibold mt-6 mb-2">The Biography</p>
              <p>
                {personDetails.biography.length !== 0
                  ? personDetails.biography
                  : "No biography found..."}
              </p>
            </div>
            <div className="links w-full flex flex-row justify-between items-center my-8">
              {renderIMDB(personDetails.imdb_id)}
              {renderBack()}
            </div>
          </div>
        </div>
      )}
      <div className="recommended mt-20">
        <h1 className="text-3xl w-full font-thin uppercase ml-4">
          Also Enters in
        </h1>
        <p className="text-sm uppercase font-bold ml-4">movies</p>
        <div className="my-2 ml-4">
          <SortBy option={option} setOption={setOption} />
        </div>
        {renderPersonMovies(personMovies, loadingMovies, baseURL)}
      </div>
      <div className="w-full mb-12">
        <Pagination movies={personMovies} />
      </div>
    </div>
  );
}
const renderIMDB = (id) => {
  if (!id) return null;
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.imdb.com/name/${id}`}
    >
      <Button title="IMDB" icon={faImdb} />
    </a>
  );
};
const renderPersonMovies = (movies, loading, baseURL) => {
  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  if (movies.results.length === 0) {
    return (
      <div className="my-90 mt-auto max-w-2xl mx-auto flex justify-center items-center">
        <NotFound title="Oops!" subtitle="Something went wrong..." />
      </div>
    );
  }
  return (
    <Element name="scroll-to-element">
      <MovieList movies={movies} baseURL={baseURL} />
    </Element>
  );
};
export default Person;
