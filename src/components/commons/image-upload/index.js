import React from "react";

export default function ImageUpload({ type = "preview", size = "small" }) {
  return (
    <div className="image-upload-container">
      {type === "preview" ? (
        <div className={`image-container preview ${size}`}>
          <img src="" alt="uploading" className="image-preview" />
          <input type="file" name="image" className="file-input" />
        </div>
      ) : null}
    </div>
  );
}
