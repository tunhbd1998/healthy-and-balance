import React from "react";
import { Button as BstButton } from "react-bootstrap";
import "./button.styles.scss";

const BUTTON_TYPE = {
  PRIMARY: "primary",
  DANGER: "danger",
  SECONDARY: "secondary"
};

export default function Button({
  onClick,
  children,
  type,
  className,
  ...props
}) {
  return (
    <BstButton
      onClick={onClick}
      className={`hb-button hb-button-${type ||
        BUTTON_TYPE.PRIMARY} ${className || ""}`}
      {...props}
    >
      {children}
    </BstButton>
  );
}
