import React from "react";
import { isEmpty } from "lodash";
import TextEdit from "../../../../../commons/text-edit";
import Dialog from "../../../../../commons/dialog";
import Input from "../../../../../commons/input";
import ComboBox from "../../../../../commons/combo-box";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage
} from "../../../../../../utils";
import "./dialog-edit-poster.scss";

export default class DialogEditPost extends React.Component {
  constructor(props) {
    super(props);
    const { post } = props;
    this.state = {
      categories: [],
      post: post
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    const originPost = this.props.post;
    const { post } = this.state;
    const { show } = this.props;
    if (post === undefined && originPost !== undefined && show) {
      this.setState({
        ...this.state,
        post: {
          ...originPost,
          status: 0
        }
      });
    }
  }

  loadData() {
    const categories = JSON.parse(getDataFromLocalStorage("categories"));
    this.setState({
      categories: categories,
      post: undefined
    });
  }

  onNameChange(e) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        title: e.target.value
      }
    });
  }

  onCategoryChange(e) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        category: e.target.value
      }
    });
  }

  onshortDescriptionChange(e) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        shortDescription: e.target.value
      }
    });
  }

  onContentChange(value) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        content: value
      }
    });
  }

  onEdit() {
    const { onCloseDialog, showNotification } = this.props;
    const { post } = this.state;
    const posts = JSON.parse(getDataFromLocalStorage("posts"));
    const newPosts = [];

    if (isEmpty(post.title)) {
      return;
    }

    posts.forEach(v => {
      if (v.id === post.id) {
        newPosts.push(post);
      } else {
        newPosts.push(v);
      }
    });
    saveDataToLocalStorage("posts", JSON.stringify(newPosts));
    onCloseDialog();
    this.loadData();
    // showNotification("Cập nhật bài viết thành công", "success");
  }

  render() {
    const { show, onCloseDialog } = this.props;
    const { categories } = this.state;
    const { post } = this.state;
    if (post === undefined) {
      return <></>;
    }
    const { title, category, shortDescription, content } = post;
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
      <div style={{ maxWidth: "1000px" }}>
        <div className="group-item">
          Tên bài viết
          <Input
            placeHover="Tên bài viết"
            value={title}
            onChange={e => this.onNameChange(e)}
          />
        </div>
        <div className="group-item">
          Chuyên mục
          <ComboBox
            items={categories}
            selectValue={category}
            onChange={e => this.onCategoryChange(e)}
          />
        </div>
        <div className="group-item">
          Miêu tả ngắn về bài viết
          <Input
            placeHover="Mô tả bài viết"
            value={shortDescription}
            type="textarea"
            onChange={e => this.onshortDescriptionChange(e)}
          />
        </div>
        <div>
          <div className="group-item">Nội dung bài viết</div>
          <TextEdit
            value={content}
            onChange={value => this.onContentChange(value)}
          />
        </div>
      </div>
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
