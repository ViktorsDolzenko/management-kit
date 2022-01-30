import React from "react";

import { BUTTON_STYLE, BUTTON_TYPE } from "./buttonProps";

import "./button.scss";
import { useTranslation } from "react-i18next";

interface ButtonProps {
  category?: BUTTON_STYLE;
  title?: string;
  icon?: string;
  titleIcon?: React.ReactNode;
  onClick?: () => void;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  type?: BUTTON_TYPE;
}

export const Button = ({
    category = BUTTON_STYLE.Default,
    title,
    icon,
    titleIcon,
    onClick,
    onMouseLeave,
    type,
    onMouseEnter
}: ButtonProps) => {
    const { t } = useTranslation();

    return (
        <button
            className={`button button_${category}`}
            onClick={onClick}
            // @ts-ignore
            type={type}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
        >
            {icon && <img src={icon} alt="icon button" className="button__icon" />}
            {title === '' ? title : t(`phrases.${title}`)}
            {titleIcon}
        </button>
    );
};
