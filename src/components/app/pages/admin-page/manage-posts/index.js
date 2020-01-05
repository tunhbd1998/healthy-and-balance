import React from "react";
import DataTableComponent from "../../../../commons/table/DataTableComponent";
import ComboBox from "../../../../commons/combo-box";
import { connect } from "react-redux";
import "./poster-manage.scss";
import PagingControl from "../../../../commons/paging-control";
import MainLayout from "../../../../layouts/main-layout";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  notify
} from "../../../../../utils";
import Dialog from "../../../../commons/dialog";
import PostDetail from "../../../../commons/post-detail";
import SearchBox from "../../../../commons/search-box";
import {
  alertNotification,
  setCurrentLeftSidebarItem
} from "../../../../../store/actions";
import { bindActionCreators } from "redux";

class PosterManageAdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      originPosts: [],
      header: [
        "Tên bài viết",
        "Ngày tạo",
        "Chuyên mục",
        "Trạng thái",
        "Thao tác"
      ],
      categories: [],
      status: [],
      sortConditions: [],
      maxItems: 10,
      currentPage: 1,
      searchText: "",
      idUpdate: "",
      postSelected: undefined,
      idPostUpdate: undefined,
      showDialogWarningAccpetPost: false,
      showDialogWarningDenyPost: false
    };
  }

  componentDidMount() {
    this.loadData();
    this.props.actions.setCurrentLeftSidebarItem(1);
  }

  loadData() {
    const posts = JSON.parse(getDataFromLocalStorage("posts"));

    let categories = [];
    categories.push({
      id: "all",
      title: "Tất cả"
    });
    // eslint-disable-next-line array-callback-return
    JSON.parse(getDataFromLocalStorage("categories")).map(v => {
      categories.push(v);
    });
    this.setState({
      originPosts: posts,
      posts: posts,
      categories: categories,
      status: [
        {
          id: 2,
          title: "Tất cả"
        },
        {
          id: -1,
          title: "Bị từ chối"
        },
        {
          id: 0,
          title: "Chờ duyệt"
        },
        {
          id: 1,
          title: "Đã duyệt"
        }
      ],
      sortConditions: [
        {
          id: 1,
          title: "Thời gian tăng dần"
        },
        {
          id: 2,
          title: "Thời gian giảm dần"
        }
      ]
    });
  }

  nextPage() {
    const { state } = this;
    this.setState({
      currentPage: state.currentPage++,
      ...state
    });
  }

  prevPage() {
    const { state } = this;
    this.setState({
      currentPage: state.currentPage--,
      ...state
    });
  }

  filterStatus(e) {
    const { state } = this;
    const { originPosts } = state;
    const { value } = e.target;
    let posts = [];
    // eslint-disable-next-line eqeqeq
    if (value == 2) {
      posts = originPosts;
    } else {
      originPosts.forEach(v => {
        // eslint-disable-next-line eqeqeq
        if (v.status == value) {
          posts.push(v);
        }
      });
    }
    this.setState({
      ...state,
      posts: posts
    });
  }

  filterCategory(e) {
    const { state } = this;
    const { originPosts } = state;
    const { value } = e.target;
    let posts = [];

    if (value === "all") {
      posts = originPosts;
    } else {
      // eslint-disable-next-line array-callback-return
      originPosts.forEach(v => {
        if (v.category === value) {
          posts.push(v);
        }
      });
    }
    this.setState({
      ...state,
      posts: posts
    });
  }

  sort(e) {
    const { state } = this;
    const { posts } = state;
    const { value } = e.target;
    let postsNew = posts.sort((a, b) => {
      // eslint-disable-next-line eqeqeq
      if (value == 1) {
        // tăng dần
        return Date.parse(a.createdDate) - Date.parse(b.createdDate);
      } else {
        // giảm dần
        return Date.parse(b.createdDate) - Date.parse(a.createdDate);
      }
    });
    this.setState({
      ...state,
      posts: postsNew
    });
  }

  onTextSearchChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  onSearch() {
    const { originPosts, searchText } = this.state;

    let posts = [];
    if (searchText === "") {
      this.setState({
        searchText: "",
        posts: originPosts
      });
      return;
    }

    originPosts.forEach(v => {
      if (v.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
        posts.push(v);
      }
    });

    this.setState({
      searchText: "",
      posts
    });
  }

  onDetailPostClose() {
    this.setState({
      postSelected: undefined
    });
  }

  onItemTableClick(post) {
    this.setState({
      postSelected: post
    });
  }

  onAcceptPostRequest(e, idPost) {
    e.stopPropagation();
    this.setState({
      showDialogWarningAccpetPost: true,
      idPostUpdate: idPost
    });
  }

  onAcceptPost() {
    const { idPostUpdate } = this.state;
    const posts = JSON.parse(getDataFromLocalStorage("posts"));
    const newPosts = [];
    posts.forEach(v => {
      if (v.id === idPostUpdate) {
        newPosts.push({
          ...v,
          status: 1
        });
      } else {
        newPosts.push(v);
      }
    });
    saveDataToLocalStorage("posts", JSON.stringify(newPosts));
    this.loadData();
    this.setState({
      showDialogWarningAccpetPost: false,
      idPostUpdate: -1
    });

    notify("success", "Đã duyệt bài viết");

    // this.showNotification("Chấp nhận bài viết thành công", "success");
  }

  onAcceptPostCancel() {
    this.setState({
      showDialogWarningAccpetPost: false,
      idPostUpdate: -1
    });
  }

  onDenyPostRequest(e, idPost) {
    e.stopPropagation();
    this.setState({
      showDialogWarningDenyPost: true,
      idPostUpdate: idPost
    });
  }

  onDenyPost() {
    const { idPostUpdate } = this.state;
    const posts = JSON.parse(getDataFromLocalStorage("posts"));
    const newPosts = [];
    posts.forEach(v => {
      if (v.id === idPostUpdate) {
        newPosts.push({
          ...v,
          status: -1
        });
      } else {
        newPosts.push(v);
      }
    });
    saveDataToLocalStorage("posts", JSON.stringify(newPosts));
    this.loadData();
    this.setState({
      showDialogWarningDenyPost: false,
      idPostUpdate: -1
    });

    notify("success", "Từ chối bài viết thành công");
    // this.showNotification("", "success");
  }

  onDenyPostCancel() {
    this.setState({
      showDialogWarningDenyPost: false,
      idPostUpdate: -1
    });
  }

  showNotification(message, type) {
    const { dispatch } = this.props;
    // dispatch(alertNotification(type, message));
  }

  render() {
    const {
      posts,
      header,
      categories,
      sortConditions,
      status,
      maxItems,
      currentPage,
      showDialogWarningAccpetPost,
      showDialogWarningDenyPost,
      postSelected
    } = this.state;

    const buttonDialogWariningAccpetPost = [
      {
        type: "danger",
        label: "Không",
        onClick: () => this.onAcceptPostCancel()
      },
      {
        type: "primary",
        label: "Có",
        onClick: () => this.onAcceptPost()
      }
    ];
    const contentDialogWariningAccpetPost = "Bạn có muốn duyệt bài viết?";

    const buttonDialogWariningDenyPost = [
      {
        type: "danger",
        label: "Không",
        onClick: () => this.onDenyPostCancel()
      },
      {
        type: "primary",
        label: "Có",
        onClick: () => this.onDenyPost()
      }
    ];
    const contentDialogWariningDenyPost = "Bạn có muốn từ chối bài viết?";

    const menuItems = [
      {
        id: 1,
        title: "Quản lý bài viết",
        url: "/admin/dashboard/posts"
      },
      {
        id: 2,
        title: "Quản lý người dùng",
        url: "/admin/dashboard/users"
      },
      {
        id: 3,
        title: "Quản lý chuyên mục",
        url: "/admin/dashboard/categories"
      }
    ];
    return (
      <MainLayout
        haveLeftSidebar={true}
        menuItems={menuItems}
        onClickItem={() => {}}
        title="Quản lý bài viết"
      >
        <>
          {postSelected !== undefined ? (
            <PostDetail
              post={postSelected}
              onClose={() => this.onDetailPostClose()}
            />
          ) : null}
          <Dialog
            show={showDialogWarningAccpetPost}
            buttons={buttonDialogWariningAccpetPost}
            messageContent={contentDialogWariningAccpetPost}
            onClickCloseButton={() => this.onAcceptPostCancel()}
          />
          <Dialog
            show={showDialogWarningDenyPost}
            buttons={buttonDialogWariningDenyPost}
            messageContent={contentDialogWariningDenyPost}
            onClickCloseButton={() => this.onDenyPostCancel()}
          />
          <div className="dashboard">
            <div>
              <div className="title">Quản lý bài viết</div>
              <SearchBox
                onChange={e => this.onTextSearchChange(e)}
                onEnter={() => this.onSearch()}
              />
              <div className="control-tool">
                <div className="group-one">
                  <ComboBox
                    items={status}
                    label={"Trạng thái"}
                    onChange={e => this.filterStatus(e)}
                  />
                  <ComboBox
                    items={categories}
                    label={"Chuyên mục"}
                    onChange={e => this.filterCategory(e)}
                  />
                  <ComboBox
                    items={sortConditions}
                    label={"Sắp xếp"}
                    onChange={e => this.sort(e)}
                  />
                </div>
              </div>
              <DataTableComponent
                maxItems={maxItems}
                currentPage={currentPage}
                posts={posts}
                header={header}
                categories={categories}
                onAccept={(e, id) => this.onAcceptPostRequest(e, id)}
                onDeny={(e, id) => this.onDenyPostRequest(e, id)}
                onItemClick={post => this.onItemTableClick(post)}
                type="admin"
              />
            </div>
            <div className="footer">
              <PagingControl
                onNext={() => this.nextPage()}
                onPrev={() => this.prevPage()}
                maxPage={
                  Math.floor(posts.length / maxItems) ===
                  posts.length / maxItems
                    ? Math.floor(posts.length / maxItems)
                    : Math.floor(posts.length / maxItems) + 1
                }
                currentPage={currentPage}
              />
            </div>
          </div>
        </>
      </MainLayout>
    );
  }
}

export default connect(null, dispatch => ({
  actions: bindActionCreators({ setCurrentLeftSidebarItem }, dispatch)
}))(PosterManageAdminComponent);
