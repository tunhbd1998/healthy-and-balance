import React from "react";
import "./avatar.styles.scss";

export default function Avatar({ size, url }) {
  return <img src={url} className={`hb-common-avatar ${size}`} alt="avatar" />;
}
