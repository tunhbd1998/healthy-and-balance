import React from "react";
import { Container } from "react-bootstrap";
import UserMenu from "./user-menu";
import { Link } from "react-router-dom";
import "./header.styles.scss";

export default function Header(props) {
  return (
    <Container fluid className="hb-header">
      <Link to="/">
        <img className="logo" src="/media/images/logo/logo.png" alt="logo" />
      </Link>
      <UserMenu />
    </Container>
  );
}
