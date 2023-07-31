import React from "react";
import "./Tab.css";
import CloseIcon from "@mui/icons-material/Close";
export default function Tab() {
  return (
    <div className="tab">
      <div className="tabItem tabItemActive">
        <p>UnknowFile1</p>
        <CloseIcon className="tabClose"></CloseIcon>
      </div>
      <div className="tabItem tabItemOff">
        <p>UnknowFile2</p>
      </div>
    </div>
  );
}
