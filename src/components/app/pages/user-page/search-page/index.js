import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import PostList from "../../../../commons/post-list";
import { fetchPostsBySearchContent } from "../../../../../store/actions";

function SearchPage({ posts, actions, location }) {
  const [searched, setSearched] = React.useState(false);
  const query = queryString.parse(location.search);
  console.log("location", location);

  React.useEffect(() => {
    if (!searched) {
      setSearched(true);
      actions.fetchPostsBySearchContent(query.content || "");
    }
  });
  return (
    <PostList
      posts={posts}
      title={`Kết quả tìm kiếm: ${query.content || ""}`}
    />
  );
}

export default withRouter(
  connect(
    state => ({ posts: get(state, "posts") }),
    dispatch => ({
      actions: bindActionCreators({ fetchPostsBySearchContent }, dispatch)
    })
  )(SearchPage)
);
