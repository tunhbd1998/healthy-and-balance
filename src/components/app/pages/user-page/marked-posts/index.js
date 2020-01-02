import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get } from "lodash";
import PostList from "../../../../commons/post-list";
import {
  fetchMarkedPosts,
  setCurrentLeftSidebarItem
} from "../../../../../store/actions";

function MarkedPosts({ posts, actions }) {
  const [fetched, setFetched] = React.useState(false);
  const [
    updatedCurrentLeftSidebarItem,
    setUpdatedCurrentLeftSidebarItem
  ] = React.useState(false);

  React.useEffect(() => {
    if (!fetched) {
      setFetched(true);
      actions.fetchMarkedPosts();
    }

    if (!updatedCurrentLeftSidebarItem) {
      setUpdatedCurrentLeftSidebarItem(true);
      actions.setCurrentLeftSidebarItem("marked");
    }
  });

  return <PostList posts={posts} title="Bạn đã đánh dấu" />;
}

export default connect(
  state => ({ posts: get(state, "posts") }),
  dispatch => ({
    actions: bindActionCreators(
      { fetchMarkedPosts, setCurrentLeftSidebarItem },
      dispatch
    )
  })
)(MarkedPosts);
