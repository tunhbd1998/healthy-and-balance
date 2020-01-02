import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { get } from "lodash";
import { withRouter } from "react-router-dom";
import PostList from "../../../../commons/post-list";
import {
  fetchPostsByCategory,
  setCurrentLeftSidebarItem
} from "../../../../../store/actions";

function PostsByCategory({ posts, currentItemId, actions, match }) {
  // const [fetched, setFetched] = React.useState(false);
  // const [
  //   updatedCurrentLeftSidebarItem,
  //   setUpdatedCurrentLeftSidebarItem
  // ] = React.useState(false);
  const categoryId = get(match, ["params", "categoryId"]);

  console.log("categoryId", categoryId);

  React.useEffect(() => {
    actions.setCurrentLeftSidebarItem(categoryId);

    // if (!fetched) {
    //   setFetched(true);
    //   actions.fetchPostsByCategory(categoryId);
    // }
  });

  React.useEffect(() => {
    actions.fetchPostsByCategory(categoryId);
  }, [currentItemId]);

  return <PostList posts={posts} title="Bài viết" />;
}

export default withRouter(
  connect(
    state => ({
      posts: get(state, "posts"),
      currentItemId: get(state, "currentItemId")
    }),
    dispatch => ({
      actions: bindActionCreators(
        { fetchPostsByCategory, setCurrentLeftSidebarItem },
        dispatch
      )
    })
  )(PostsByCategory)
);
