import React from "react";
import { BUTTON_TYPE } from "./buttonProps";
import "./button.scss";

interface ButtonProps {
  type?: BUTTON_TYPE;
  title?: string;
  icon?: string;
  titleIcon?: React.ReactNode;
}

export const Button = ({
  type = BUTTON_TYPE.default,
  title,
  icon,
  titleIcon,
}: ButtonProps) => {
  return (
    <button className={`button button_${type}`}>
      {icon && <img src={icon} alt="icon button" className="button__icon" />}
      {title}
      {titleIcon}
    </button>
  );
};
