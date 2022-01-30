import { showLoginForm } from "context/actions";
import React, { useContext, useEffect } from "react";

import { StorageContext } from "context/storage";
import { Layout } from "components/layout/Layout";

import { auth } from "Service/firebase";
import { ChatRoom } from "components/ChatRoom";
import "./chatPage.scss";

export const ChatPage = () => {
    const user = auth.currentUser;
    const { dispatch } = useContext(StorageContext);

    useEffect(() => {
        if (!user) {
            dispatch(showLoginForm(true));
        }
    }, [user]);

    return (
        <Layout pageTitle="Chat">
            {user ? <ChatRoom /> : <div className="">Sign in to access chat</div>}
        </Layout>
    );
};
