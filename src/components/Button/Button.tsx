import React from "react";
import { BUTTON_TYPE } from "./buttonProps";
import "./button.scss";

interface ButtonProps {
  type?: BUTTON_TYPE;
  title?: string;
  icon?: string;
}

export const Button = ({
  type = BUTTON_TYPE.share,
  title,
  icon,
}: ButtonProps) => {
  return (
    <button className={`button ${type}`}>
      {icon && <img src={icon} alt="icon button" className="button__icon" />}
      {title}
    </button>
  );
};
