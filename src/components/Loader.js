import React from "react";

function Loader({ imageLoader }) {
  return (
    <div className={`${imageLoader ? "w-8 h-8" : "w-12 h-12"}`}>
      <div className="h-full w-full loader animate-spin rounded-full"></div>
    </div>
  );
}

export default Loader;
