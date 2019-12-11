import React from "react";
import PostItem from "./post-item";
import "./post-list.styles.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get } from "lodash";
import {
  resetPosts,
  fetchPostsByCategory,
  fetchPostsBySearchContent,
  showPostDetail,
} from "../../../store/actions";
import NotFound from "../../commons/not-found";

function PostList({
  actions,
  posts,
  currentItem,
  searchContent,
  resetedPosts,
}) {
  return (
    <div className="hb-post-list">
      <div className="title">
        {currentItem && !searchContent
          ? currentItem.title
          : `Kết quả tìm kiếm: ${searchContent}`}
      </div>
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

const mapStateToProps = state => ({
  posts: get(state, "posts"),
  currentItem: get(state, "currentItem"),
  searchContent: get(state, "searchContent"),
  resetedPosts: get(state, "resetedPosts"),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetPosts,
      fetchPostsByCategory,
      fetchPostsBySearchContent,
      showPostDetail,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
