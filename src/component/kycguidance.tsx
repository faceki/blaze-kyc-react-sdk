import { Grid, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";

import KycVerifyCardContainer from "./mainWrapper";
import React from "react";
import Lottie from "lottie-react";
import GuidanceAni from "../assets/jsons/lottieGuidance.json";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function KycVerifyGuidance(props: any) {
  // const theme = useTheme();
  return (
    <KycVerifyCardContainer
      onConfirm={props.onNext}
      headerText="Verify your identity"
    >
      <Grid
        item
        direction="column"
        justifyContent="center"
        alignItems="center"

      >
        <Typography    variant="subtitle1" align="center">
          You will need to take a picture of your face and documents
        </Typography>
      </Grid>
      <Lottie animationData={GuidanceAni} loop={true} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight={700}>
          For the best picture result
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <LightModeIcon fontSize="small" style={{ marginRight: "8px" }} />
          Find an area for good lighting
        </Typography>
      </Grid>
      {/* <Carousel
                indicatorIconButtonProps={{
                    style: { color: "#acacac" },
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: theme.palette.primary.main,
                    },
                }}
                sx={{
                    height: "400px !important",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <Slide1
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "250px",
                        }}
                    />
                    <Typography>Document Scan</Typography>
                    <Typography>
                        <small>
                            Will ask you to take a picture of your document
                        </small>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <Slide2
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "250px",
                        }}
                    />
                    <Typography>Verify Scan</Typography>
                    <Typography>
                        <small>
                            Data will be stored and may be used according to the
                            Stripe Privacy and the Rocket Rides Privacy Policy.
                        </small>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <Slide3
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "250px",
                        }}
                    />
                    <Typography>Take Selfie</Typography>
                    <Typography>
                        <small>
                            Data will be stored and may be used according to the
                            Stripe Privacy and the Rocket Rides Privacy Policy.
                        </small>
                    </Typography>
                </Box>
            </Carousel> */}
    </KycVerifyCardContainer>
  );
}
