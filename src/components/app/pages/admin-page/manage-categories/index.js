import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ic_add from "./ic_add.svg";
import DataTableComponent from "../../../../commons/table-category/DataTableComponent";
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
import Button2 from "../../../../commons/button-style2";
import Image from "../../../../commons/image";
import DialogAddCategory from "./dialog-add-category";
import DialogEditCategory from "./dialog-edit-category";

class ManageCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originCategories: [],
      header: [
        "ID",
        "Tên chuyên mục",
        "Thao tác"
      ],
      categories: [],
      maxItems: 10,
      currentPage: 1,
      searchText: "",
      removeId: "",
      showDialogWarning: false,
      showDialogAddCategory: false,
      showDialogEditCategory: false,
      showDialogUpdate: false,
      categoryUpdate: undefined
    };
    this.onTextSearchChange = this.onTextSearchChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.loadData();
    this.props.actions.setCurrentLeftSidebarItem(3);
  }

  loadData() {
    const categories = JSON.parse(getDataFromLocalStorage("categories"));

    this.setState({
      originCategories: categories,
      categories: categories,
    });
  }

  onRemove(e, id) {
    this.setState({
      removeId: id,
      showDialogWarning: true
    });
  }

  onRemoveAccpet() {
    const { maxItems } = this.state;
    let { currentPage } = this.state;
    const { originCategories, removeId } = this.state;
    const categories = [];
    originCategories.forEach(v => {
      if (v.id !== removeId) {
        categories.push(v);
      }
    });
    saveDataToLocalStorage("categories", JSON.stringify(categories));
    if ((currentPage - 1) * maxItems <= categories.length && currentPage !== 1) {
      currentPage--;
    }
    this.setState({
      removeId: -1,
      showDialogWarning: false,
      originPosts: categories,
      categories: categories,
      currentPage: currentPage
    });
  }

  onRemoveCancel() {
    this.setState({
      removeId: -1,
      showDialogWarning: false
    });
  }

  onEdit(e, id) {
    const { originCategories } = this.state;
    let categoryUpdate = undefined;
    originCategories.forEach(v => {
      if (v.id === id) {
        categoryUpdate = v;
      }
    });
    console.log(originCategories);
    this.setState({
      categoryUpdate,
      showDialogEditCategory: true,
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
    const { originCategories, searchText } = this.state;

    let categories = [];
    if (searchText === "") {
      this.setState({
        searchText: "",
        categories: originCategories
      });
      return;
    }

    originCategories.forEach(v => {
      if (v.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
        categories.push(v);
      }
    });

    this.setState({
      searchText: "",
      categories
    });
  }

  onButtonAddCategory() {
    this.setState({
      showDialogAddCategory: true
    });
  }

  onDialogAddClose() {
    this.setState({
      showDialogAddCategory: false
    });
    this.loadData();
  }

  onDialogUpdateClose() {
    this.setState({
      showDialogEditCategory: false
    });
    this.loadData();
  }

  showNotification(message, type) {
    // const { dispatch } = this.props;
    // dispatch(alertNotification(type, message));
  }

  render() {
    const {
      categories,
      header,
      maxItems,
      currentPage,
      showDialogWarning,
      showDialogAddCategory,
      categoryUpdate,
      showDialogEditCategory
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
    const contentDialogWarning = "Bạn có muốn xóa chuyên mục?";

    const menuItems = [
      {
        id: 1,
        title: "Quản lý bài viết",
        url: "/admin/dashboard/posts"
      },
      {
        id: 2,
        title: "Quản lý người dùng",
        url: "/admin/dashboard/categories"
      },
      {
        id: 3,
        title: "Quản lý chuyên mục",
        url: "/admin/dashboard/categories"
      }
    ];

    const categorieArrParse = Object.keys(categories).map(i => categories[i]);
    return (
      <MainLayout
        haveLeftSidebar={true}
        menuItems={menuItems}
        onClickItem={() => { }}
        title="Quản lý chuyên mục"
      >
        <>
          <DialogAddCategory
            showNotification={(message, type) =>
              this.showNotification(message, type)
            }
            show={showDialogAddCategory}
            onCloseDialog={() => this.onDialogAddClose()}
          />
          <DialogEditCategory
            showNotification={(message, type) =>
              this.showNotification(message, type)
            }
            category={categoryUpdate}
            show={showDialogEditCategory}
            onCloseDialog={() => this.onDialogUpdateClose()}
          />
          <Dialog
            show={showDialogWarning}
            buttons={buttonDialogWarining}
            messageContent={contentDialogWarning}
            onClickCloseButton={() => this.onRemoveCancel()}
          />
          <div className="dashboard">
            <div>
              <div className="title">Quản lý chuyên mục</div>
              <div className="search-input">
                <SearchBox
                  onChange={this.onTextSearchChange}
                  onEnter={this.onSearch}
                />
              </div>
              <div className="control-tool">
                <div></div>
                <div>
                  <Button2
                    children={
                      <>
                        <Image src={ic_add} disable />
                        Thêm chuyên mục
                    </>
                    }
                    onClick={() => this.onButtonAddCategory()}
                  />
                </div>
              </div>
              <DataTableComponent
                maxItems={maxItems}
                currentPage={currentPage}
                header={header}
                categories={categories}
                onRemove={(e, id) => this.onRemove(e, id)}
                onEdit={(e, id) => this.onEdit(e, id)}
              />
            </div>
            <div className="footer">
              <PagingControl
                onNext={() => this.nextPage()}
                onPrev={() => this.prevPage()}
                maxPage={
                  Math.floor(categorieArrParse.length / maxItems) ===
                    categorieArrParse.length / maxItems
                    ? Math.floor(categorieArrParse.length / maxItems)
                    : Math.floor(categorieArrParse.length / maxItems) + 1
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
  actions: bindActionCreators({ setCurrentLeftSidebarItem }, dispatch),
  dispatch: dispatch
}))(ManageCategory);
