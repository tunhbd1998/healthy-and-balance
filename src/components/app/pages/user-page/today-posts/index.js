import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get } from "lodash";
import PostList from "../../../../commons/post-list";
import {
  fetchTodayPosts,
  setCurrentLeftSidebarItem
} from "../../../../../store/actions";

function TodayPosts({ posts, actions }) {
  const [fetched, setFetched] = React.useState(false);
  const [
    updatedCurrentLeftSidebarItem,
    setUpdatedCurrentLeftSidebarItem
  ] = React.useState(false);

  React.useEffect(() => {
    if (!fetched) {
      setFetched(true);
      actions.fetchTodayPosts();
    }

    if (!updatedCurrentLeftSidebarItem) {
      setUpdatedCurrentLeftSidebarItem(true);
      actions.setCurrentLeftSidebarItem("new");
    }
  });

  return <PostList posts={posts} title="Bài viết Hôm nay" />;
}

export default connect(
  state => ({ posts: get(state, "posts") }),
  dispatch => ({
    actions: bindActionCreators(
      { fetchTodayPosts, setCurrentLeftSidebarItem },
      dispatch
    )
  })
)(TodayPosts);
