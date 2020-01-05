import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withPageTitle } from "../../../../hoc/with-page-title.hoc";

const ManageUsers = Loadable({
  loader: () => import("./manage-users"),
  loading: () => "Loading"
});

const ManagePosts = Loadable({
  loader: () => import("./manage-posts"),
  loading: () => "Loading"
});

const ManageCategory = Loadable({
  loader: () => import("./manage-categories"),
  loading: () => "Loading"
});

export default function AdminPage() {
  return (
    // <Router>
    <Switch>
      <Route
        path="/admin/dashboard/users"
        component={withPageTitle(ManageUsers, "Quản lý người dùng")}
      />
      <Route
        path="/admin/dashboard/posts"
        component={withPageTitle(ManagePosts, "Quản lý bài viết")}
      />
      <Route
        path="/admin/dashboard/categories"
        component={withPageTitle(ManageCategory, "Quản lý chuyên mục")}
      />
    </Switch>
    // </Router>
  );
}
