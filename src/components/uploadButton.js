import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "../styles/upload.css";
import StatusMessage from "./statusMessage";
import SubmitButton from "./submitButton";
import DownloadIcon from "../images/download_black.svg";
import InfoIcon from "../images/info_black.svg";
import UploadIcon from "../images/file_upload_black.svg";
import SampleFile from "../assets/Sample.xlsx";

const UploadCSVButton = () => {
  const fileType = ["xlsx"];
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const [dataAvailble, setdataAvailble] = useState();
  const [messageStatus, SetMessageStatus] = useState("");
  const [errorMessageStatus, SetErrorMessageStatus] = useState("");
  const [linkHref, setlinkHref] = useState("");
  const [linkDownload, setLinkDownload] = useState("");

  let objectURL;
  // const link = document.getElementById("download-link");
  useEffect(() => {
    if (file?.name) {
      setFileName(file.name);
      if (file.name.split(".").pop().includes(fileType)) {
        if (dataAvailble) {
          SetMessageStatus(true);
          SetErrorMessageStatus();
        } else {
          SetMessageStatus(false);
          SetErrorMessageStatus(`Please upload file with data`);
        }
      } else {
        SetMessageStatus(false);
        SetErrorMessageStatus(
          `Incorrect file type, file type shoild be ${fileType.join(" or ")}`
        );
      }
    } else {
      setFileName("");
    }
  }, [file, messageStatus, errorMessageStatus, dataAvailble]);
  const downloadSampleFile = () => {
    // anchor link
    const element = document.createElement("a");
    element.download = "Sample.xlsx";
    element.href = SampleFile; // "./src/assets/Sample.xlsx";
    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };
  const handleFileUpload = event => {
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      console.log(parsedData.length, parsedData, parsedData.length < 1);
      if (parsedData.length <= 1) {
        setdataAvailble(false);
      } else {
        setdataAvailble(true);
      }
    };
    setFile(event.target.files[0]);

    //create click here href link to download uploaded file.
    const element = document.createElement("a");
    if (objectURL) {
      URL.revokeObjectURL(objectURL);
    }
    objectURL = URL.createObjectURL(event.target.files[0]);
    element.download = event.target.files[0].name;
    element.href = objectURL;
    setLinkDownload(event.target.files[0].name);
    setlinkHref(objectURL);
  };
  return (
    <div id="discount-list">
      <div className="sample-file" onClick={downloadSampleFile}>
        <img alt="" src={DownloadIcon}></img>
        <label className="sample-file-text"> Sample File </label>
        <img alt="" src={InfoIcon} title="info about sample file"></img>
      </div>
      <div className="discountList">Discount List</div>
      <label className="upload-section">
        <label className="uploadInput">{fileName || " "}</label>
        <label htmlFor="filePicker" className="uploadButton">
          <img src={UploadIcon} className="fileUploadIcon" />
          <span className="uploadLebel">Upload</span>
        </label>
      </label>
      <StatusMessage
        status={messageStatus}
        message={errorMessageStatus}
        href={linkHref}
        download={linkDownload}
      />
      <SubmitButton />
      <input
        id="filePicker"
        style={{ visibility: "hidden", height: "0px", width: "0px !important" }}
        type={"file"}
        accept=".xlsx"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadCSVButton;
