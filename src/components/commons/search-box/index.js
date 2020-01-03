import React from "react";
import "./search-box.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBox({ onEnter, onChange }) {
  const searchInput = React.useRef(null);
  const [content, setContent] = React.useState("");

  return (
    <Container fluid className="search-box-container">
      <div className="search-box">
        <input
          ref={searchInput}
          placeholder="Tìm kiếm"
          onChange={e => {
            onChange && onChange(e);
            setContent(e.target.value);
          }}
          value={content}
          onKeyPress={e => {
            if (e.key === "Enter") {
              onEnter && onEnter(content.replace(/\\n/, ""));
            }
          }}
        />
        <FontAwesomeIcon className="icon" icon={faSearch} />
      </div>
    </Container>
  );
}
