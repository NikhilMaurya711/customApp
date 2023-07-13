import React from "react";
import SuccessIcon from "../images/success_icon.svg";
import WarningIcon from "../images/warning_black.svg";
import DownloadFile from "./downloadFile";

import "../styles/status.css";

const StatusMessage = props => {
  console.log(props.status, "=status");
  let message = "",
    icon = "",
    messageCSS = "",
    downloadLink = "";
  if (props.status === true) {
    message = props.message || `File Successfully uploaded.`;
    downloadLink = <DownloadFile href={props.href} download={props.download} />;
    messageCSS = "success-message";
    icon = SuccessIcon;
  } else if (props.status === false) {
    message = props.message || "Please upload the file again";
    downloadLink = "";
    messageCSS = "warning-message";
    icon = WarningIcon;
  }
  return (
    <>
      <span className="message-possition">
        <img src={icon} />
        <span className={messageCSS} id="message-section">
          {message}
          {downloadLink}
        </span>
      </span>
    </>
  );
};

export default StatusMessage;
