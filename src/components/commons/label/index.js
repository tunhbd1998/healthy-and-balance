import React from "react";
import {Badge} from 'react-bootstrap';
import './label.scss';

export default function Label({ children, type }) {
  return (
    <Badge className={`lb lb-${type || "primary"}`}>
      {children}
    </Badge>
  );
}