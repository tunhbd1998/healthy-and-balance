import React from "react";
import Dialog from "../../../../../commons/dialog";
import Input from "../../../../../commons/input";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage
} from "../../../../../../utils";
import "./dialog-add-category.scss";

export default class DialogAddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: {
        id: "",
        title: "",
      }
    };
  }

  componentDidMount() {
    this.loadData();
  }

  resetData() {
    this.setState({
      category: {
        id: "",
        title: "",
      }
    });
  }

  loadData() {
    this.setState({
      category: {
        id: "",
        title: "",
      }
    });
  }

  onIdChange(e) {
    const { category } = this.state;
    this.setState({
      category: {
        ...category,
        id: e.target.value
      }
    });
  }

  onTitleChange(e) {
    const { category } = this.state;
    this.setState({
      category: {
        ...category,
        title: e.target.value
      }
    });
  }

  onAdd() {
    const { onCloseDialog } = this.props;
    const { category } = this.state;
    const categories = JSON.parse(getDataFromLocalStorage("categories"));
    categories.push(category);
    saveDataToLocalStorage("categories", JSON.stringify(categories));
    onCloseDialog();
    this.resetData();
    this.loadData();
  }

  render() {
    const { show, onCloseDialog } = this.props;

    let dialogContent,
      buttonsDialog = [
        {
          type: "secondary",
          label: "Hủy bỏ",
          onClick: () => onCloseDialog()
        },
        {
          type: "primary",
          label: "Thêm",
          onClick: () => this.onAdd()
        }
      ];
    dialogContent = (
      <div className="dap"  style={{ maxWidth: "1000px", minWidth: "400px" }}>
        <div className="group-item">
          Mã chuyên mục
          <Input
            placeHover="Tên bài viết"
            onChange={e => this.onIdChange(e)}
          />
        </div>
        <div className="group-item">
          Tên Chuyên mục
          <Input
            placeHover="Tên chuyên mục"
            onChange={e => this.onTitleChange(e)}
          />
        </div>
      </div>
    );
    return (
      <Dialog
        title="Thêm chuyên mục"
        show={show}
        messageContent={dialogContent}
        buttons={buttonsDialog}
        onClickCloseButton={onCloseDialog}
      />
    );
  }
}
