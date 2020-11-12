import React from "react";
import Sidebar from "./containers/Sidebar";
import { Switch, Route, Redirect } from "react-router-dom";
import Genre from "./containers/Genre";
import Search from "./containers/Search";
import Person from "./containers/Person";
import Discover from "./containers/Discover";
import Movie from "./containers/Movie";
import NotFound from "./containers/NotFound";

function App() {
  return (
    <div className="flex items-start">
      <Sidebar />
      <Switch>
        <Route
          exact
          path={process.env.PUBLIC_URL + "/"}
          render={() => {
            <Redirect to={process.env.PUBLIC_URL + "/dicover/Popular"} />;
          }}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/genre/:name"}
          component={Genre}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/discover/:name"}
          component={Discover}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/search/:query"}
          component={Search}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/movie/:id"}
          render={(routeProps) => <Movie {...routeProps} />}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/person/:id"}
          component={Person}
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
  );
}

export default App;
