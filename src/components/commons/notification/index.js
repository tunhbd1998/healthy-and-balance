import React from "react";
import { Toast } from "react-bootstrap";

export default function Notification({ hideAfter }) {
  const [visiable, setVisiable] = React.useState(true);

  return (
    <Toast className="" show={visiable} delay={hideAfter} autohide>
      <Toast.Body>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Toast.Body>
    </Toast>
  );
}
