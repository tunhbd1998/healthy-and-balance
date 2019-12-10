import React from "react";
import "../button/button.styles.scss";

const BUTTON_TYPE = {
  PRIMARY: "primary",
  DANGER: "danger",
  SECONDARY: "secondary",
};

export default function Label({ children, type }) {
  return (
    <div
      className={`hb-button hb-button-${type || BUTTON_TYPE.PRIMARY}`}>
      {children}
    </div>
  );
}