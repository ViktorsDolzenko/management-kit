import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, BUTTON_STYLE } from "../Button";
import { BUTTON_TYPE } from "../Button/buttonProps";

import "./login.scss";
import { auth } from "../../firebase";

interface LoginProps {
  onClickClose: () => void;
  onSignUpClick: () => void;
}

export const Login = ({ onClickClose, onSignUpClick }: LoginProps) => {
  const { register, handleSubmit } = useForm();

  const [loginError, setLoginError] = useState("");

  const onSubmit = (data: any, evt: any) => {
    const email = data.email;
    const password = data.password;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => onClickClose())
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

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
              required={true}
              name="email"
              ref={register}
            />
          </div>
          <div className="login__input-wrapper">
            <label className="login__label">Password</label>
            <input
              className="login__input"
              type="password"
              required={true}
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
              category={BUTTON_STYLE.basic}
              title="Login"
              type={BUTTON_TYPE.submit}
            />
            <Button
              category={BUTTON_STYLE.basic}
              title="Sign Up"
              type={BUTTON_TYPE.default}
              onClick={onSignUpClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
