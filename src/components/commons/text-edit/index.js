import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import "./text-edit.scss";

export default function TextEdit({ onChange, value }) {
  const editor = useRef(null)

  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={newContent => { }}
    />
  );
}
