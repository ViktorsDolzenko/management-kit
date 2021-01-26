import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/App";
import { StorageProvider } from "./context/storage";

ReactDOM.render(
  <StorageProvider>
    <App />
  </StorageProvider>,
  document.getElementById("root")
);
