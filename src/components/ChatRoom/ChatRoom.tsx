import React, { useRef, useState } from "react";
import { ChatMessage } from "../ChatMessage";
import { Button, BUTTON_STYLE } from "../Button";
import { sentIcon } from "../../const";
import { BUTTON_TYPE } from "../Button/buttonProps";
import { auth, db, fieldValue } from "Service/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const ChatRoom = () => {
    const [formValue, setFormValue] = useState("");

    // request to get messages from collection
    const messageRef = db.collection("messages");
    // order messages by query
    const messageQuery = messageRef.orderBy("createdAt").limitToLast(25);
    // @ts-ignore
    const [messages] = useCollectionData(messageQuery, { idField: "id" });

    const dummy = useRef<HTMLInputElement>(null);

    // message sending function
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
            username
        });
        setFormValue("");
        dummy.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    };

    return (
        <div className="chat">
            <div className="chat__wrapper">
                <header className="chat__header">
                    <div className="chat__header_title">
                        <i className="fas fa-comment-alt" /> ToDoeX Chat
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
                        value={formValue.trimStart()}
                        onChange={(evt) => setFormValue(evt.target.value)}
                        required
                        minLength={1}
                        maxLength={100}
                    />
                    <Button
                        category={BUTTON_STYLE.Significant}
                        titleIcon={sentIcon}
                        type={BUTTON_TYPE.Submit}
                        title={''}
                    />
                </form>
            </div>
        </div>
    );
};
