import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TasksPage } from "components/Pages/TasksPage/TasksPage";
import { EmptyPage } from "components/Pages/EmptyPage/EmptyPage";
import { NotFoundPage } from "components/Pages/NotFoundPage/NotFoundPage";
import { ChatPage } from "../Pages/ChatPage";
import { FilesPage } from "../Pages/FilesPage";
import { MyTasks } from "../My-tasks";
import { SubscriptionPage } from "../Pages/SubscriptionPage";

import "./app.scss";
import { CalendarPage } from "../Pages/CalendarPage";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TasksPage currentUserTasks={false}/>} />
                <Route path="/empty" element={<EmptyPage/>} />
                <Route path="/chat" element={<ChatPage/>} />
                <Route path="/files" element={<FilesPage/>} />
                <Route path="/my-tasks" element={<MyTasks/>} />
                <Route path="/subscription" element={<SubscriptionPage/>} />
                <Route path="/calendar" element={<CalendarPage/>} />
                <Route path="*" element={<NotFoundPage/>} />

            </Routes>
        </BrowserRouter>
    );
};
