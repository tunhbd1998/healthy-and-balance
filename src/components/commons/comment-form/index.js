import React from "react";
import "./form-comment.scss";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
const FormComment = ({ hasReply, onSubmit }) => {
  const [disabled, setDisabled] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState("");

  const handleChangeText = e => {
    setContent(e.target.value);

    const sizeText = e.target.value.length;
    if (sizeText === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const onClick = e => {
    e.preventDefault();

    if (!isEmpty(content) && onSubmit) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <div>
      <div className="form-comment-container">
        <Form.Group className="custom-form">
          <Form.Control
            as="textarea"
            rows="3"
            value={content}
            className="area-comment"
            onChange={handleChangeText}
          />
          <div className="control-comment">
            {hasReply ? (
              <div className="cancel" onClick={onClick}>
                Huỷ
              </div>
            ) : (
              ""
            )}
            <button
              className="button-comment"
              onClick={onClick}
              disabled={disabled}
            >
              Bình luận
            </button>
          </div>
        </Form.Group>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  user: get(state, "user")
});
export default connect(mapStateToProps, null)(FormComment);
