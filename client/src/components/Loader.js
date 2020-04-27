import React from "react";

export const Loader = () => (
  <div
    className="container"
    style={{
      display: "flex",
      justifyContent: "center",
      paddingTop: "4rem",
    }}
  >
    <div className="center-align preloader-wrapper active">
      <div className="spinner-layer spinner-red-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  </div>
);
