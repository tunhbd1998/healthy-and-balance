import React from "react";
import { Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./notification.styles.scss";

export default function Notification({ hideAfter, type, message }) {
  const [visiable, setVisiable] = React.useState(true);

  return (
    <Toast
      onClose={() => setVisiable(false)}
      className="hb-notification"
      show={visiable}
      delay={hideAfter}
      autohide
    >
      <Toast.Body className={`content ${type}`}>
        <FontAwesomeIcon
          icon={type === "success" ? faCheckCircle : faTimesCircle}
          className={`icon ${type}`}
        />
        <div className="message">{message}</div>
        {/* <FontAwesomeIcon
          icon={faTimes}
          className="icon-close"
          onClick={() => {
            setVisiable(false);
          }}
        /> */}
      </Toast.Body>
    </Toast>
  );
}
