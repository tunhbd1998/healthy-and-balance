import React from "react";
import PostItem from "./post-item";
import "./post-list.styles.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get } from "lodash";
import { showPostDetail } from "../../../store/actions";
import NotFound from "../../commons/not-found";

function PostList({ actions, posts, title }) {
  return (
    <div className="hb-post-list">
      <div className="title">{title}</div>
      <div className="content">
        {posts.length === 0 ? (
          <NotFound message="Không tìm được bài viết nào" />
        ) : null}
        {posts.map(post => (
          <PostItem
            key={post.id}
            post={post}
            onClick={() => actions.showPostDetail(post)}
          />
        ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      showPostDetail
    },
    dispatch
  )
});

export default connect(null, mapDispatchToProps)(PostList);
