import React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import "./Nav.css";
export default function Nav() {
  return (
    <div className="nav">
      <div className="navLogo">
        <AdbIcon sx={{ color: "#E6F7FF" }}></AdbIcon>
        <p className="navLogoText">BugFinder</p>
      </div>
    </div>
  );
}
