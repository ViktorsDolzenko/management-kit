import React from "react";

import { BUTTON_CATEGORY, BUTTON_TYPE } from "./buttonProps";

import "./button.scss";

interface ButtonProps {
  category?: BUTTON_CATEGORY;
  title?: string;
  icon?: string;
  titleIcon?: React.ReactNode;
  onClick?: () => void;
  type?: BUTTON_TYPE;
}

export const Button = ({
  category = BUTTON_CATEGORY.default,
  title,
  icon,
  titleIcon,
  onClick,
  type,
}: ButtonProps) => {
  return (
    <button
      className={`button button_${category}`}
      onClick={onClick}
      type={type}
    >
      {icon && <img src={icon} alt="icon button" className="button__icon" />}
      {title}
      {titleIcon}
    </button>
  );
};
