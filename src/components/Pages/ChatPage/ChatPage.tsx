import React, { useEffect, useState } from "react";

import { Layout } from "components/layout/Layout";

import { auth } from "Service/firebase";
import { ChatRoom } from "components/ChatRoom";
import "./chatPage.scss";

export const ChatPage = () => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => setCurrentUser(user));
    }, [currentUser]);

    return (
        <Layout pageTitle="Chat">
            {currentUser ? <ChatRoom /> : <div className="">Sign in to access chat</div>}
        </Layout>
    );
};
