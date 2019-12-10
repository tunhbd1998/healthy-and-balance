import React from "react";
import TextEdit from '../text-edit';
import Dialog from '../dialog';
import "./dialog-poster.scss";

export default function DialogPoster({ show }) {
    let dialogContent, buttonsDialog = [];
    dialogContent = <TextEdit />
    buttonsDialog.push({
        type: "button",
        label: "Thêm"
    })
    return (
        <Dialog title="Thêm bài viết" show messageContent={dialogContent} buttons={buttonsDialog}/>
    );
}
