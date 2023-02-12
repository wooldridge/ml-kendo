import * as React from "react";
import * as ReactDOM from "react-dom";
import { toODataString } from "@progress/kendo-data-query";

const toMLString = (dataState) => {
  return `start=${(dataState.skip + dataState.take)/dataState.take}&pageLength=${dataState.take}`;
}

const DataLoader = (props) => {
  // const baseUrl =
  //   "https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&";
  // const baseUrl =
  //   "http://localhost:8092/v1/search?format=json&q=Drive&";
  const baseUrl =
    "http://localhost:8092/v1/search?format=json&";
  const init = {
    method: "GET",
    accept: "application/json",
    headers: {},
  };
  const lastSuccess = React.useRef("");
  const pending = React.useRef("");
  const requestDataIfNeeded = () => {
    if (
      pending.current ||
      // toODataString(props.dataState) === lastSuccess.current
      toMLString(props.dataState) === lastSuccess.current
    ) {
      return;
    }
    console.log("props.dataState", props.dataState);
    // pending.current = toODataString(props.dataState);
    pending.current = toMLString(props.dataState);
    console.log("pending.current", pending.current);
    fetch(baseUrl + pending.current, init)
    // fetch(baseUrl, init)
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        lastSuccess.current = pending.current;
        pending.current = "";
        // if (toODataString(props.dataState) === lastSuccess.current) {
        if (toMLString(props.dataState) === lastSuccess.current) {
          props.onDataReceived.call(undefined, {
            // data: json.value,
            data: json.results,
            // total: json["@odata.count"],
            total: json.total,
          });
        } else {
          requestDataIfNeeded();
        }
      });
  };
  requestDataIfNeeded();
  return pending.current ? <LoadingPanel /> : null;
};
const LoadingPanel = () => {
  const loadingPanel = (
    <div className="k-loading-mask">
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

export default DataLoader;