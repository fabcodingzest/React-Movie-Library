import React, { useReducer, useEffect, useState } from "react";
import Sidebar from "./containers/Sidebar";
import { Switch, Route, Redirect } from "react-router-dom";
import Genre from "./containers/Genre";
import Search from "./containers/Search";
import Person from "./containers/Person";
import Discover from "./containers/Discover";
import Movie from "./containers/Movie";
import Searchbar from "./components/Searchbar";
import NotFound from "./containers/NotFound";
import { INITIAL_APP_STATE } from "./constants/state";
import InitializeReducer from "./reducers/InitializeReducer";
import appInit from "./helpers/AppInitializeHelpers";
import Loader from "./components/Loader";

function App() {
  console.log("App render outside useEffect");
  const [selected, setSelected] = useState("Popular");
  const [appState, appDispatch] = useReducer(
    InitializeReducer,
    INITIAL_APP_STATE
  );
  useEffect(() => {
    appInit(appDispatch);
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
      <div className="w-full min-h-screen flex items-start">
        <Sidebar
          genres={genres}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="w-full min-h-screen px-4 md:px-8 relative">
          <Searchbar />
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
