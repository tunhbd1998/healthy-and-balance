import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../button";
import "./dialog.styles.css";

export default function Dialog({ messageContent, buttons, show }) {
  return (
    <Modal className="dialog" show={show}>
      <Modal.Body className="">{messageContent}</Modal.Body>
      <Modal.Footer>
        {buttons.map(button => {
          return (
            <Button type={button.type} onClick={button.onClick}>
              {button.label}
            </Button>
          );
        })}
      </Modal.Footer>
    </Modal>
  );
}
