import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TasksPage } from "../Pages/TasksPage/TasksPage";
import "./app.scss";
import { EmptyPage } from "../Pages/EmptyPage/EmptyPage";
import { NotFoundPage } from "../Pages/NotFoundPage/NotFoundPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TasksPage} />
        <Route exact path="/empty" component={EmptyPage} />
        <Route render={() => <NotFoundPage />} />
      </Switch>
    </BrowserRouter>
  );
};
