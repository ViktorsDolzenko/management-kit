import React from "react";
import { TAG_TYPE } from "./tagProps";
import "./tag.scss";

interface tagProps {
  type?: TAG_TYPE;
  title?: string;
}

export const Tag = ({ type, title }: tagProps) => {
  return <span className={`tag ${type}`}>{title}</span>;
};
