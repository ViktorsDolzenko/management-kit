import React from "react";
import "./checkbox.scss";

interface checkboxType {
  id: string;
}

export const CheckBox = ({ id }: checkboxType) => {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id={id}
        type="checkbox"
        defaultChecked={false}
      />
      <label htmlFor={id} />
    </div>
  );
};
