import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { saveDataToLocalStorage } from "../../../../../utils";
import { connect } from "react-redux";
import { get } from "lodash";
import "./user-menu.styles.scss";
import Avatar from "../../../../commons/avatar";
import { signOut } from "../../../../../store/actions";
import { bindActionCreators } from "redux";

function UserMenu({ user, actions }) {
  const defaultAvatar = "/media/images/users/placeholder.png";

  return user ? (
    <div className="hb-user-menu">
      <Dropdown>
        <Dropdown.Toggle>
          <Avatar url={user.avatar || defaultAvatar} size="big" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-menu">
          <div className="user-info">
            <Avatar url={user.avatar || defaultAvatar} size="big" />
            <div className="info">
              <span>{user.displayName}</span>
              <span>{user.email}</span>
            </div>
          </div>
          <Link className="user-menu--menu-item" to="/me">
            Thông tin tài khoản
          </Link>
          <Link className="user-menu--menu-item" to="/me/manage-post">
            Quản lý bài viết cá nhân
          </Link>
          {user.role === "admin" ? (
            <Link className="user-menu--menu-item" to="/admin/dashboard">
              Quản lý hệ thống
            </Link>
          ) : null}
          <Link
            to="#"
            className="user-menu--menu-item"
            onClick={() => {
              actions.signOut();
              saveDataToLocalStorage("user", null);
            }}
          >
            Đăng xuất
          </Link>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signOut }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
