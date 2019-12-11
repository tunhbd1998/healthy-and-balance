import React from "react";
import { Button } from "react-bootstrap";
import { get } from "lodash";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./left-sidebar.styles.scss";
import {
  setCurrentItem,
  fetchPostsByCategory,
} from "../../../../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCategoryById } from "../../../../utils";

function LeftSidebar({
  commonMenuItems,
  menuItems,
  currentItem,
  actions,
  searchContent,
  onClickItem,
  match,
}) {
  const [isCollapsed, setCollapse] = React.useState(false);
  const toggleSidebar = () => {
    setCollapse(!isCollapsed);

    setTimeout(() => {
      const containLeftSidebarContent = document.querySelector(
        ".contain-left-sidebar--content"
      );
      containLeftSidebarContent.style.width = `calc(100% - ${
        !isCollapsed ? 30 : 250
      }px)`;
    }, 200);
  };

  if (!searchContent) {
    if (!currentItem && menuItems.length > 0) {
      actions.setCurrentItem(
        getCategoryById(match.params.id) ||
          get(commonMenuItems, 0) ||
          get(menuItems, 0)
      );
      onClickItem();
    }
  }

  console.log("left sidebar");
  return (
    <div className={`hb-left-sidebar ${isCollapsed ? "collapse-sidebar" : ""}`}>
      <Button className="collapse-button" onClick={toggleSidebar}>
        <FontAwesomeIcon
          style={{ fontSize: "20px" }}
          icon={isCollapsed ? faAngleRight : faAngleLeft}
        />
      </Button>
      <ul className="content">
        {(commonMenuItems || []).map(item => (
          <li key={item.id} className="menu-item-container">
            <Link
              className={`menu-item ${
                item.id === get(currentItem, "id") ? "active" : ""
              }`}
              onClick={() => {
                actions.setCurrentItem(item);
                onClickItem();
              }}
              to={item.url}
            >
              {item.title}
            </Link>
          </li>
        ))}
        {(commonMenuItems || []).length > 0 ? <div className="line" /> : null}
        {(menuItems || []).map((item, index) => (
          <li key={item.id} className="menu-item-container">
            <Link
              className={`menu-item ${
                item.id === get(currentItem, "id") ? "active" : ""
              }`}
              onClick={() => {
                actions.setCurrentItem(item);
                onClickItem();
              }}
              to={item.url}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  currentItem: get(state, "currentItem"),
  searchContent: get(state, "searchContent"),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setCurrentItem,
      fetchPostsByCategory,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeftSidebar));
