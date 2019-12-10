import React from "react";
import { Button } from "react-bootstrap";
import "./button2.scss";

export default function Button2({ onClick, children }) {
    return (
        <Button
            className="button-2"
            onClick={onClick}>
            {children}
        </Button>
    );
}
