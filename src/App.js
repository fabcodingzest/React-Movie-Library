import React, { useReducer, useEffect, useState } from "react";
import Sidebar from "./containers/Sidebar";
import { Switch, Route, Redirect } from "react-router-dom";
import Genre from "./containers/Genre";
import Search from "./containers/Search";
import Person from "./containers/Person";
import Discover from "./containers/Discover";
import MobileMenu from "./containers/MobileMenu";
import Movie from "./containers/Movie";
import Searchbar from "./components/Searchbar";
import NotFound from "./containers/NotFound";
import { INITIAL_APP_STATE } from "./constants/state";
import InitializeReducer from "./reducers/InitializeReducer";
import appInit from "./helpers/AppInitializeHelpers";
import Loader from "./components/Loader";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GA_KEY);
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  console.log("App render outside useEffect");
  const [selected, setSelected] = useState("Popular");
  const [isMobile, setMobile] = useState(null);
  const [appState, appDispatch] = useReducer(
    InitializeReducer,
    INITIAL_APP_STATE
  );

  const changeFromMobile = () => {
    window.matchMedia("(min-width: 1024px").matches
      ? setMobile(false)
      : setMobile(true);
  };
  useEffect(() => {
    changeFromMobile();
    window.addEventListener("resize", changeFromMobile);
    appInit(appDispatch);
    return () => window.removeEventListener("resize", changeFromMobile);
  }, [appDispatch]);

  const { config, loadingApp, genres, errors } = appState;
  if (loadingApp) {
    return (
      <div className="h-screen w-full flex justify-center items-center my-auto">
        <Loader />
      </div>
    );
  }
  if (errors.length !== 0) {
    return (
      <div className="w-screen h-screen text-gray-600">
        <NotFound title="Opps!" subtitle="Something went wrong..." />
      </div>
    );
  }

  return (
    <div className="text-gray-600">
      <div
        className={`w-full min-h-screen ${
          isMobile ? "flex-col" : "flex"
        } items-start`}
      >
        {isMobile ? (
          <MobileMenu
            genres={genres}
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <>
            <Sidebar
              genres={genres}
              selected={selected}
              setSelected={setSelected}
            />
            <div className="z-50 absolute top-6 right-8">
              <Searchbar />
            </div>
          </>
        )}
        <div className="w-full min-h-screen px-4 md:px-8 relative">
          <Switch>
            <Route
              exact
              path={process.env.PUBLIC_URL + "/"}
              render={() => <Redirect to="/discover/Popular" />}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/genre/:name"}
              render={(routeProps) => (
                <Genre
                  {...routeProps}
                  genres={genres}
                  baseURL={config.secure_base_url}
                  setSelected={setSelected}
                />
              )}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/discover/:name"}
              render={(routeProps) => (
                <Discover
                  {...routeProps}
                  genres={genres}
                  baseURL={config.secure_base_url}
                  setSelected={setSelected}
                />
              )}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/search/:query"}
              render={(routeProps) => (
                <Search
                  {...routeProps}
                  baseURL={config.secure_base_url}
                  setSelected={setSelected}
                />
              )}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/movie/:id"}
              baseURL={config.secure_base_url}
              render={(routeProps) => (
                <Movie
                  {...routeProps}
                  setSelected={setSelected}
                  baseURL={config.secure_base_url}
                />
              )}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/person/:id"}
              baseURL={config.secure_base_url}
              render={(routeProps) => (
                <Person
                  {...routeProps}
                  setSelected={setSelected}
                  baseURL={config.secure_base_url}
                />
              )}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/error"}
              component={NotFound}
            />
            <Route render={() => <NotFound />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

// Some helpful links for Routing with react-router
// from docs: https://reactrouter.com/web/api/Route/component
// https://stackoverflow.com/questions/62804439/how-to-prevent-infinite-loop-with-reacts-usereducer-usecontext-and-useeffect
