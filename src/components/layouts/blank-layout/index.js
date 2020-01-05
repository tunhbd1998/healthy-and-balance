import React from "react";
import "./blank-layout.styles.scss";

export default function BlankLayout({ children }) {
  return <div className="blank-layout hb-scrollbar">{children}</div>;
}
