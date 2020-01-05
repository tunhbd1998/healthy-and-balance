import React from "react";
import TextEdit from "../../../../../commons/text-edit";
import Dialog from "../../../../../commons/dialog";
import Input from "../../../../../commons/input";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  notify
} from "../../../../../../utils";
import "./dialog-edit-category.scss";
import { alertNotification } from "../../../../../../store/actions";

export default class DialogEditCategory extends React.Component {
  constructor(props) {
    super(props);
    const { category } = props;
    this.state = {
      category: category
    };
  }

  componentDidUpdate() {
    const origincategory = this.props.category;
    const { category } = this.state;
    const { show } = this.props;
    if (category === undefined && origincategory !== undefined && show) {
      this.setState({
        ...this.state,
        category: {
          ...origincategory
        }
      });
    }
  }

  onTitleChange(value) {
    const { category } = this.state;
    this.setState({
      category: {
        ...category,
        title: value
      }
    });
  }

  onEdit() {
    const { onCloseDialog, showNotification } = this.props;
    const { category } = this.state;
    const categories = JSON.parse(getDataFromLocalStorage("categories"));
    const newcategories = [];
    categories.forEach(v => {
      if (v.id === category.id) {
        newcategories.push(category);
      } else {
        newcategories.push(v);
      }
    });
    saveDataToLocalStorage("categories", JSON.stringify(newcategories));

    notify("success", "Cập nhật chuyên mục thành công");
    onCloseDialog();
    showNotification("Cập nhật chuyên mục thành công", "success");
  }

  render() {
    const { show, onCloseDialog } = this.props;
    const { category } = this.state;
    if (category === undefined) {
      return <></>;
    }
    const { id, title } = category;
    let dialogContent,
      buttonsDialog = [
        {
          type: "secondary",
          label: "Hủy bỏ",
          onClick: onCloseDialog
        },
        {
          type: "primary",
          label: "Cập nhật",
          onClick: () => this.onEdit()
        }
      ];
    dialogContent = (
      <div style={{ maxWidth: "1000px", minWidth: "400px" }}>
        <div className="group-item">
          <div>Mã chuyên mục</div>
          <Input value={id} disable />
        </div>
        <div className="group-item">
          Tên chuyên mục
          <Input
            value={title}
            onChange={e => this.onTitleChange(e.target.value)}
          />
        </div>
      </div>
    );
    return (
      <Dialog
        title="Chỉnh sửa chuyên mục"
        show={show}
        messageContent={dialogContent}
        buttons={buttonsDialog}
        onClickCloseButton={onCloseDialog}
      />
    );
  }
}
