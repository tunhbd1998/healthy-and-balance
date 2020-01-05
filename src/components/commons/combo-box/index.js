import React from "react";
import "./combobox.scss";

export default function ComboBox({ onChange, items, label, selectValue }) {
  let lb = <></>;
  if (label !== undefined) {
    lb = <>{label}:</>;
  }
  return (
    <div className={label === undefined ? "cb-min" : "cb"}>
      <span className='label-cb'>{lb}</span>
      <select
        className="select"
        onChange={onChange}
        defaultValue={selectValue === undefined ? 0 : selectValue}
      >
        {items.map((v, idx) => (
          <option value={v.id} key={idx}>
            {v.title}
          </option>
        ))}
      </select>
    </div>
  );
}
