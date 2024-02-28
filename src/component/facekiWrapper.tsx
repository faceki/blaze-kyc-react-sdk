//@ts-nocheck
import React, { useEffect, useState } from "react";
import "../assets/css/App.css";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CaptureIdPhoto from "../component/capture-id-photo";
import SelfiePhoto from "../component/selfie-photo";
import useApiService from "../api-services/faceki-Service";
import Carousel from "react-material-ui-carousel";
import { DataURIToBlob } from "../helpers/common";
import Lottie from "lottie-react";

import loadingAni from "../assets/jsons/lottieLoading.json";
import failedAni from "../assets/jsons/lottieFail.json";
import SucessAni from "../assets/jsons/lottieSuccess.json";
import loadingFirst from "../assets/jsons/lottieFirstLoading.json";
import KycVerifyGuidance from "./kycguidance";
import SelectDocument from "./selectedDocument";
import { useClientContext } from "./mainContext";
import StepsCard from "./stepCard";

import { toast } from "react-toastify";
var mobile = require("is-mobile");
function FacekiSDKWrapper(props: any) {
  const clientContext = useClientContext();
  const {
    GetWorkFlowsRules,
    submitKYCRequest,
  } = useApiService("https://sdk.faceki.com");

  const [dataCapture, setDataCapture] = useState<any>({});
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [verificationRules, setVerificationRules] = useState<any>(null);

  const [mobileScreen, setMobileScreen] = useState(mobile());
  const [stepIndex, setStepIndex] = useState(
    clientContext?.theme?.disableGuidance ? 1 : 0
  );
  const [documentRequired, setDocumentRequired] = useState<any>([]);
  const [allowSingle, setAllowSingle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    try {
      setFirstLoading(true);
      // GetKYCRules()
      //   .then((res) => {
      //     setDocumentRequired(res.data?.allowedKycDocuments);
      //     setAllowSingle(res.data?.allowSingle);
      //     if (!res.data?.allowSingle) {
      //       let tempArray: any = [];
      //       tempArray.push(
      //         <KycVerifyGuidance
      //           onNext={(img) => {
      //             setStepIndex((prevStepIndex) => prevStepIndex + 1);
      //           }}
      //           onBack={() => {
      //             setStepIndex((prevStepIndex) => prevStepIndex - 1);
      //           }}
      //         />
      //       );

      //       tempArray.push(
      //         <StepsCard
      //           specificMargin={"0"}
      //           onConfirm={(img) => {
      //             setStepIndex((prevStepIndex) => prevStepIndex + 1);
      //           }}
      //           onBack={() => {
      //             setStepIndex((prevStepIndex) => prevStepIndex - 1);
      //           }}
      //           allowedDocs={res.data?.allowedKycDocuments}
      //         />
      //       );

      //       for (
      //         let index = 0;
      //         index < res.data?.allowedKycDocuments.length;
      //         index++
      //       ) {
      //         const element = res.data?.allowedKycDocuments[index];
      //         if (element != "Passport") {
      //           tempArray.push(
      //             <CaptureIdPhoto
      //               documenName={element}
      //               headerText={"Verify Your " + element}
      //               side="f"
      //               onConfirm={(img) => {
      //                 handleClick(img, element, "front");
      //               }}
      //               onBack={() => {
      //                 setStepIndex((prevStepIndex) => prevStepIndex - 1);
      //               }}
      //               onHelpPress={() => {}}
      //             />
      //           );
      //           tempArray.push(
      //             <CaptureIdPhoto
      //               documenName={element}
      //               headerText={"Verify Your " + element}
      //               side="b"
      //               onConfirm={(img) => {
      //                 handleClick(img, element, "back");
      //               }}
      //               onBack={() => {
      //                 setStepIndex((prevStepIndex) => prevStepIndex - 1);
      //               }}
      //               onHelpPress={() => {}}
      //             />
      //           );
      //         } else {
      //           tempArray.push(
      //             <CaptureIdPhoto
      //               documenName={element}
      //               headerText={"Verify Your " + element}
      //               side="f"
      //               onConfirm={(img) => {
      //                 handleClick(img, element, "front");
      //               }}
      //               onBack={() => {
      //                 setStepIndex((prevStepIndex) => prevStepIndex - 1);
      //               }}
      //               onHelpPress={() => {}}
      //             />
      //           );
      //         }
      //       }
      //       tempArray.push(
      //         <SelfiePhoto
      //           documenName={"selfie"}
      //           headerText={"Take Your Selfie"}
      //           side="b"
      //           onConfirm={(img) => {
      //             setStepIndex((prevStepIndex) => prevStepIndex + 1);
      //             onSubmit(img);
      //           }}
      //           onBack={() => {
      //             setStepIndex((prevStepIndex) => prevStepIndex - 1);
      //           }}
      //           onHelpPress={() => {}}
      //         />
      //       );
      //       setItems(tempArray);
      //     } else {
      //       let tempArray: any = [];
      //       tempArray.push(
      //         <KycVerifyGuidance
      //           onNext={(img) => {
      //             setStepIndex((prevStepIndex) => prevStepIndex + 1);
      //           }}
      //           onBack={() => {
      //             setStepIndex((prevStepIndex) => prevStepIndex - 1);
      //           }}
      //         />
      //       );

      //       setItems(tempArray);
      //     }
      //     // setAllowSingle(true)
      //   })
      //   .finally(() => {
      //     setFirstLoading(false);
      //   });

      GetWorkFlowsRules(clientContext.link)
        .then((res) => {
          const { result } = res;
          setVerificationRules(result)
          setDocumentRequired(result.documents);
          setAllowSingle(result.document_optional);
          if (!result.document_optional) {
            let tempArray: any = [];
            tempArray.push(
              <KycVerifyGuidance
                onNext={(img) => {
                  setStepIndex((prevStepIndex) => prevStepIndex + 1);
                }}
                onBack={() => {
                  setStepIndex((prevStepIndex) => prevStepIndex - 1);
                }}
              />
            );

            tempArray.push(
              <StepsCard
                specificMargin={"0"}
                onConfirm={(img) => {
                  setStepIndex((prevStepIndex) => prevStepIndex + 1);
                }}
                onBack={() => {
                  setStepIndex((prevStepIndex) => prevStepIndex - 1);
                }}
                allowedDocs={result.documents}
              />
            );

            for (let index = 0; index < result.documents.length; index++) {
              const element = result.documents[index];
              if (element != "Passport") {
                tempArray.push(
                  <CaptureIdPhoto
                    documenName={element}
                    headerText={"Verify Your " + element}
                    side="f"
                    onConfirm={(img) => {
                      handleClick(img, element, "front");
                    }}
                    onBack={() => {
                      setStepIndex((prevStepIndex) => prevStepIndex - 1);
                    }}
                    onHelpPress={() => {}}
                  />
                );
                tempArray.push(
                  <CaptureIdPhoto
                    documenName={element}
                    headerText={"Verify Your " + element}
                    side="b"
                    onConfirm={(img) => {
                      handleClick(img, element, "back");
                    }}
                    onBack={() => {
                      setStepIndex((prevStepIndex) => prevStepIndex - 1);
                    }}
                    onHelpPress={() => {}}
                  />
                );
              } else {
                tempArray.push(
                  <CaptureIdPhoto
                    documenName={element}
                    headerText={"Verify Your " + element}
                    side="f"
                    onConfirm={(img) => {
                      handleClick(img, element, "front");
                    }}
                    onBack={() => {
                      setStepIndex((prevStepIndex) => prevStepIndex - 1);
                    }}
                    onHelpPress={() => {}}
                  />
                );
              }
            }
            tempArray.push(
              <SelfiePhoto
                documenName={"selfie"}
                headerText={"Take Your Selfie"}
                side="b"
                onConfirm={(img) => {
                  setStepIndex((prevStepIndex) => prevStepIndex + 1);
                  onSubmit(img);
                }}
                onBack={() => {
                  setStepIndex((prevStepIndex) => prevStepIndex - 1);
                }}
                onHelpPress={() => {}}
              />
            );
            setItems(tempArray);
          } else {
            let tempArray: any = [];
            tempArray.push(
              <KycVerifyGuidance
                onNext={(img) => {
                  setStepIndex((prevStepIndex) => prevStepIndex + 1);
                }}
                onBack={() => {
                  setStepIndex((prevStepIndex) => prevStepIndex - 1);
                }}
              />
            );

            setItems(tempArray);
          }
        })
        .finally(() => {
          setFirstLoading(false);
        });
    } catch (error) {
      console.log(error);
      // console.clear();
    }
  }, []);

  const handleClick = (img, element, side) => {
    setStepIndex((prevStepIndex) => prevStepIndex + 1);
    if (element == "ID Card" && side == "front") {
      element = "id-front_image";
    } else if (element == "ID Card" && side == "back") {
      element = "id-back_image";
    } else if (element == "Passport" && side == "front") {
      element = "pp-front_image";
    } else if (element == "Driving License" && side == "front") {
      element = "dl-front_image";
    } else if (element == "Driving License" && side == "back") {
      element = "dl-back_image";
    } else if (element == "selfie") {
      element = "selfie";
    }
    setDataCapture((previousValue) => {
      return { ...previousValue, [element]: img };
    });
  };

  const onSubmit = async (selfie) => {
    var data = {};
    setLoading(true);
    if (allowSingle) {
      var formData = new FormData();
      formData.append(
        "document_1_front",
        DataURIToBlob(dataCapture.document_1_front)
      );
      formData.append(
        "document_1_back",
        DataURIToBlob(dataCapture.document_1_back)
      );
      formData.append("selfie", DataURIToBlob(selfie));
      formData.append("workflowId", verificationRules.workflowId);
      formData.append("link", clientContext?.link);

      submitKYCRequest(formData)
        .then((res) => {
          if (res.result.decision == "ACCEPTED") {
            setSuccess(true);
            if (clientContext?.onSuccess) {
              clientContext?.onSuccess(res);
            }
          } else {
            setFailed(true);
            if (clientContext?.onFail) {
              clientContext?.onFail(res);
            }
          }
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      let foundValues = {};
      let _verificationRules = null;
      await new Promise((resolve, reject) => {
        setDataCapture((valuFound) => {
          foundValues = valuFound;
          return valuFound;
        });

        setVerificationRules((valuFound) => {
          _verificationRules = valuFound;
          return valuFound;
        });

        setTimeout(() => {
          resolve(foundValues);
        }, 200);
      }).finally(() => {
        var formData = new FormData();

        const groupedData = {};

        for (const key in foundValues) {
          const prefix = key.slice(0, 2);
          const imageType = key.slice(3).split("_")[0];

          if (!groupedData[prefix]) {
            groupedData[prefix] = { front: "", back: "" };
          }

          if (key.includes("front")) {
            groupedData[prefix].front = foundValues[key];
          } else if (key.includes("back")) {
            groupedData[prefix].back = foundValues[key];
          }
        }

        for (let index = 0; index < Object.keys(groupedData).length; index++) {
          const objectKey = Object.keys(groupedData)[index];
          const objectValue = groupedData[objectKey];

          formData.append(
            `document_${index + 1}_front`,
            DataURIToBlob(objectValue.front)
          );

          if (objectValue.back) {
            formData.append(
              `document_${index + 1}_back`,
              DataURIToBlob(objectValue.back)
            );
          }
        }
        formData.append("selfie", DataURIToBlob(selfie));

        formData.append("workflowId", _verificationRules.workflowId);
        formData.append("link", clientContext?.link);


        submitKYCRequest(formData)
          .then((res) => {
            if (res.result.decision == "ACCEPTED") {
              setSuccess(true);
              if (clientContext?.onSuccess) {
                clientContext?.onSuccess(res);
              }
            } else {
              if (
                [8004, 8005, 8006, 8007, 8008, 8009, 5004].includes(res?.code)
              ) {
                setStepIndex((prevStepIndex) => prevStepIndex - 1);
                toast.error("Selfie Liveness Failed! Try Again");
              } else {
                setFailed(true);
                if (clientContext?.onFail) {
                  clientContext?.onFail(res);
                }
              }
            }
          })
          .catch((err) => {})
          .finally(() => {
            setLoading(false);
          });
      });
    }
  };

  return (
    <Grid
      container
      direction={mobileScreen ? "column" : "row"}
      justifyContent="center"
      alignItems="center"
      bgcolor={clientContext?.theme?.backgroundColor ?? "rgb(49, 51, 78)"}
      height={"100vh"}
      width={"100vw"}
    >
      {firstLoading && !loading && !success && !failed && (
        <Box
          display="flex"
          alignItems={"center"}
          width="100%"
          flexDirection="column"
        >
          {clientContext?.theme?.logo && (
            <img
              src={clientContext?.theme?.logo}
              width={700}
              height={70}
              style={{ objectFit: "contain" }}
              alt={"logo"}
            />
          )}
          <Grid xs={8} sm={4} md={2} width={"100%"}>
            <Lottie animationData={loadingFirst} loop={true} />
          </Grid>
        </Box>
      )}
      {loading && !success && !failed && !firstLoading && (
        <Box
          display="flex"
          alignItems={"center"}
          width="100%"
          flexDirection="column"
        >
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Typography mt={2} color="white" align="center">
              {clientContext.theme?.verificationProcessingText || (
                <>
                  <Typography ml={4} mr={4}>
                    Your documents are being processed at lightning speed!
                  </Typography>
                  <Typography>It'll only take a few seconds.</Typography>
                </>
              )}
            </Typography>
          </Grid>
          <Grid xs={8} sm={4} md={2} width={"100%"}>
            <Lottie animationData={loadingAni} loop={true} />
          </Grid>
        </Box>
      )}
      {!loading && !success && !failed && !firstLoading && (
        <Grid
          item
          xs={mobileScreen ? 12 : 4}
          width={mobileScreen ? "100vw" : ""}
          bgcolor={clientContext?.theme?.cardBackgroundColor ?? "white"}
          borderRadius={mobileScreen ? undefined : 40}
          className={!mobileScreen ? "rad" : ""}
        >
          {allowSingle && (
            <Carousel
              indicators={false}
              autoPlay={false}
              swipe={false}
              navButtonsAlwaysInvisible={false}
              navButtonsProps={{
                style: {
                  display: "none",
                },
              }}
              indicatorIconButtonProps={{
                style: { color: "#acacac" },
              }}
              sx={{
                height: "100%",
              }}
              index={stepIndex}
              height={mobileScreen ? "100vh" : undefined}
              borderRadius={mobileScreen ? undefined : 40}
              className={!mobileScreen ? "rad" : ""}
            >
              {items}
              <SelectDocument
                disabled={false}
                onConfirm={(doc: any) => {
                  if (!doc) {
                    toast.error("Please Select Document First");
                    return;
                  }
                  setSelectedDoc(doc);
                  setStepIndex((prevStepIndex) => prevStepIndex + 1);
                }}
                onBack={
                  !clientContext?.theme?.disableGuidance
                    ? () => {
                        if (!clientContext?.theme?.disableGuidance) {
                          setStepIndex((prevStepIndex) => prevStepIndex - 1);
                        }
                      }
                    : null
                }
                onHelp={() => {}}
                allowedDocs={documentRequired ?? []}
              />
              <StepsCard
                onConfirm={(img) => {
                  setStepIndex(stepIndex + 1);
                }}
                onBack={() => {
                  setStepIndex(stepIndex - 1);
                }}
                allowedDocs={[selectedDoc]}
              />

              <CaptureIdPhoto
                documenName={selectedDoc}
                headerText={"Verify Your " + selectedDoc}
                side="f"
                onConfirm={(img) => {
                  setStepIndex(stepIndex + 1);
                  setDataCapture({ ...dataCapture, document_1_front: img });
                }}
                onBack={() => {
                  setStepIndex(stepIndex - 1);
                }}
                onHelpPress={() => {}}
              />

              <CaptureIdPhoto
                documenName={selectedDoc}
                headerText={"Verify Your " + selectedDoc}
                side="b"
                onConfirm={(img) => {
                  setStepIndex(stepIndex + 1);
                  setDataCapture({ ...dataCapture, document_1_back: img });
                }}
                onBack={() => {
                  setStepIndex(stepIndex - 1);
                }}
                onHelpPress={() => {}}
              />
              <SelfiePhoto
                documenName={"selfie"}
                headerText={"Take Your Selfie"}
                side="b"
                onConfirm={(img) => {
                  setStepIndex(stepIndex + 1);
                  onSubmit(img);
                }}
                onBack={() => {
                  setStepIndex(stepIndex - 1);
                }}
                onHelpPress={() => {}}
              />
            </Carousel>
          )}

          {!allowSingle && (
            <Carousel
              indicators={false}
              autoPlay={false}
              swipe={false}
              navButtonsAlwaysInvisible={false}
              navButtonsProps={{
                style: {
                  display: "none",
                },
              }}
              indicatorIconButtonProps={{
                style: { color: "#acacac" },
              }}
              sx={{
                height: "100%",
              }}
              index={stepIndex}
            >
              {items}
            </Carousel>
          )}
        </Grid>
      )}

      {!loading && success && !failed && !firstLoading && (
        <Box
          display="flex"
          alignItems={"center"}
          width="100%"
          flexDirection="column"
          sx={
            {
              // overflowX: "hidden",
            }
          }
        >
          {/* <LogoAlt className="logo-loading-anim" height={70} width={700} /> */}

          <Grid xs={8} sm={4} md={2} width={"100%"}>
            <Lottie animationData={SucessAni} loop={true} />
          </Grid>
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Typography mt={2} color="white" align="center">
              {clientContext.theme?.successText || "Success"}
            </Typography>
          </Grid>
        </Box>
      )}

      {!loading && !success && failed && !firstLoading && (
        <Box
          display="flex"
          alignItems={"center"}
          width="100%"
          flexDirection="column"
          sx={
            {
              // overflowX: "hidden",
            }
          }
        >
          {/* <LogoAlt className="logo-loading-anim" height={70} width={700} /> */}

          <Grid xs={8} sm={4} md={2} width={"100%"}>
            <Lottie animationData={failedAni} loop={true} />
          </Grid>
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Typography mt={2} color="white" align="center">
              {clientContext.theme?.failedText || (
                <>
                  <Typography>Extra Check Required!</Typography>
                  <Typography> Contact us for more information</Typography>
                </>
              )}
            </Typography>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

export default FacekiSDKWrapper;
