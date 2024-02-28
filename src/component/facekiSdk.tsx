import React, { useEffect } from "react";
import { ClientProvider, clientContext } from "./mainContext"; // Update the path accordingly
import FacekiSDKComponent from "./facekiWrapper"; // Update the path to your main component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FacekiSDK = function (props: clientContext) {
  const { link, theme, onSuccess, onFail } = props;

  useEffect(() => {
    if (!link) {
      console.error("Please Provide Generated Link ID");
    }
  }, []);
  return (
    <ClientProvider
      link={link}
      theme={theme}
      onSuccess={onSuccess}
      onFail={onFail}
    >
      <FacekiSDKComponent />
      <ToastContainer />
    </ClientProvider>
  );
};

export default FacekiSDK;
