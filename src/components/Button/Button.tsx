import React from "react";
import { BUTTON_CATEGORY, BUTTON_TYPE } from "./buttonProps";
import "./button.scss";

interface ButtonProps {
  category?: BUTTON_CATEGORY;
  title?: string;
  icon?: string;
  titleIcon?: React.ReactNode;
  onClickOpen?: () => void;
  type?: BUTTON_TYPE;
}

export const Button = ({
  category = BUTTON_CATEGORY.default,
  title,
  icon,
  titleIcon,
  onClickOpen,
  type,
}: ButtonProps) => {
  return (
    <button
      className={`button button_${category}`}
      onClick={onClickOpen}
      type={type}
    >
      {icon && <img src={icon} alt="icon button" className="button__icon" />}
      {title}
      {titleIcon}
    </button>
  );
};
