import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./home.styles.scss";
import PostList from "./post-list";
// import { fetchPostsByCategory, fetchPostsBySearch } from "../../utils";
import {
  fetchCategories,
  fetchPostsByCategory,
  fetchPostsBySearchContent,
  setSearchContent,
  hidePostDetail,
} from "../../store/actions";
import { connect } from "react-redux";
import { get } from "lodash";
import { bindActionCreators } from "redux";
import PostDetail from "../commons/post-detail";

function Home({ actions, categories, currentItem, searchContent, post }) {
  const searchInput = React.useRef(null);
  const getCategories = () => {
    actions.fetchCategories();
  };

  !categories && getCategories();

  return (
    <MainLayout
      haveLeftSidebar={true}
      menuItems={categories || []}
      onClickItem={() => {
        actions.fetchPostsByCategory();
      }}
    >
      <Container fluid className="hb-home">
        <Container fluid className="search-box-container">
          <div className="search-box">
            <input
              ref={searchInput}
              placeholder="Tìm kiếm"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  actions.setSearchContent(searchInput.current.value);
                  actions.fetchPostsBySearchContent();
                }
              }}
            />
            <FontAwesomeIcon className="icon" icon={faSearch} />
          </div>
        </Container>
        <Router>
          <Switch>
            <Route push path="/" exact>
              <PostList />
            </Route>
            <Route push path="/category/:id">
              <PostList />
            </Route>
            <Route path="/search/:searchContent">
              <PostList />
            </Route>
          </Switch>
        </Router>
        {post ? (
          <PostDetail post={post} onClose={() => actions.hidePostDetail()} />
        ) : null}
      </Container>
    </MainLayout>
  );
}

const mapStateToProps = state => ({
  categories: get(state, "categories"),
  currentItem: get(state, "currentItem"),
  searchContent: get(state, "searchContent"),
  post: get(state, "post"),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchCategories,
      fetchPostsByCategory,
      fetchPostsBySearchContent,
      setSearchContent,
      hidePostDetail,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
