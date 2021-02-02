import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, BUTTON_STYLE } from "../Button";
import { BUTTON_TYPE } from "../Button/buttonProps";
import { auth } from "../../firebase";

import "./signUp.scss";

interface SignUpProps {
  onClickClose: () => void;
}

export const SignUp = ({ onClickClose }: SignUpProps) => {
  const { register, handleSubmit } = useForm();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = (data: any) => {
    const email = data.email;
    const password = data.password;
    const username = data.username;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.updateProfile({
          displayName: username,
        });
        onClickClose();
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.message);
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
              required={true}
              name="username"
              ref={register}
            />
          </div>
          <div className="signUp__input-wrapper">
            <label className="signUp__label">Email</label>
            <input
              className="signUp__input"
              type="email"
              required={true}
              name="email"
              ref={register}
            />
          </div>
          <div className="signUp__input-wrapper">
            <label className="signUp__label">Password</label>
            <input
              className="signUp__input"
              type="password"
              required={true}
              name="password"
              ref={register}
            />
          </div>
          {errorMessage && (
            <div className="signUp__error">
              <span className="signUp__error_message">
                This email already registered
              </span>
            </div>
          )}
          <Button
            category={BUTTON_STYLE.basic}
            title="Sign Up"
            type={BUTTON_TYPE.submit}
          />
        </form>
      </div>
    </div>
  );
};
