import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import FacekiSDK from "./component/facekiSdk";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FacekiSDK
      link={"#"}
    />
  </React.StrictMode>
);

