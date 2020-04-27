import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Links } from "./pages/Links";
import { Create } from "./pages/Create";
import { Details } from "./pages/Details";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <Links />
        </Route>
        <Route path="/create" exact>
          <Create />
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
