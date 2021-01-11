import React from "react";
import { buttonProps } from "./buttonProps";
import "../../scss/button.scss";

interface customButtonType {
  type: buttonProps;
  title?: string;
}

export const CustomButton = ({ type, title }: customButtonType) => {
  return <button className={`custom-button ${type}`}>{title}</button>;
};
