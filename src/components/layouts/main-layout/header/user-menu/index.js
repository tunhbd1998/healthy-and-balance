import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDataFromLocalStorage } from "../../../../../utils";
import { connect } from "react-redux";
import { get } from "lodash";
import "./user-menu.styles.scss";

function UserMenu({ user }) {
  const defaultAvatar = "/media/images/users/placeholder.png";

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Avatar />
  ));

  const Avatar = () => (
    <img
      className="hb-avatar"
      src={user.avatar || defaultAvatar}
      alt="avatar"
    />
  );

  return user ? (
    <div className="hb-user-menu">
      <Dropdown>
        <Dropdown.Toggle>
          <Avatar />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link className="user-menu--menu-item" to="/me">
              Thông tin tài khoản
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link className="user-menu--menu-item" to="/me/manage-post">
              Quản lý bài viết cá nhân
            </Link>
          </Dropdown.Item>
          {user.role === "admin" ? (
            <Dropdown.Item>
              <Link className="user-menu--menu-item" to="/admin/dashboard">
                Quản lý bài viết cá nhân
              </Link>
            </Dropdown.Item>
          ) : null}
          <Dropdown.Item>Đăng xuất</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    <Link to="/sign-in">
      <img className="hb-avatar" src={defaultAvatar} alt="avatar" />
    </Link>
  );
}

const mapStateToProps = state => ({
  user: get(state, "user"),
});

export default connect(mapStateToProps, null)(UserMenu);
