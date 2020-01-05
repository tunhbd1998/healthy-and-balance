import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComment from "../comment-form/index";
import {
  faComment,
  faBookmark,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { get } from "lodash";
import * as moment from "moment";
import {
  addPostComment,
  likePostComment,
  unLikePostComment
} from "../../../store/actions";
import { bindActionCreators } from "redux";

const CommentViewer = ({ author, createdDate, content }) => {
  console.log("create", createdDate);
  return (
    <>
      <div className="user-account">
        <span className="username">{author.displayName}</span>
        <span className="time">{moment(createdDate).fromNow()}</span>
      </div>
      <div className="content-comment">{content}</div>
    </>
  );
};

const ItemComment = ({ user, comment, post, actions, commentFilter }) => {
  const [reactLove, setReactLove] = React.useState(
    (get(user, ["likeComments"]) || []).findIndex(id => id === comment.id) > -1
  );
  const [openComment, setOpenComment] = React.useState(false);
  const toggleLove = () => {
    if (reactLove) {
      actions.unLikePostComment(comment.id);
    } else {
      actions.likePostComment(comment.id);
    }

    setReactLove(!reactLove);
  };

  const toggleComment = () => {
    setOpenComment(!openComment);
  };

  const onCloseComment = () => {
    setOpenComment(false);
  };

  return (
    <div className="for-item-comment">
      {/* <div className="user-account">
        <span className="username">{comment.author.displayName}</span>
        <span className="time">{moment(comment.createdDate).fromNow()}</span>
      </div>
      <div className="content-comment">{comment.content}</div> */}
      <CommentViewer
        author={comment.author}
        createdDate={comment.createdDate}
        content={comment.content}
      />

      <div className="react-comment">
        <div
          className={`general-item love ${reactLove ? "active" : ""}`}
          onClick={() => post.status === 1 && user && toggleLove()}
        >
          <FontAwesomeIcon icon={faHeart} className={`icon-comment`} />
          <div className="description total-love">{comment.likes}</div>
        </div>
        {post.status === 1 && user ? (
          <div
            className={`general-item reply ${openComment ? "active" : ""}`}
            onClick={toggleComment}
          >
            <FontAwesomeIcon icon={faComment} className="icon-comment" />
            <div className="description reply">Trả lời</div>
          </div>
        ) : null}
      </div>

      <div className="wrap-reply">
        {post.status === 1 && openComment && commentFilter === "desc" ? (
          <FormComment
            hasReply={true}
            // onClick={onCloseComment}
            onSubmit={content => {
              actions.addPostComment(post.id, content, user, comment.id);
            }}
            className="replyForm"
          />
        ) : null}
        {(comment.children || []).map((cmt, index) => (
          <CommentViewer
            key={cmt.id || index}
            content={cmt.content}
            createdDate={cmt.createdDate}
            author={cmt.author}
          />
        ))}
        {/* <div className="user-account">
          <span className="username">nvphuoc</span>
          <span className="time">14 giờ trước</span>
        </div>
        <div className="content-comment">
          asdaskdjasdkj asdaskdjasdkj asdaskdjasdkj
        </div> */}
        {post.status === 1 && openComment && commentFilter === "asc" ? (
          <FormComment
            hasReply={true}
            // onClick={onCloseComment}
            onSubmit={content => {
              actions.addPostComment(post.id, content, user, comment.id);
            }}
            className="replyForm"
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: get(state, "user"),
  post: get(state, "post"),
  commentFilter: get(state, "commentFilter")
});

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators(
    { addPostComment, likePostComment, unLikePostComment },
    dispatch
  )
}))(ItemComment);
