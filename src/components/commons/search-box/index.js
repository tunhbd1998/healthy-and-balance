import React from "react";
import "./search-box.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBox({ onEnter, onChange }) {
  const searchInput = React.useRef(null);

  return (
    <Container fluid className="search-box-container">
      <div className="search-box">
        <input
          ref={searchInput}
          placeholder="Tìm kiếm"
          onChange={onChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              // actions.setSearchContent(searchInput.current.value);
              // actions.fetchPostsBySearchContent();
              onEnter && onEnter();
            }
          }}
        />
        <FontAwesomeIcon className="icon" icon={faSearch} />
      </div>
    </Container>
  );
}
