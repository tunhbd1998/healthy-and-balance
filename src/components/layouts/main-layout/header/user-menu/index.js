import React from "react";
import { Dropdown,Popover,OverlayTrigger,ListGroup } from "react-bootstrap";
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
  faBell
} from "@fortawesome/free-solid-svg-icons";
const defaultAvatar = "/media/images/users/placeholder.png";
const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h5" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div>Thông báo</div>
      <div style={{fontSize:'12px',color:'#4aa112',cursor:'pointer'}}>Đánh dấu đã đọc</div>
    </Popover.Title>
    <Popover.Content style={{padding:'0px'}}>
      <div className='itemNoti' style={{display:'flex',alignItems:'center',cursor:'pointer',marginBottom:'10px'}}>
        <div className='avatarItem' style={{marginRight:'5px'}}>
          <Avatar url={defaultAvatar} size="big" />
        </div>
        <div className='contentItem'>
          <div className='usernameComment'>
            <b>phhviet</b> <i>đã bình luận bài viết của bạn</i>
          </div>
          <div className='timeAgo' style={{fontSize:'12px',color:'#255852',textAlign:'right',marginRight:'5px'}}>
            <i>1 giờ trước</i>
          </div>
        </div>
      </div>
      <div className='itemNoti unread' style={{display:'flex',alignItems:'center',cursor:'pointer',marginBottom:'10px'}}>
        <div className='avatarItem' style={{marginRight:'5px'}}>
          <Avatar url={defaultAvatar} size="big" />
        </div>
        <div className='contentItem'>
          <div className='usernameComment'>
            <b>phhviet</b> <i>đã bình luận bài viết của bạn</i>
          </div>
          <div className='timeAgo' style={{fontSize:'12px',color:'#255852',textAlign:'right',marginRight:'5px'}}>
            <i>1 giờ trước</i>
          </div>
        </div>
      </div>
    
    </Popover.Content>
  </Popover>
);

function UserMenu({ user, actions }) {
  

  return user ? (
    <>
      <div className="hb-user-menu">

        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
          <div className='notification'>
            <div className='customNoti' pill>1</div>
            <FontAwesomeIcon icon={faBell} className='icon-down'/>
          </div>
        </OverlayTrigger>
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
    </>
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
