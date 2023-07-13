import React from "react";
import "../styles/status.css";
const downloadUploadedFile = props => {
  return (
    <>
      <a
        href={props.href}
        download={props.download}
        className="success-message"
      >
        <b>Click here</b> to review
      </a>
    </>
  );
};

export default downloadUploadedFile;
