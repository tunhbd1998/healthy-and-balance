import React from "react";
import "./author-label.styles.scss";

export default function AuthorLabel({ user }) {
  const defaultAvatar = "/media/images/users/placeholder.png";

  return user ? (
    <div className="hb-author-label">
      <img className="avatar" src={user.avatar || defaultAvatar} alt="avatar" />
      <span>{user.displayName}</span>
    </div>
  ) : null;
}
