import React from "react";
import { Container, Row } from "react-bootstrap";
import { getDataFromLocalStorage } from "../../../utils";
import LeftSidebar from "../../commons/left-sidebar";
import Header from "./header";
import "./main-layout.styles.scss";

export default function MainLayout({ haveLeftSidebar, menuItems, children }) {
  const commonCategories = JSON.parse(
    getDataFromLocalStorage("commonCategories")
  );
  const categories = JSON.parse(getDataFromLocalStorage("categories"));

  return (
    <Container fluid className="hb-main-layout">
      <Row className="header">
        <Header />
      </Row>
      <Row className="body">
        {haveLeftSidebar ? (
          <Container fluid>
            <LeftSidebar menuItems={[...commonCategories, ...categories]} />
            <Container>{children}</Container>
          </Container>
        ) : (
          <Container>{children}</Container>
        )}
      </Row>
    </Container>
  );
}
