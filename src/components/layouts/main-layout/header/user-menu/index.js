import React from "react";
import { Popover, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDataFromLocalStorage } from "../../../../../utils";

export default function UserMenu(props) {
  const user = JSON.parse(getDataFromLocalStorage("user"));
  const defaultAvatar = "/media/images/users/placeholder.png";

  const Avatar = () => (
    <img
      className="hb-avatar"
      src={user.avatar || defaultAvatar}
      alt="avatar"
    />
  );

  return user ? (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={Avatar} />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    <Link to="/">
      <img className="hb-avatar" src={defaultAvatar} alt="avatar" />
    </Link>
  );
}
