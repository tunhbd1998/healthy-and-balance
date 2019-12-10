import React from "react";
import { Image as ImageBts } from 'react-bootstrap';
import './image.css';

export default function Image({ src, onClick, disable }) {
    return (
        <ImageBts
            className={disable ? "img-disable" : "img"}
            onClick={onClick}
            src={src} />
    );
}