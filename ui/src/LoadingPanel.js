import * as React from "react";
import * as ReactDOM from "react-dom";

const LoadingPanel = () => {
  const loadingPanel = (
    <div className="k-loading-mask" style={{height: "800px"}}>
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image" />
      <div className="k-loading-color" />
    </div>
  );
  const gridContent = document && document.querySelector(".k-grid-content");
  return gridContent
    ? ReactDOM.createPortal(loadingPanel, gridContent)
    : loadingPanel;
};

export default LoadingPanel;