import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/App";
import { StorageProvider } from "./context/storage";
import { ToastProvider } from "react-toast-notifications";

import './i18n';

ReactDOM.render(
    <StorageProvider>
        <ToastProvider placement="bottom-right">
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        </ToastProvider>
    </StorageProvider>,
    document.getElementById("root")
);
