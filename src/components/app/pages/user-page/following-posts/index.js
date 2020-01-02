import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get } from "lodash";
import PostList from "../../../../commons/post-list";
import {
  fetchFollowingPosts,
  setCurrentLeftSidebarItem
} from "../../../../../store/actions";

function FollowingPosts({ posts, actions }) {
  const [fetched, setFetched] = React.useState(false);
  const [
    updatedCurrentLeftSidebarItem,
    setUpdatedCurrentLeftSidebarItem
  ] = React.useState(false);

  React.useEffect(() => {
    if (!fetched) {
      setFetched(true);
      actions.fetchFollowingPosts();
    }

    if (!updatedCurrentLeftSidebarItem) {
      setUpdatedCurrentLeftSidebarItem(true);
      actions.setCurrentLeftSidebarItem("following");
    }
  });

  return <PostList posts={posts} title="Bạn đang theo dõi" />;
}

export default connect(
  state => ({ posts: get(state, "posts") }),
  dispatch => ({
    actions: bindActionCreators(
      { fetchFollowingPosts, setCurrentLeftSidebarItem },
      dispatch
    )
  })
)(FollowingPosts);
