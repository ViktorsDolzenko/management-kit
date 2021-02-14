import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/App";
import { StorageProvider } from "./context/storage";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <StorageProvider>
    <ToastProvider placement="bottom-right">
      <App />
    </ToastProvider>
  </StorageProvider>,
  document.getElementById("root")
);
