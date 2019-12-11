import React from "react";
import { Container, Row } from "react-bootstrap";
import LeftSidebar from "./left-sidebar";
import Header from "./header";
import "./main-layout.styles.scss";

export default function MainLayout({
  haveLeftSidebar,
  menuItems,
  children,
  onClickItem,
}) {
  return (
    <Container fluid className="hb-main-layout">
      <Row className="header">
        <Header />
      </Row>
      <Row className="body">
        {haveLeftSidebar ? (
          <>
            <LeftSidebar menuItems={menuItems} onClickItem={onClickItem} />
            <Container className="contain-left-sidebar--content">
              {children}
            </Container>
          </>
        ) : (
          <Container
            className="not-contain-left-sidebar"
            fluid
            style={{
              overflow: "auto",
              height: "100%",
              width: "100%",
              padding: "0",
            }}
          >
            {children}
          </Container>
        )}
      </Row>
    </Container>
  );
}
