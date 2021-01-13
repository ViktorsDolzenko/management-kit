import React from "react";
import { ButtonType } from "./buttonProps";
import "../../scss/button.scss";

interface customButtonType {
  type: ButtonType;
  title?: string;
}

export const CustomButton = ({ type, title }: customButtonType) => {
  return <button className={`custom-button ${type}`}>{title}</button>;
};
