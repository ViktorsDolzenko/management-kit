import React from "react";
import { BUTTON_TYPE } from "./buttonProps";
import "./button.scss";

interface ButtonProps {
  type: BUTTON_TYPE;
  title?: string;
}

export const Button = ({ type, title }: ButtonProps) => {
  return <button className={`custom-button ${type}`}>{title}</button>;
};
