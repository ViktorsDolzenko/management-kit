import React from "react";
import { auth } from "../../firebase";
import "./chatMessage.scss";

export const ChatMessage = ({ message }: any) => {
  const { text, uid, photoUrl } = message;

  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";

  return (
    <div className={`chatMessage ${messageClass}`}>
      <img className="chatMessage__img" src={photoUrl} alt="avatar" />
      <p className="chatMessage__text">{text}</p>
    </div>
  );
};
