import React, { useReducer, useEffect } from "react";
import Sidebar from "./containers/Sidebar";
import { Switch, Route, Redirect } from "react-router-dom";
import Genre from "./containers/Genre";
import Search from "./containers/Search";
import Person from "./containers/Person";
import Discover from "./containers/Discover";
import Movie from "./containers/Movie";
import Searchbar from "./components/Searchbar";
import NotFound from "./containers/NotFound";
import MoviesReducer from "./reducers/MoviesReducer";
import InitializeReducer from "./reducers/InitializeReducer";
import appInit from "./helpers/AppInitializeHelpers";

const INITIAL_APP_STATE = {
  loadingApp: true,
  genres: [],
  config: {},
  errors: [],
};

const INITIAL_MOVIES_STATE = {
  movies: {},
  loadingMovies: true,
  errors: [],
};

function App() {
  const [moviesState, moviesDispatch] = useReducer(
    MoviesReducer,
    INITIAL_MOVIES_STATE
  );
  const [appState, appDispatch] = useReducer(
    InitializeReducer,
    INITIAL_APP_STATE
  );
  useEffect(() => {
    appInit(appDispatch);
  }, []);

  const { config, loadingApp, genres } = appState;

  return (
    <div className="flex items-start">
      {!loadingApp && (
        <>
          <Sidebar genres={genres} config={config} />
          <div>
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
                    dispatch={moviesDispatch}
                    movieState={moviesState}
                    genres={genres}
                    baseURL={config.secure_base_url}
                  />
                )}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/discover/:name"}
                render={(routeProps) => (
                  <Discover
                    {...routeProps}
                    dispatch={moviesDispatch}
                    movieState={moviesState}
                    genres={genres}
                    baseURL={config.secure_base_url}
                  />
                )}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/search/:query"}
                render={(routeProps) => (
                  <Search
                    {...routeProps}
                    dispatch={moviesDispatch}
                    state={moviesState}
                    baseURL={config.secure_base_url}
                  />
                )}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/movie/:id"}
                render={(routeProps) => <Movie {...routeProps} />}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/person/:id"}
                render={(routeProps) => <Person {...routeProps} />}
              />
              <Route exact path="/404" render={() => <NotFound />} />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/error"}
                render={() => <NotFound />}
              />
              <Route render={() => <NotFound />} />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

// Some helpful links for Routing with react-router
// from docs: https://reactrouter.com/web/api/Route/component
// https://stackoverflow.com/questions/62804439/how-to-prevent-infinite-loop-with-reacts-usereducer-usecontext-and-useeffect
