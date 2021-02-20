import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { TasksPage } from "components/Pages/TasksPage/TasksPage";
import { EmptyPage } from "components/Pages/EmptyPage/EmptyPage";
import { NotFoundPage } from "components/Pages/NotFoundPage/NotFoundPage";

import "./app.scss";
import { ChatPage } from "../Pages/ChatPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TasksPage} />
        <Route exact path="/empty" component={EmptyPage} />
        <Route exact path="/chat" component={ChatPage} />
        <Route render={() => <NotFoundPage />} />
      </Switch>
    </BrowserRouter>
  );
};
