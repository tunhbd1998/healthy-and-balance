import React from "react";
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import "./text-edit.scss";

export default function TextEdit({ onChange }) {
    return (
        <FroalaEditor tag='textarea'/>
    );
}
