import { showLoginForm } from "context/actions";
import React, { useContext, useEffect } from "react";

import { StorageContext } from "context/storage";
import { Layout } from "components/layout/Layout";

import "./chatPage.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "Service/firebase";
import { ChatRoom } from "components/ChatRoom/ChatRoom";

export const ChatPage = () => {
  const [user] = useAuthState(auth);
  const { dispatch } = useContext(StorageContext);

  useEffect(() => {
    if (!user) {
      dispatch(showLoginForm(true));
    }
  }, [user]);

  return <Layout pageTitle="Chat">{user && <ChatRoom />}</Layout>;
};
