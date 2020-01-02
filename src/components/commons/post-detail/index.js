import React from "react";
import { Modal } from "react-bootstrap";
import "./post-detail.styles.scss";
import * as moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBookmark,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { Fade } from "react-reveal";
import CategoryLabel from "../category-label";
import {
  getCategoryTitle,
  getUserByUsername,
  isPostInUserMarks,
  isPostInUserFollowings,
  removeMarkedPost,
  addMarkedPost,
  removeFollowingUsers,
  addFollowingUsers
} from "../../../utils";
import AuthorLabel from "../author-label";
import { connect } from "react-redux";
import { get } from "lodash";
import { bindActionCreators } from "redux";
// import { setUser } from "../../../store/actions";

function PostDetail({ post, onClose, user, actions }) {
  const [show, setShow] = React.useState(true);

  if (!post) {
    return null;
  }

  const author = getUserByUsername(post.author);
  console.log("useruser", user);
  const toggleBookmark = () => {
    console.log("bbbbb");
    if (isPostInUserMarks(user.username, post.id)) {
      console.log("rm bk");
      actions.setUser({
        ...user,
        markedPosts: removeMarkedPost(user.username, post.id)
      });
    } else {
      console.log("add bk");
      actions.setUser({
        ...user,
        markedPosts: addMarkedPost(user.username, post.id)
      });
    }
  };

  const toggleFollowing = () => {
    // if (isPostInUserFollowings(user.username, post.author)) {
    //   actions.setUser({
    //     ...user,
    //     followingUsers: removeFollowingUsers(user.username, post.author)
    //   });
    // } else {
    //   actions.setUser({
    //     ...user,
    //     followingUsers: addFollowingUsers(user.username, post.author)
    //   });
    // }
  };

  return (
    <Modal show={show} className="hb-post-detail">
      <Fade duration={450} right className="fade" style={{ height: "100%" }}>
        <Modal.Body className="content">
          <div
            className="close-button"
            onClick={() => {
              setShow(false);
              onClose && onClose();
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="detail-container">
            <div className="detail-header">
              <div className="item">
                <CategoryLabel title={getCategoryTitle(post.category)} />
                {user ? (
                  <FontAwesomeIcon
                    className={`icon ${
                      user.markedPosts &&
                      isPostInUserMarks(user.username, post.id)
                        ? "active"
                        : ""
                    }`}
                    icon={faBookmark}
                    onClick={toggleBookmark}
                  />
                ) : null}
              </div>
              <div className="item">
                {user ? (
                  <FontAwesomeIcon
                    className={`icon ${
                      isPostInUserFollowings(user.username, post.author)
                        ? "active"
                        : ""
                    }`}
                    icon={faHeart}
                    onClick={toggleFollowing}
                  />
                ) : null}

                <AuthorLabel user={getUserByUsername(post.author)} />
                <span className="created-date">
                  {moment(post.createdDate).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
            </div>
            <div className="detail-content">
              <div className="post-title">{post.title}</div>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              >
                {/* {post.content} */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Fade>
    </Modal>
  );
}

const mapStateToProps = state => ({
  user: get(state, "user")
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
