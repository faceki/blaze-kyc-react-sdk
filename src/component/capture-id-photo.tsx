// @ts-nocheck
import React from "react";
import {
  CameraAlt,
  FlipCameraIos,
  Upload,
  CheckSharp,
} from "@mui/icons-material";
import { Button, Grid, IconButton, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import CheckIcon from "@mui/icons-material/Check";

import KycVerifyCardContainer from "./mainWrapper";
import { isMobile } from "react-device-detect";
import { useInViewport } from "react-in-viewport";
import zIndex from "@mui/material/styles/zIndex";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useClientContext } from "./mainContext";
import LoadingDialog from "./smallLoader";
import axios from "axios";
import { DataURIToBlob } from "../helpers/common";
import { toast } from "react-toastify";

var mobile = require("is-mobile");

export default function CaptureIdPhoto(props: any) {
  const clientContext = useClientContext();

  const myRef: any = useRef();
  const [mobileScreen, setMobileScreen] = useState(mobile());
  const { inViewport, enterCount, leaveCount } = useInViewport(myRef);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [imageQuality, setImageQuality] = useState<any>(null);

  const theme = useTheme();
  const [state, setState] = useState<"capturing" | "captured">("capturing");
  const [img, setImg] = useState<string | null>(null);
  const [selfieMode, setSelfieMode] = useState<boolean>(isMobile);
  const [loading, setLoading] = useState(false);

  const webCamRef: any = useRef<Webcam>(null);

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  const capture = () => {
    try {
      if (webCamRef?.current) {
        const video: any = webCamRef.current.video;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx: any = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageSrc = canvas.toDataURL("image/jpeg");
        setImg(imageSrc);

        var formData = new FormData();
        formData.append("image", DataURIToBlob(imageSrc), "image_r.jpg");
        setLoading(true);

        setState("captured");
        axios
          .post("https://addon.faceki.com/advance/detect", formData)
          .then((res) => {
            setImageQuality(res.data);

            if (
              !res.data.quality ||
              (props?.side == "f"
                ? Number(res.data?.quality) < 110
                : Number(res.data?.quality) < 80) ||
              res.data.objects_detected.length < 1 ||
              res.data?.liveness?.livenessScore < 0.87
            ) {
              toast.error("Image quality check failed");
              retake();
            }
          })
          .catch((err) => {})
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
      // showErrorToast("Error", "Failed to capture photo.");
    }
  };

  const retake = () => {
    try {
      setImg(null);
      setState("capturing");
      setImg(null);
    } catch (error) {}
  };

  const [deviceId, setDeviceId] = useState(null);
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
      let temp = mediaDevices.filter(({ kind }) => kind === "videoinput");
      if (temp.find((x) => x.label == "camera2 0, facing back")) {
        setDeviceId(
          temp.find((x) => x.label == "camera2 0, facing back").deviceId
        );
      } else if (temp.filter((x) => x.deviceId == "") > 0) {
        setDeviceId(null);
      } else {
        setDeviceId(temp[temp.length - 1].deviceId);
      }
    },
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  useEffect(() => {}, [devices]);

  const found = getWindowDimensions();

  return (
    <div ref={myRef} style={{ overflow: "hidden" }}>
      {mobileScreen && (
        <>
          {state === "capturing" ? (
            <>
              {inViewport ? (
                <>
                  <Webcam
                    ref={webCamRef}
                    style={{
                      position: "absolute",
                      top: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    videoConstraints={{
                      facingMode: selfieMode ? "environment" : "user",
                      height: 720,
                      width: 1280,
                      aspectRatio: isMobile ? 1.3 : 1.6,
                      //@ts-ignore
                      deviceId: selfieMode ? deviceId : undefined,
                    }}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={1}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "100vh",
                      position: "absolute",
                      top: 0,
                    }}
                  >
                    <img
                      src={
                        clientContext?.theme?.nextJSImages
                          ? "https://facekiassets.faceki.com/public/kyc-verify/cardbg.png"
                          : require("../assets/images/cardbg.png").default ||
                            require("../assets/images/cardbg.png") ||
                            undefined
                      }
                      alt=""
                      style={{
                        objectFit: "fill",
                        height: "inherit",
                        width: "100vw",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      height: "100vh",
                      width: "100vw",
                      position: "absolute",
                      top: 0,
                      zIndex: 88,
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      height={"100vh"}
                      xs={12}
                      md={12}
                    >
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box width={"100%"} mt={5} textAlign="center">
                          {/* {clientContext?.theme?.logo && (
                            <img
                              src={clientContext?.theme?.logo}
                              width={"100px"}
                              height={"40px"}
                              style={{ objectFit: "contain" }}
                              alt={"logo"}
                            />
                          )}

                          {!clientContext?.theme?.logo && (
                            <Logo
                              style={{
                                height: "40px",
                                width: "100px",
                              }}
                            />
                          )} */}
                        </Box>

                        <Box
                          display={"flex"}
                          flexDirection="row"
                          alignItems="center"
                          width={"100%"}
                        >
                          {props.onBack ? (
                            <IconButton
                              onClick={() => props.onBack?.()}
                              sx={{
                                padding: 0,
                              }}
                            >
                              <ArrowBack
                                sx={{
                                  color: "white",
                                }}
                              />
                            </IconButton>
                          ) : undefined}
                          <Grid
                            container
                            flexDirection="column"
                            justifyContent={"center"}
                            alignItems="center"
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                fontSize: {
                                  xs: 20,
                                  md: 24,
                                },
                              }}
                              color={
                                clientContext?.theme?.headingTextColor ??
                                "white"
                              }
                              fontWeight={700}
                              textAlign="center"
                            >
                              {props.headerText}
                            </Typography>
                            {props?.extraText && (
                              <>
                                <br />
                                <Typography
                                  color={
                                    clientContext?.theme?.secondaryTextColor ??
                                    "white"
                                  }
                                  textAlign="center"
                                >
                                  {props.extraText}
                                </Typography>
                              </>
                            )}
                          </Grid>

                          {true ? (
                            <IconButton
                              onClick={() => props.onHelpPress?.()}
                              sx={{
                                padding: 0,
                              }}
                              style={{ opacity: 0 }}
                            >
                              <InfoOutlined
                                sx={{
                                  color: "#3D3D3D",
                                }}
                              />
                            </IconButton>
                          ) : undefined}
                        </Box>

                        <Typography
                          variant="body2"
                          my={1}
                          textAlign="center"
                          color={
                            clientContext?.theme?.secondaryTextColor ?? "white"
                          }
                        >
                          You'll need to take a photo of your{" "}
                          {String(props?.documenName)?.split("_")[0]}.
                        </Typography>

                        <Box display="flex" justifyContent={"center"}>
                          <Typography
                            variant="body2"
                            sx={{
                              backgroundColor:
                                clientContext?.theme?.secondaryTextColor ??
                                "black",
                              color: "white",
                              px: 2,
                            }}
                          >
                            {props.side === "f"
                              ? String(props?.documenName)?.split("_")[0] ==
                                "Passport"
                                ? "First Page"
                                : "Front Side"
                              : String(props?.documenName)?.split("_")[0] ==
                                "Passport"
                              ? "Second Page"
                              : "Back Side"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }} />

                      <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                        style={{
                          position: "fixed",
                          bottom: "0",
                          marginBottom: "40%",
                        }}
                      >
                        <Grid item>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            flex={1}
                          >
                            <IconButton
                              onClick={() => setSelfieMode(!selfieMode)}
                            >
                              <FlipCameraIos
                                color={
                                  clientContext?.theme?.iconTextColor ?? "white"
                                }
                                style={{
                                  color: "white",
                                }}
                              />
                            </IconButton>
                            <Typography
                              fontSize={8}
                              color={
                                clientContext?.theme?.secondaryTextColor ??
                                "white"
                              }
                            >
                              Flip Camera
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          justifyContent={"center"}
                          alignSelf={"center"}
                        >
                          <Box
                            flex={1}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                borderRadius: "50%",
                                padding: "1px",
                                borderWidth: "1px",
                                borderStyle: "solid",

                                borderColor:
                                  clientContext?.theme?.iconBorderColor ??
                                  "white",
                              }}
                            >
                              <IconButton
                                style={{
                                  width: 60,
                                  height: 60,
                                }}
                                onClick={() => capture()}
                                sx={{
                                  backgroundColor:
                                    clientContext?.theme?.iconFillColor ??
                                    "#F6F6F7",
                                }}
                              >
                                <CameraAlt
                                  color={
                                    clientContext?.theme?.iconTextColor ??
                                    "black"
                                  }
                                />
                              </IconButton>
                            </Box>
                            <Typography
                              fontSize={13}
                              color={
                                clientContext?.theme?.secondaryTextColor ??
                                "white"
                              }
                            >
                              Take Photo
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item style={{ opacity: 0 }}>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            flex={1}
                          >
                            <IconButton
                              onClick={() => setSelfieMode(!selfieMode)}
                            >
                              <FlipCameraIos
                                color={
                                  clientContext?.theme?.iconTextColor ?? "black"
                                }
                              />
                            </IconButton>
                            <Typography
                              fontSize={8}
                              color={
                                clientContext?.theme?.secondaryTextColor ??
                                "black"
                              }
                            >
                              Flip Camera
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </>
              ) : undefined}
            </>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "100vh",
                  position: "absolute",
                  top: 0,
                }}
              >
                <img
                  src={img ?? undefined}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "100vh",
                  position: "absolute",
                  top: 0,
                }}
              >
                <img
                  src={
                    clientContext?.theme?.nextJSImages
                      ? "https://facekiassets.faceki.com/public/kyc-verify/cardbg.png"
                      : require("../assets/images/cardbg.png").default ||
                        require("../assets/images/cardbg.png") ||
                        undefined
                  }
                  alt=""
                  style={{
                    objectFit: "cover",
                    height: "inherit",
                    width: "100vw",
                  }}
                />
              </div>

              <div
                style={{
                  height: "100vh",
                  width: "100vw",
                  position: "absolute",
                  top: 0,
                  zIndex: 88,
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  height={"100vh"}
                  xs={12}
                  md={12}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box width={"100%"} mt={4} textAlign="center">
                      {/* {clientContext?.theme?.logo && (
                        <img
                          src={clientContext?.theme?.logo}
                          width={"100px"}
                          height={"40px"}
                          style={{ objectFit: "contain" }}
                          alt={"logo"}
                        />
                      )}

                      {!clientContext?.theme?.logo && (
                        <Logo
                          style={{
                            height: "40px",
                            width: "100px",
                          }}
                        />
                      )} */}
                    </Box>

                    <Box
                      display={"flex"}
                      flexDirection="row"
                      alignItems="center"
                      width={"100%"}
                    >
                      {props.onBack ? (
                        <IconButton
                          onClick={() => props.onBack?.()}
                          sx={{
                            padding: 0,
                          }}
                        >
                          <ArrowBack
                            sx={{
                              color: "white",
                            }}
                          />
                        </IconButton>
                      ) : undefined}
                      <Grid
                        container
                        flexDirection="column"
                        justifyContent={"center"}
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: {
                              xs: 20,
                              md: 24,
                            },
                          }}
                          fontWeight={700}
                          color={
                            clientContext?.theme?.headingTextColor ?? "white"
                          }
                          textAlign="center"
                        >
                          {props.headerText}
                        </Typography>
                        {props?.extraText && (
                          <>
                            <br />
                            <Typography
                              color={
                                clientContext?.theme?.secondaryTextColor ??
                                "white"
                              }
                              textAlign="center"
                            >
                              {props.extraText}
                            </Typography>
                          </>
                        )}
                      </Grid>

                      {props.onHelpPress ? (
                        <IconButton
                          onClick={() => props.onHelpPress?.()}
                          sx={{
                            padding: 0,
                          }}
                          style={{ opacity: 0 }}
                        >
                          <InfoOutlined
                            sx={{
                              color: "#3D3D3D",
                            }}
                          />
                        </IconButton>
                      ) : undefined}
                    </Box>

                    <Typography
                      variant="body2"
                      my={1}
                      textAlign="center"
                      color={
                        clientContext?.theme?.secondaryTextColor ?? "white"
                      }
                    >
                      You'll need to take a photo of your{" "}
                      {String(props?.documenName)?.split("_")[0]}.
                    </Typography>

                    <Box display="flex" justifyContent={"center"}>
                      <Typography
                        variant="body2"
                        sx={{
                          backgroundColor:
                            clientContext?.theme?.secondaryTextColor ?? "black",
                          color: "white",
                          px: 2,
                        }}
                      >
                        {props.side === "f"
                          ? String(props?.documenName)?.split("_")[0] ==
                            "Passport"
                            ? "First Page"
                            : "Front Side"
                          : String(props?.documenName)?.split("_")[0] ==
                            "Passport"
                          ? "Second Page"
                          : "Back Side"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item style={{ flexGrow: 1 }} />

                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    style={{
                      position: "fixed",
                      bottom: "0",
                      marginBottom: "40%",
                    }}
                  >
                    <Grid
                      item
                      xs={4}
                      justifyContent={"center"}
                      alignSelf={"center"}
                    >
                      <Box
                        flex={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            padding: "1px",
                            borderWidth: "1px",
                            borderStyle: "solid",

                            borderColor:
                              clientContext?.theme?.iconBorderColor ?? "white",
                          }}
                        >
                          <IconButton
                            style={{
                              width: 60,
                              height: 60,
                            }}
                            onClick={() => props?.onConfirm(img)}
                            sx={{
                              backgroundColor:
                                clientContext?.theme?.iconFillColor ??
                                "#F6F6F7",
                            }}
                          >
                            <CheckIcon
                              style={{
                                color:
                                  clientContext?.theme?.iconTextColor ??
                                  "black",
                              }}
                            />
                          </IconButton>
                        </Box>
                        <Typography
                          fontSize={13}
                          color={
                            clientContext?.theme?.secondaryTextColor ?? "white"
                          }
                        >
                          Looks Good
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      justifyContent={"center"}
                      alignSelf={"center"}
                    >
                      <Box
                        flex={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            padding: "1px",
                            borderWidth: "1px",
                            borderStyle: "solid",

                            borderColor:
                              clientContext?.theme?.iconBorderColor ?? "white",
                          }}
                        >
                          <IconButton
                            style={{
                              width: 60,
                              height: 60,
                            }}
                            onClick={() => retake()}
                            sx={{
                              backgroundColor:
                                clientContext?.theme?.iconFillColor ??
                                "#F6F6F7",
                            }}
                          >
                            <ReplayIcon
                              style={{
                                color:
                                  clientContext?.theme?.iconTextColor ??
                                  "black",
                              }}
                            />
                          </IconButton>
                        </Box>
                        <Typography
                          fontSize={13}
                          color={
                            clientContext?.theme?.secondaryTextColor ?? "white"
                          }
                        >
                          Retake
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </>
      )}

      {!mobileScreen && (
        <KycVerifyCardContainer
          onBack={props.onBack}
          onHelpPress={props.onHelp}
          headerText={
            "Verify your " + String(props?.documenName)?.split("_")[0]
          }
        >
          <>
            {state === "capturing" ? (
              <Box>
                <Typography
                  variant="body2"
                  my={1}
                  textAlign="center"
                  color={clientContext?.theme?.secondaryTextColor ?? "black"}
                >
                  You'll need to take a photo of your{" "}
                  {String(props?.documenName)?.split("_")[0]}.
                </Typography>

                <Box display="flex" justifyContent={"center"}>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      px: 2,
                    }}
                    style={{
                      backgroundColor:
                        clientContext?.theme?.textBg || "#f8b427",
                    }}
                  >
                    {props.side === "f"
                      ? String(props?.documenName)?.split("_")[0] == "Passport"
                        ? "First Page"
                        : "Front Side"
                      : String(props?.documenName)?.split("_")[0] == "Passport"
                      ? "Second Page"
                      : "Back Side"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%" + 2,
                    paddingTop: "55%",
                    mx: -2,
                    position: "relative",
                  }}
                >
                  {inViewport ? (
                    <Webcam
                      ref={webCamRef}
                      style={{
                        position: "absolute",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}
                      videoConstraints={{
                        facingMode: selfieMode ? "environment" : "user",

                        aspectRatio: isMobile ? 0.6 : 1.6,
                      }}
                      screenshotFormat="image/jpeg"
                      screenshotQuality={1}
                    />
                  ) : undefined}
                </Box>
                <Box textAlign={"center"}>
                  <Typography
                    variant="body2"
                    mt={0.5}
                    color={clientContext?.theme?.secondaryTextColor ?? "black"}
                  >
                    <small>We'll ask you to enable camera access.</small>
                  </Typography>
                  <Typography
                    color={clientContext?.theme?.secondaryTextColor ?? "black"}
                    mt={-0.5}
                  >
                    <small> More about verification</small>
                  </Typography>
                </Box>
                <Box display={"flex"} mt={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    flex={1}
                  >
                    <IconButton onClick={() => setSelfieMode(!selfieMode)}>
                      <FlipCameraIos
                        style={{
                          color:
                            clientContext?.theme?.iconTextColor || "#f8b427",
                        }}
                      />
                    </IconButton>
                    <Typography
                      color={
                        clientContext?.theme?.secondaryTextColor ?? "black"
                      }
                      fontSize={8}
                    >
                      Flip Camera
                    </Typography>
                  </Box>

                  <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        padding: "1px",
                        borderWidth: "1px",
                        borderStyle: "solid",

                        borderColor:
                          clientContext?.theme?.iconTextColor || "#f8b427",
                      }}
                    >
                      <IconButton
                        onClick={() => capture()}
                        sx={{
                          backgroundColor: "#F6F6F7",
                        }}
                      >
                        <CameraAlt
                          style={{
                            color:
                              clientContext?.theme?.iconTextColor || "#f8b427",
                          }}
                        />
                      </IconButton>
                    </Box>
                    <Typography
                      fontSize={8}
                      color={
                        clientContext?.theme?.secondaryTextColor ?? "black"
                      }
                    >
                      Take Photo
                    </Typography>
                  </Box>

                  <Box flex={1}></Box>
                  {/*<IconButton>
                                <Upload color="secondary" />
                                </IconButton>*/}
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  my={1}
                  textAlign="center"
                  color={clientContext?.theme?.secondaryTextColor ?? "black"}
                >
                  Make sure picture and text are clear
                </Typography>
                <Box
                  sx={{
                    width: "100%" + 2,
                    paddingTop: "60%",
                    mx: -2,
                    mt: 2,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      height: "100%",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={img ?? undefined}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </Box>
                </Box>
                <Box textAlign={"center"} mt={4}>
                  <div>
                    <Button
                      onClick={() => {
                        props?.onConfirm?.(img ?? undefined);
                      }}
                      variant={"outlined"}
                      style={{
                        borderColor:
                          clientContext?.theme?.secondaryBorderColor ?? "black",
                      }}
                    >
                      <Typography
                        color={
                          clientContext?.theme?.secondaryTextColor ?? "black"
                        }
                      >
                        Looks Good
                      </Typography>
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      retake();
                    }}
                  >
                    <Typography
                      color={
                        clientContext?.theme?.secondaryTextColor ?? "black"
                      }
                    >
                      {" "}
                      Retake the photo{" "}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            )}
          </>
        </KycVerifyCardContainer>
      )}

      <LoadingDialog show={loading} message={"Quality check in progress..."} />
    </div>
  );
}
