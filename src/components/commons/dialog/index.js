import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../button";
import "./dialog.styles.scss";

export default function Dialog({
  title,
  messageContent,
  buttons,
  show,
  onClickCloseButton
}) {
  return (
    <Modal className="dialog" show={show} onHide={onClickCloseButton}>
      {title ? (
        <Modal.Header closeButton className="dialog-header">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      ) : null}
      <Modal.Body className="hb-scrollbar">
        {messageContent}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 0px"
          }}
        >
          {buttons.map((button, idx) => {
            return (
              <Button
                key={idx}
                type={button.type}
                onClick={button.onClick}
                style={{ margin: "0px 5px" }}
              >
                {button.label}
              </Button>
            );
          })}
        </div>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
}
