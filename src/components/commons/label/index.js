import React from "react";
import {Badge} from 'react-bootstrap';
import './label.css';

export default function Label({ children, type }) {
  return (
    <Badge variant={type} className="lb">
      {children}
    </Badge>
  );
}