import React from "react";
import { Button } from "react-bootstrap";
import { get } from "lodash";
import { Link } from "react-router-dom";
import "./left-sidebar.styles.scss";

export default function LeftSidebar({ menuItems }) {
  const [activeId, setActiveId] = React.useState(get(menuItems, [0, "id"]));
  console.log("menuItems", menuItems);
  return (
    <div className="hb-left-sidebar">
      <Button className="collapse-button"></Button>
      <ul className="content">
        {(menuItems || []).map(item => (
          <li key={item.id} className="menu-item-container">
            <Link
              className={`menu-item ${item.id === activeId ? "active" : ""}`}
              onClick={() => setActiveId(item.id)}
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
