import React from "react";
import './combobox.scss';

export default function ComboBox({ onChange, items, label }) {
    let lb = <></>;
    if (label !== undefined) {
        lb = <>{label}:</>;
    }
    return (
        <div className={label === undefined ? "cb-min" : "cb"}>
            {lb}
            <select
                onChange={onChange}>
                {
                    items.map((v, idx) => (
                        <option value={idx} key={idx}>{v}</option>
                    ))
                }
            </select>
        </div>
    );
}
