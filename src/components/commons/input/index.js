import React from "react";
import './input.scss';

export default function Input({ value, onChange, disable, placeHover, type }) {
    if (type === 'textarea') {
        return (
            <textarea
                className={disable ? "ip-disable" : "ip"}
                onChange={onChange}
                value={value}
                disable={disable}
                placeholder={placeHover} />
        );
    } else {
        return (
            <input
                className={disable ? "ip-disable" : "ip"}
                onChange={onChange}
                value={value}
                disable={disable}
                placeholder={placeHover} />
        );
    }
}