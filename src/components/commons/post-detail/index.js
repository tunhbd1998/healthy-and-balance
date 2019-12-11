import React from "react";
import { Modal } from "react-bootstrap";
import "./post-detail.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBookmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Fade } from "react-reveal";
import CategoryLabel from "../category-label";
import {
  getCategoryTitle,
  getUserByUsername,
  isPostInUserMarks,
  isPostInUserFollowings,
} from "../../../utils";
import AuthorLabel from "../author-label";
import { connect } from "react-redux";
import { get } from "lodash";

export default function PostDetail({ post, onClose }) {
  const [show, setShow] = React.useState(true);

  if (!post) {
    return null;
  }

  const user = getUserByUsername(post.author);

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
                      isPostInUserMarks(user.username, post.id) ? "active" : ""
                    }`}
                    icon={faBookmark}
                  />
                ) : null}
              </div>
              <div className="item">
                {user ? (
                  <FontAwesomeIcon
                    className={`icon ${
                      isPostInUserFollowings(user.username, post.id)
                        ? "active"
                        : ""
                    }`}
                    icon={faHeart}
                  />
                ) : null}

                <AuthorLabel user={getUserByUsername(post.author)} />
                <span className="created-date">{post.createdDate}</span>
              </div>
            </div>
            <div className="detail-content">
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.content}</div>
            </div>
          </div>
        </Modal.Body>
      </Fade>
    </Modal>
  );
}
