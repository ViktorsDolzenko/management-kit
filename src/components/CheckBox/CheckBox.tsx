import React from "react";

import "./checkbox.scss";

interface checkboxType {
  id: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckBox = ({ id, isChecked, onChange }: checkboxType) => {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(evt) => onChange(evt.target.checked)}
      />
      <label htmlFor={id} />
    </div>
  );
};
