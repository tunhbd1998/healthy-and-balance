import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { saveDataToLocalStorage } from "../../../../../utils";
import { connect } from "react-redux";
import { get } from "lodash";
import "./user-menu.styles.scss";
import Avatar from "../../../../commons/avatar";
import { signOut, fetchCategories } from "../../../../../store/actions";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  
} from "@fortawesome/free-solid-svg-icons";

function UserMenu({ user, actions }) {
  const defaultAvatar = "/media/images/users/placeholder.png";

  return user ? (
    <div className="hb-user-menu">
      <Dropdown>
        <Dropdown.Toggle>
          <Avatar url={user.avatar || defaultAvatar} size="big" />
          <FontAwesomeIcon icon={faSortDown} className='icon-down'/>
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-menu">
          <div className="user-info">
            <Avatar url={user.avatar || defaultAvatar} size="big"/>
            <div className="info">
              <span>{user.displayName}</span>
              <span>{user.email}</span>
            </div>
          </div>
          <Dropdown.Item style={{ padding: 0 }}>
            <Link className="user-menu--menu-item" to="/me/profile">
              Thông tin tài khoản
            </Link>
          </Dropdown.Item>
          <Dropdown.Item style={{ padding: 0 }}>
            <Link className="user-menu--menu-item" to="/me/my-posts">
              Quản lý bài viết cá nhân
            </Link>
          </Dropdown.Item>
          {user.role === "admin" ? (
            <Dropdown.Item style={{ padding: 0 }}>
              <Link className="user-menu--menu-item" to="/admin/dashboard">
                Quản lý hệ thống
              </Link>
            </Dropdown.Item>
          ) : null}
          <Link
            to="/"
            className="user-menu--menu-item"
            onClick={() => {
              actions.signOut();
              saveDataToLocalStorage("user", null);
              actions.fetchCategories();
            }}
          >
            Đăng xuất
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    <Link to="/auth/sign-in">
      <img className="hb-avatar" src={defaultAvatar} alt="avatar" />
    </Link>
  );
}

const mapStateToProps = state => ({
  user: get(state, "user")
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signOut, fetchCategories }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
