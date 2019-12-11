import React from "react";
import { get } from "lodash";
import TextEdit from "../../commons/text-edit";
import Dialog from "../../commons/dialog";
import Input from "../../commons/input";
import ComboBox from "../../commons/combo-box";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../../utils";
import "./dialog-add-poster.scss";

export default class DialogAddPoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      post: {
        id: -1,
        title: "",
        category: "",
        status: 0,
        shortDescription: "",
        content: "",
        createdDate: "",
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  resetData() {
    this.setState({
      categories: [],
      post: {
        id: -1,
        title: "",
        category: "",
        status: 0,
        shortDescription: "",
        content: "",
        createdDate: "",
      },
    });
  }

  loadData() {
    const categories = JSON.parse(getDataFromLocalStorage("categories"));
    const { post } = this.state;
    this.setState({
      categories: categories,
      post: {
        ...post,
        category: categories[0].id,
        createdDate: new Date().toISOString().split("T")[0],
      },
    });
  }

  onNameChange(e) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        title: e.target.value,
      },
    });
  }

  onCategoryChange(e) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        category: e.target.value,
      },
    });
  }

  onshortDescriptionChange(e) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        shortDescription: e.target.value,
      },
    });
  }

  onContentChange(value) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        content: value,
      },
    });
  }

  onAdd() {
    const { onCloseDialog } = this.props;
    const { post } = this.state;
    const posts = JSON.parse(getDataFromLocalStorage("posts"));
    post.id = (get(posts, [(get(posts, "length") || 1) - 1, "id"]) || 0) + 1;
    post.author = get(JSON.parse(getDataFromLocalStorage("user")), "username");
    posts.push(post);
    saveDataToLocalStorage("posts", JSON.stringify(posts));
    onCloseDialog();
    this.resetData();
    this.loadData();
  }

  render() {
    const { show, onCloseDialog } = this.props;
    const { categories, post } = this.state;

    let dialogContent,
      buttonsDialog = [
        {
          type: "secondary",
          label: "Hủy bỏ",
          onClick: onCloseDialog,
        },
        {
          type: "primary",
          label: "Thêm",
          onClick: () => this.onAdd(),
        },
      ];
    dialogContent = (
      <>
        <div className="group-item">
          Tên bài viết
          <Input
            placeHover="Tên bài viết"
            onChange={e => this.onNameChange(e)}
          />
        </div>
        <div className="group-item">
          Chuyên mục
          <ComboBox
            items={categories}
            onChange={e => this.onCategoryChange(e)}
          />
        </div>
        <div className="group-item">
          Miêu tả ngắn về bài viết
          <Input
            placeHover="Mô tả bài viết"
            type="textarea"
            onChange={e => this.onshortDescriptionChange(e)}
          />
        </div>
        <div>
          <div className="group-item">Nội dung bài viết</div>
          <TextEdit
            value={post.content}
            onChange={value => this.onContentChange(value)}
          />
        </div>
      </>
    );
    return (
      <Dialog
        title="Thêm bài viết"
        show={show}
        messageContent={dialogContent}
        buttons={buttonsDialog}
        onClickCloseButton={onCloseDialog}
      />
    );
  }
}
