import React from "react";
import { Link } from "react-router-dom";
export default function Back() {
  return (
    <div>
      <Link to={`/`}>
        <button className="backButton">Back</button>
      </Link>
    </div>
  );
}
