import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DataTableComponent from "../../../../commons/table-user/DataTableComponent";
import SearchInput from "../../../../commons/search";
import PagingControl from "../../../../commons/paging-control";
import Dialog from "../../../../commons/dialog";
import MainLayout from "../../../../layouts/main-layout";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage
} from "../../../../../utils";
import { setCurrentLeftSidebarItem } from "../../../../../store/actions";
import "../manage-posts/poster-manage.scss";
import SearchBox from "../../../../commons/search-box";

class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      originUsers: [],
      header: [
        "Tên tài khoản",
        "Ngày tạo",
        "Trạng thái",
        "Tổng bài viết",
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
      userUpdate: undefined
    };
    this.onTextSearchChange = this.onTextSearchChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.loadData();
    this.props.actions.setCurrentLeftSidebarItem(2);
  }

  loadData() {
    const users = JSON.parse(getDataFromLocalStorage("users"));
    console.log(users);

    this.setState({
      originUsers: users,
      users: users,
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

  onRemove(id) {
    this.setState({
      removeId: id,
      showDialogWarning: true
    });
  }

  onRemoveAccpet() {
    const { maxItems } = this.state;
    let { currentPage } = this.state;
    const { originPosts, removeId } = this.state;
    const users = [];
    originPosts.forEach(v => {
      if (v.id !== removeId) {
        users.push(v);
      }
    });
    saveDataToLocalStorage("users", JSON.stringify(users));
    if ((currentPage - 1) * maxItems <= users.length && currentPage !== 1) {
      currentPage--;
    }
    this.setState({
      removeId: -1,
      showDialogWarning: false,
      originPosts: users,
      users: users,
      currentPage: currentPage
    });
  }

  onRemoveCancel() {
    this.setState({
      removeId: -1,
      showDialogWarning: false
    });
  }

  onToggleActive(username) {
    const { originUsers } = this.state;
    const userArrParse = Object.keys(originUsers).map(i => originUsers[i]);

    userArrParse.forEach(v => {
      if (v.username === username) {
        v.isActive = !v.isActive;
        return;
      }
    });

    this.setState({
      users: Object.assign({}, userArrParse),
      originUsers: Object.assign({}, userArrParse)
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

  onTextSearchChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  onSearch(text) {
    // e.preventDefault();
    const { originPosts, searchText } = this.state;

    let users = [];
    if (searchText === "") {
      this.setState({
        searchText: "",
        users: originPosts
      });
      return;
    }

    originPosts.forEach(v => {
      if (v.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
        users.push(v);
      }
    });

    this.setState({
      searchText: "",
      users
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

  render() {
    const {
      users,
      header,
      maxItems,
      currentPage,
      searchText,
      showDialogWarning
    } = this.state;

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
    const contentDialogWarning = "Bạn có muốn khóa tài khoản?";

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

    const userArrParse = Object.keys(users).map(i => users[i]);
    return (
      <MainLayout
        haveLeftSidebar={true}
        menuItems={menuItems}
        onClickItem={() => {}}
        title="Quản lý tài khoản người dùng"
      >
        <>
          <Dialog
            show={showDialogWarning}
            buttons={buttonDialogWarining}
            messageContent={contentDialogWarning}
            onClickCloseButton={() => this.onRemoveCancel()}
          />
          <div className="dashboard">
            <div>
              <div className="title">Quản lý tài khoản</div>
              <div className="search-input">
                {/* <SearchInput
                  placeHolder="Tìm kiếm"
                  onChange={e => this.onTextSearchChange(e)}
                  onSearch={e => this.onSearch(e)}
                  searchText={searchText}
                /> */}
                <SearchBox
                  onChange={this.onTextSearchChange}
                  onEnter={this.onSearch}
                />
              </div>

              <DataTableComponent
                maxItems={maxItems}
                currentPage={currentPage}
                users={users}
                header={header}
                // categories={categories}
                onToggleActive={username => this.onToggleActive(username)}
              />
            </div>
            <div className="footer">
              <PagingControl
                onNext={() => this.nextPage()}
                onPrev={() => this.prevPage()}
                maxPage={
                  Math.floor(userArrParse.length / maxItems) ===
                  userArrParse.length / maxItems
                    ? Math.floor(userArrParse.length / maxItems)
                    : Math.floor(userArrParse.length / maxItems) + 1
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
}))(ManageUser);
