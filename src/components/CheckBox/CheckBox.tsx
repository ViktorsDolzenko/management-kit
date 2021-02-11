import React, { useEffect, useState } from "react";

import "./checkbox.scss";
import { auth } from "../../firebase";

interface checkboxType {
  id: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckBox = ({ id, isChecked, onChange }: checkboxType) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <div className="checkbox">
      <input
        className="checkbox__input"
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(evt) => onChange(evt.target.checked)}
        disabled={!currentUser?.emailVerified}
      />
      <label htmlFor={id} />
    </div>
  );
};
