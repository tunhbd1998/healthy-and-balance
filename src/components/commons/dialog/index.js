import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../button";
import "./dialog.styles.css";

export default function Dialog({
  title,
  messageContent,
  buttons,
  show,
  onClickCloseButton,
}) {
  return (
    <Modal className="dialog" show={show} onHide={onClickCloseButton}>
      {title ? (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      ) : null}
      <Modal.Body className="">{messageContent}</Modal.Body>
      <Modal.Footer>
        {buttons.map((button, idx) => {
          return (
            <Button key={idx} type={button.type} onClick={button.onClick}>
              {button.label}
            </Button>
          );
        })}
      </Modal.Footer>
    </Modal>
  );
}
