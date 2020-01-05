import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { get } from "lodash";
import DataTableComponent from "../../../../commons/table/DataTableComponent";
import ComboBox from "../../../../commons/combo-box";
import Button2 from "../../../../commons/button-style2";
import ic_add from "./ic_add.svg";
import Image from "../../../../commons/image";
import PagingControl from "../../../../commons/paging-control";
import MainLayout from "../../../../layouts/main-layout";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage
} from "../../../../../utils";
import DialogAddPost from "./dialog-add-post";
import Dialog from "../../../../commons/dialog";
import DialogEditPost from "./dialog-edit-post";
import PostDetail from "../../../../commons/post-detail";
import {
  alertNotification,
  showPostDetail,
  hidePostDetail
} from "../../../../../store/actions";
import SearchBox from "../../../../commons/search-box";
import "./manage-posts.styles.scss";

class DashboardComponent extends React.Component {
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
      maxItems: 10,
      currentPage: 1,
      searchText: "",
      removeId: "",
      showDialogWarning: false,
      showDialogUpdate: false,
      postUpdate: undefined,
      postSelected: undefined
    };
  }

  componentDidMount() {
    this.loadData();
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
      ]
    });
  }

  onRemove(e, id) {
    e.stopPropagation();
    this.setState({
      removeId: id,
      showDialogWarning: true
    });
  }

  onRemoveAccpet() {
    const { maxItems } = this.state;
    let { currentPage } = this.state;
    const { originPosts, removeId } = this.state;
    const posts = [];
    originPosts.forEach(v => {
      if (v.id !== removeId) {
        posts.push(v);
      }
    });
    saveDataToLocalStorage("posts", JSON.stringify(posts));
    if ((currentPage - 1) * maxItems <= posts.length && currentPage !== 1) {
      currentPage--;
    }
    this.setState({
      removeId: -1,
      showDialogWarning: false,
      originPosts: posts,
      posts: posts,
      currentPage: currentPage
    });
    // this.showNotification("Xóa bài viết thành công", "success");
  }

  onRemoveCancel() {
    this.setState({
      removeId: -1,
      showDialogWarning: false
    });
  }

  onEdit(e, id) {
    e.stopPropagation();
    const { originPosts } = this.state;
    let post = undefined;
    originPosts.forEach(v => {
      if (v.id === id) {
        post = v;
        return;
      }
    });

    this.setState({
      showDialogUpdate: true,
      postUpdate: post
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

  onButtonAddPoster() {
    this.setState({
      showDialogAddPoster: true
    });
  }

  onDialogAddClose() {
    this.setState({
      showDialogAddPoster: false
    });
    this.loadData();
  }

  onDialogUpdateClose() {
    this.setState({
      showDialogUpdate: false
    });
    this.loadData();
  }

  onDetailPostClose() {
    this.setState({
      postSelected: undefined
    });
  }

  onItemTableClick(post) {
    // this.setState({
    //   postSelected: post
    // });
    console.log("post", post);
    this.props.actions.showPostDetail(post);
  }

  showNotification(message, type) {
    // const { dispatch } = this.props;
    // dispatch(alertNotification(type, message));
  }

  render() {
    const {
      posts,
      header,
      categories,
      status,
      maxItems,
      currentPage,
      showDialogAddPoster,
      showDialogWarning,
      showDialogUpdate,
      postUpdate,
      postSelected
    } = this.state;
    const { post } = this.props;

    const buttonDialogWarining = [
      {
        type: "danger",
        label: "Không",
        onClick: () => this.onRemoveCancel()
      },
      {
        type: "primary",
        label: "Có",
        onClick: () => this.onRemoveAccpet()
      }
    ];
    const contentDialogWarning = "Bạn có muốn xóa bài viết?";

    return (
      // <MainLayout
      //   haveLeftSidebar={false}
      //   menuItems={[]}
      //   title="Quản lý bài viết cá nhân"
      // >
      <>
        <DialogAddPost
          // showNotification={(message, type) =>
          //   this.showNotification(message, type)
          // }
          show={showDialogAddPoster}
          onCloseDialog={() => this.onDialogAddClose()}
        />
        <DialogEditPost
          // showNotification={(message, type) =>
          //   this.showNotification(message, type)
          // }
          post={postUpdate}
          show={showDialogUpdate}
          onCloseDialog={() => this.onDialogUpdateClose()}
        />
        <Dialog
          show={showDialogWarning}
          buttons={buttonDialogWarining}
          messageContent={contentDialogWarning}
          onClickCloseButton={() => this.onRemoveCancel()}
        />
        {/* {post ? (
          <PostDetail
            post={post}
            onClose={() => this.props.actions.hidePostDetail()}
          />
        ) : null} */}
        <div className="dashboard">
          <div>
            <div className="title">Quản lý bài viết</div>
            {/* <div className="search-input">
                                <SearchInput
                                    placeHolder="Tìm kiếm"
                                    onChange={(e) => this.onTextSearchChange(e)}
                                    onSearch={(e) => this.onSearch(e)}
                                    searchText={searchText} />
                            </div> */}
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
              </div>
              <div>
                <Button2
                  children={
                    <>
                      <Image src={ic_add} disable />
                      Thêm bài viết
                    </>
                  }
                  onClick={() => this.onButtonAddPoster()}
                />
              </div>
            </div>
            <DataTableComponent
              maxItems={maxItems}
              currentPage={currentPage}
              posts={posts}
              header={header}
              categories={categories}
              onRemove={(e, id) => this.onRemove(e, id)}
              onEdit={(e, id) => this.onEdit(e, id)}
              onItemClick={post => this.onItemTableClick(post)}
            />
          </div>
          <div className="footer">
            <PagingControl
              onNext={() => this.nextPage()}
              onPrev={() => this.prevPage()}
              maxPage={
                Math.floor(posts.length / maxItems) === posts.length / maxItems
                  ? Math.floor(posts.length / maxItems)
                  : Math.floor(posts.length / maxItems) + 1
              }
              currentPage={currentPage}
            />
          </div>
        </div>
      </>
      // </MainLayout>
    );
  }
}

export default connect(
  state => ({ post: get(state, "post") }),
  dispatch => ({
    actions: bindActionCreators({ showPostDetail, hidePostDetail }, dispatch)
  })
)(DashboardComponent);
