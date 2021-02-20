import React, { useRef, useState } from "react";
import { ChatMessage } from "../ChatMessage";
import { Button, BUTTON_STYLE } from "../Button";
import { sentIcon } from "../../const";
import { BUTTON_TYPE } from "../Button/buttonProps";
import { auth, db, fieldValue } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const ChatRoom = () => {
  const [formValue, setFormValue] = useState("");

  const messageRef = db.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const dummy = useRef<HTMLInputElement>(null);

  const sendMessage = async (evt: any) => {
    evt.preventDefault();
    const photoUrl = auth.currentUser?.photoURL;
    const uid = auth.currentUser?.uid;
    const username = auth.currentUser?.displayName;

    await messageRef.add({
      text: formValue,
      createdAt: fieldValue.serverTimestamp(),
      uid,
      photoUrl,
      username,
    });
    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat">
      <div className="chat__wrapper">
        <header className="chat__header">
          <div className="chat__header_title">
            <i className="fas fa-comment-alt" /> SimpleChat
          </div>
        </header>
        <main className="chat__container">
          {messages &&
            messages.map((msg: any) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

          <div ref={dummy} />
        </main>

        <form className="chat__inputArea" onSubmit={sendMessage}>
          <input
            type="text"
            className="chat__input"
            placeholder="Enter your message..."
            value={formValue}
            onChange={(evt) => setFormValue(evt.target.value)}
          />
          <Button
            category={BUTTON_STYLE.significant}
            titleIcon={sentIcon}
            type={BUTTON_TYPE.submit}
          />
        </form>
      </div>
    </div>
  );
};
