import React from "react";
import { bindActionCreators } from "redux";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { get, isEmpty } from "lodash";
import { withPageTitle } from "../../../../hoc/with-page-title.hoc";
import { shouldAuthenticated } from "../../../../hoc/should-authenticated.hoc";
import MainLayout from "../../../layouts/main-layout";
import SearchBox from "../../../commons/search-box";
import PostDetail from "../../../commons/post-detail";
import {
  fetchCategories,
  fetchPostsByCategory,
  hidePostDetail
} from "../../../../store/actions";

const TodayPosts = Loadable({
  loader: () => import("./today-posts"),
  loading: () => "Loading"
});

const FollowingPosts = Loadable({
  loader: () => import("./following-posts"),
  loading: () => "Loading"
});

const MarkedPosts = Loadable({
  loader: () => import("./marked-posts"),
  loading: () => "Loading"
});

const PostsByCategory = Loadable({
  loader: () => import("./posts-by-category"),
  loading: () => "Loading"
});

const SearchPage = Loadable({
  loader: () => import("./search-page"),
  loading: () => "Loading"
});
const ManageInfo = Loadable({
  loader: () => import("./manager-info"),
  loading: () => 'Loading'
})
const ManagePosts = Loadable({
  loader: () => import("./manage-posts"),
  loading: () => "Loading"
});

function UserPage({ categories, actions, post }) {
  const [fetchedCategories, setFetchedCategories] = React.useState(false);

  React.useEffect(() => {
    if (!fetchedCategories) {
      setFetchedCategories(true);
      actions.fetchCategories();
    }
  });

  console.log("user page");

  return (
    <>
      <Switch>
        <Route path="/me">
          <MainLayout haveLeftSidebar={false}>
            <Route
              path="/me/my-posts"
              component={shouldAuthenticated(
                withPageTitle(ManagePosts, "Bài viết của tôi")
              )}
            />
            <Route 
              path="/me/profile"
              component={shouldAuthenticated(
                withPageTitle(ManageInfo, "Quản lí tài khoản")
              )}
            />
          </MainLayout>
        </Route>
        <Route path="/">
          <MainLayout
            haveLeftSidebar={true}
            commonMenuItems={(categories || []).filter(categ => categ.isCommon)}
            menuItems={(categories || []).filter(categ => !categ.isCommon)}
            onClickItem={() => {
              // actions.fetchPostsByCategory();
            }}
          >
            <Container fluid className="hb-home">
              <SearchBox
                onEnter={value => {
                  if (!isEmpty(value)) {
                    window.location.href = `/search?content=${value}`;
                  }
                }}
              />
              <Switch>
                <Route
                  path="/"
                  exact
                  component={withPageTitle(
                    TodayPosts,
                    "Những bài viết hôm nay"
                  )}
                />
                <Route
                  path="/new"
                  exact
                  component={withPageTitle(
                    TodayPosts,
                    "Những bài viết hôm nay"
                  )}
                />
                <Route
                  path="/following"
                  exact
                  component={shouldAuthenticated(
                    withPageTitle(
                      FollowingPosts,
                      "Những bài viết của các tác giả bạn đang theo dõi"
                    )
                  )}
                />
                <Route
                  path="/marked"
                  exact
                  component={shouldAuthenticated(
                    withPageTitle(MarkedPosts, "Những bài viết bạn đã đánh dấu")
                  )}
                />
                <Route
                  path="/category/:categoryId"
                  component={PostsByCategory}
                />
                <Route
                  path="/search"
                  component={withPageTitle(SearchPage, "Kết quả tìm kiếm")}
                />
                <Route path="/*">Not found</Route>
              </Switch>
              {post ? (
                <PostDetail
                  post={post}
                  onClose={() => actions.hidePostDetail()}
                />
              ) : null}
            </Container>
          </MainLayout>
        </Route>
      </Switch>
    </>
  );
}

export default connect(
  state => ({
    post: get(state, "post"),
    categories: get(state, "categories")
  }),
  dispatch => ({
    actions: bindActionCreators(
      { hidePostDetail, fetchCategories, fetchPostsByCategory },
      dispatch
    )
  })
)(UserPage);
