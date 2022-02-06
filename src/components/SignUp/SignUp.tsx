import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, BUTTON_STYLE } from "../Button";
import { BUTTON_TYPE } from "../Button/buttonProps";
import { auth, db } from "Service/firebase";
import { useToasts } from "react-toast-notifications";

import "./signUp.scss";

interface SignUpProps {
  onClickClose: () => void;
}

export const SignUp = ({ onClickClose }: SignUpProps) => {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { addToast } = useToasts();

    //  get data from inputs and register new user
    const onSubmit = (data: any) => {
        const email = data.email;
        const password = data.password;
        const username = data.username;
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user
                    ?.updateProfile({
                        displayName: username,
                        photoURL: "https://via.placeholder.com/48"
                    })
                    .then(() => {
                        db.collection("users")
                            .doc(result.user?.uid)
                            .set({
                                userName: username,
                                subscription: false
                            })
                            .then(() => {
                                result.user
                                    ?.sendEmailVerification()
                                    // eslint-disable-next-line max-nested-callbacks
                                    .then(() => {
                                        onClickClose();
                                        addToast(
                                            "A verification link has been sent to your email",
                                            { appearance: "success", autoDismiss: true }
                                        );
                                    })
                                    // eslint-disable-next-line max-nested-callbacks
                                    .catch((error) => {
                                        setErrorMessage(error.message);
                                    });
                            });
                    });
            })
            .catch((error) => {
                if (error.code === "auth/weak-password") {
                    return setErrorMessage("Password should be at least 6 characters");
                }
                setErrorMessage(
                    "The email address is already in use by another account"
                );
            });
    };

    return (
        <div className="signUp">
            <div className="signUp__wrapper">
                <div className="signUp__header">
                    <h2>Sign Up</h2>
                    <button className="signUp__header_exit" onClick={onClickClose} />
                </div>
                <hr className="signUp__divider" />
                <form className="signUp__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="signUp__input-wrapper">
                        <label className="signUp__label">Username</label>
                        <input
                            className="signUp__input"
                            type="text"
                            required
                            name="username"
                            ref={register}
                            maxLength={20}
                        />
                    </div>
                    <div className="signUp__input-wrapper">
                        <label className="signUp__label">Email</label>
                        <input
                            className="signUp__input"
                            type="email"
                            required
                            name="email"
                            ref={register}
                        />
                    </div>
                    <div className="signUp__input-wrapper">
                        <label className="signUp__label">Password</label>
                        <input
                            className="signUp__input"
                            type="password"
                            required
                            name="password"
                            ref={register}
                        />
                    </div>
                    {errorMessage && (
                        <div className="signUp__message">
                            <span className="signUp__message_error">{errorMessage}</span>
                        </div>
                    )}

                    <Button
                        category={BUTTON_STYLE.Basic}
                        title="Sign Up"
                        type={BUTTON_TYPE.Submit}
                    />
                </form>
            </div>
        </div>
    );
};
