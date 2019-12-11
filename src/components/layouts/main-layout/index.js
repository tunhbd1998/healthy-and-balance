import React from "react";
import { Container, Row } from "react-bootstrap";
import LeftSidebar from "./left-sidebar";
import Header from "./header";
import "./main-layout.styles.scss";
import { connect } from "react-redux";
import Notification from "../../commons/notification";
import { get } from "lodash";
import { bindActionCreators } from "redux";
import { alertNotification } from "../../../store/actions";

function MainLayout({
  haveLeftSidebar,
  commonMenuItems,
  menuItems,
  children,
  onClickItem,
  notifications,
  actions,
}) {
  return (
    <Container fluid className="hb-main-layout">
      <Row className="header">
        <Header />
      </Row>
      <Row className="body">
        {haveLeftSidebar ? (
          <>
            <LeftSidebar
              commonMenuItems={commonMenuItems}
              menuItems={menuItems}
              onClickItem={onClickItem}
            />
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
        <div className="notification-container">
          {/* {notifications.map((notify, index) => (
            <Notification
              key={index}
              type={notify.type}
              message={notify.message}
              hideAfter={2000}
            />
          ))} */}
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  notifications: get(state, "notifications"),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ alertNotification }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
