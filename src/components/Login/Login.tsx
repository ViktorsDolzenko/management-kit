import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyledFirebaseAuth } from "react-firebaseui";

import { Button, BUTTON_STYLE } from "../Button";
import { BUTTON_TYPE } from "../Button/buttonProps";
import { auth, uiConfig } from "Service/firebase";

import "./login.scss";

interface LoginProps {
  onClickClose: () => void;
  onSignUpClick: () => void;
}

export const Login = ({ onClickClose, onSignUpClick }: LoginProps) => {
    const { register, handleSubmit } = useForm();

    const [loginError, setLoginError] = useState("");

    // submit function to get data from input and login
    const onSubmit = (data: any) => {
        const email = data.email;
        const password = data.password;

        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                onClickClose();
            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoginError(errorMessage);
            });
    };

    // function to open signup window
    const showSignUp = () => {
        onClickClose();
        onSignUpClick();
    };

    // @ts-ignore
    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__header">
                    <h2>Login</h2>
                    <button className="login__header_exit" onClick={onClickClose} />
                </div>
                <hr className="login__divider" />
                <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="signUp__input-wrapper">
                        <label className="login__label">Email</label>
                        <input
                            className="login__input"
                            type="email"
                            required
                            name="email"
                            ref={register}
                        />
                    </div>
                    <div className="login__input-wrapper">
                        <label className="login__label">Password</label>
                        <input
                            className="login__input"
                            type="password"
                            required
                            name="password"
                            ref={register}
                        />
                    </div>

                    {loginError && (
                        <div className="login__error">
                            <span className="login__error_message">
                Wrong email or password
                            </span>
                        </div>
                    )}

                    <div className="login__buttons">
                        <Button
                            category={BUTTON_STYLE.Basic}
                            title="login"
                            type={BUTTON_TYPE.Submit}
                        />
                        <Button
                            category={BUTTON_STYLE.Basic}
                            title="signUp"
                            type={BUTTON_TYPE.Default}
                            onClick={showSignUp}
                        />
                    </div>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={auth} />
                </form>
            </div>
        </div>
    );
};
