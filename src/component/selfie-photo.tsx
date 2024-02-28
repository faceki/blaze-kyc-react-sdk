// @ts-nocheck
import React from "react";

import {
  CameraAlt,
  FlipCameraIos,
  Upload,
  CheckSharp,
  CheckCircleOutline,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import CheckIcon from "@mui/icons-material/Check";
import "../assets/css/take-selfie-styles.css";
import KycVerifyCardContainer from "./mainWrapper";
import { isMobile } from "react-device-detect";
import { useInViewport } from "react-in-viewport";
import zIndex from "@mui/material/styles/zIndex";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useClientContext } from "./mainContext";

var mobile = require("is-mobile");

export default function CaptureIdPhoto(props: any) {
  const myRef: any = useRef();
  const clinetContext = useClientContext();

  const [mobileScreen, setMobileScreen] = useState(mobile());
  const { inViewport, enterCount, leaveCount } = useInViewport(myRef);

  const theme = useTheme();
  const [state, setState] = useState<"capturing" | "captured">("capturing");
  const [img, setImg] = useState<string | null>(null);
  const [selfieMode, setSelfieMode] = useState<boolean>(false);

  const webCamRef = useRef<Webcam>(null);

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

        props?.onConfirm(imageSrc);
        setState("captured");
      }
    } catch (error) {
      // showErrorToast("Error", "Failed to capture photo.");
    }
  };

  const retake = () => {
    try {
      setImg(null);
      setState("capturing");
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
    <div
      ref={myRef}
      style={{ overflow: "hidden", borderRadius: !mobileScreen ? "2rem" : "" }}
    >
      {mobileScreen && (
        <>
          {state === "capturing" ? (
            <>
              {inViewport ? (
                <>
                  <Webcam
                    mirrored
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
                        clinetContext?.theme?.nextJSImages
                          ? "https://facekiassets.faceki.com/public/kyc-verify/selfie_overlay.png"
                          : require("../assets/images/selfie.png").default ||
                            require("../assets/images/selfie.png")
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
                        <Box width={"100%"} mt={6} textAlign="center"></Box>

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
                                clinetContext?.theme?.headingTextColor ??
                                "white"
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
                                    clinetContext?.theme?.secondaryTextColor ??
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
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }} />

                      <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                        style={{
                          position: "fixed",
                          bottom: "0",
                          marginBottom: "4%",
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
                                style={{
                                  color:
                                    clinetContext?.theme?.iconTextColor ??
                                    "white",
                                }}
                              />
                            </IconButton>
                            <Typography
                              fontSize={8}
                              color={
                                clinetContext?.theme?.secondaryTextColor ??
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
                                  clinetContext?.theme?.iconBorderColor ??
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
                                    clinetContext?.theme?.iconFillColor ??
                                    "#F6F6F7",
                                }}
                              >
                                <CameraAlt
                                  color={
                                    clinetContext?.theme?.iconTextColor ??
                                    "black"
                                  }
                                />
                              </IconButton>
                            </Box>
                            <Typography
                              fontSize={13}
                              color={
                                clinetContext?.theme?.secondaryTextColor ??
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
                                  clinetContext?.theme?.iconTextColor ?? "black"
                                }
                              />
                            </IconButton>
                            <Typography
                              fontSize={8}
                              color={
                                clinetContext?.theme?.secondaryTextColor ??
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
                    clinetContext?.theme?.nextJSImages
                      ? "https://facekiassets.faceki.com/public/kyc-verify/pattern.png"
                      : require("../assets/images/kyc-verify/pattern.png")
                          .default ||
                        require("../assets/images/kyc-verify/pattern.png") ||
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
                    <Box width={"100%"} mb={1} textAlign="center">
                      {clinetContext?.theme?.logo && (
                        <img
                          src={clinetContext?.theme?.logo}
                          width={"100px"}
                          height={"40px"}
                          style={{ objectFit: "contain" }}
                          alt={"logo"}
                        />
                      )}

                      {!clinetContext?.theme?.logo && (
                        <img
                          src={
                            clinetContext?.theme?.nextJSImages
                              ? "https://facekiassets.faceki.com/public/kyc-verify/logo_faceki.png"
                              : require("../assets/images/kyc-verify/logo_faceki.png")
                                  .default ||
                                require("../assets/images/kyc-verify/logo_faceki.png")
                          }
                          style={{
                            height: "40px",
                            width: "100px",
                          }}
                        />
                      )}
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
                              color: "#3D3D3D",
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
                            clinetContext?.theme?.headerTextColor ?? "black"
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
                                clinetContext?.theme?.secondaryTextColor ??
                                "black"
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
                        >
                          <InfoOutlined
                            sx={{
                              color: "#3D3D3D",
                            }}
                          />
                        </IconButton>
                      ) : undefined}
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

                            borderColor: theme.palette.primary.main,
                          }}
                        >
                          <IconButton
                            style={{
                              width: 60,
                              height: 60,
                            }}
                            onClick={() => props?.onConfirm(img)}
                            sx={{
                              backgroundColor: "#F6F6F7",
                            }}
                          >
                            <CheckIcon color="primary" />
                          </IconButton>
                        </Box>
                        <Typography
                          fontSize={13}
                          color={
                            clinetContext?.theme?.secondaryTextColor ?? "black"
                          }
                        >
                          Looks Good?
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

                            borderColor: theme.palette.primary.main,
                          }}
                        >
                          <IconButton
                            style={{
                              width: 60,
                              height: 60,
                            }}
                            onClick={() => retake()}
                            sx={{
                              backgroundColor: "#F6F6F7",
                            }}
                          >
                            <ReplayIcon color="primary" />
                          </IconButton>
                        </Box>
                        <Typography
                          fontSize={13}
                          color={
                            clinetContext?.theme?.secondaryTextColor ?? "black"
                          }
                        >
                          Retake?
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
        <Card
          ref={myRef}
          style={{
            position: "relative",
            aspectRatio: isMobile ? 0.8 : 0.8,
          }}
        >
          {inViewport ? (
            <Webcam
              mirrored
              screenshotFormat="image/jpeg"
              ref={webCamRef}
              style={{
                width: "100%",
              }}
              videoConstraints={{
                facingMode: selfieMode ? "environment" : "user",
                aspectRatio: isMobile ? 1.5 : 0.8,
              }}
            />
          ) : undefined}

          <div className="take-selfie"></div>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              m: 2,
              backgroundColor: "transparent",
            }}
          >
            <Box display={"flex"} flexDirection="row" alignItems="center">
              {props.onBack ? (
                <IconButton
                  onClick={() => props.onBack?.()}
                  sx={{
                    padding: 0,
                  }}
                >
                  <ArrowBack
                    sx={{
                      color: "#3D3D3D",
                    }}
                  />
                </IconButton>
              ) : undefined}
              <Typography
                flexGrow={1}
                variant="h5"
                sx={{
                  fontSize: {
                    xs: 20,
                    md: 24,
                  },
                }}
                color={clinetContext?.theme?.headerTextColor ?? "black"}
                textAlign="center"
                fontWeight={700}
              >
                Verify that it’s you
              </Typography>
              {props.onHelpPress ? (
                <IconButton
                  onClick={() => props.onHelpPress?.()}
                  sx={{
                    padding: 0,
                  }}
                  style={{
                    opacity: 0,
                  }}
                >
                  <InfoOutlined
                    sx={{
                      color: "#3D3D3D",
                    }}
                  />
                </IconButton>
              ) : undefined}
            </Box>

            <Grid
              container
              sx={{
                position: "absolute",
                width: "100%",
                bottom: 0,
              }}
            >
              <Grid
                item
                xs={4}
                display="flex"
                alignItems={"center"}
                flexDirection={"column"}
              ></Grid>
              <Grid
                item
                xs={4}
                display="flex"
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    padding: "1px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor:
                      clinetContext?.theme?.iconTextColor || "#f8b427",
                  }}
                >
                  <IconButton
                    onClick={() => (img ? props.onConfirm?.(img) : capture())}
                    sx={{
                      backgroundColor: "#red",
                    }}
                  >
                    {img ? (
                      <CheckCircleOutline fontSize="large" color="success" />
                    ) : (
                      <CameraAlt
                        fontSize="large"
                        style={{
                          color:
                            clinetContext?.theme?.iconTextColor || "#f8b427",
                        }}
                      />
                    )}
                  </IconButton>
                </Box>
                <Typography
                  sx={{
                    fontSize: "8px",
                  }}
                >
                  {img ? "Verify" : "Take Photo"}
                </Typography>
              </Grid>

              <Grid item xs={4} textAlign="center">
                <IconButton onClick={() => setSelfieMode(!selfieMode)}>
                  <FlipCameraIos
                    style={{
                      color: clinetContext?.theme?.iconTextColor || "#f8b427",
                    }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: "8px",
                  }}
                >
                  Flip Camera
                </Typography>
              </Grid>
            </Grid>

            <Box
              mt={4}
              pb={2}
              display={"flex"}
              flexDirection="row"
              justifyContent="space-between"
            >
              <img
                src={
                  clinetContext?.theme?.nextJSImages
                    ? "https://facekiassets.faceki.com/public/kyc-verify/footer-logo.png"
                    : require("../assets/images/kyc-verify/footer-logo.png")
                        .default ||
                      require("../assets/images/kyc-verify/footer-logo.png")
                }
                height={25}
                width={60}
              />
            </Box>
          </Box>
        </Card>
      )}
    </div>
  );
}
