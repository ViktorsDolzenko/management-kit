import React from "react";
import "./file.scss";
import base from "./images/Base.png";

export const File = () => {
  return (
    <div className="file">
      <img className="file__img" alt="file-img" src={base} />
      <span className="file__title">Redesign Brief.png</span>
      <div className="file__misc">
        <span className="file__misc_size">159 kb</span>
        <span className="file__misc_delete">Delete</span>
      </div>
    </div>
  );
};
