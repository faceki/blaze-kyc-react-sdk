//@ts-nocheck
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { ArrowBack, InfoOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useClientContext } from "./mainContext";
var mobile = require("is-mobile");
export default function MainWrapper(props: any) {
  const clinetContext = useClientContext();
  const [mobileScreen, setMobileScreen] = useState(mobile());
  return (
    <Card
      style={{
        background: clinetContext.theme?.cardBackgroundColor ?? "white",
        height: mobileScreen ? "100vh" : undefined,
      }}
    >
      <CardContent
        sx={{ p: 2 }}
        className={props?.noPadding ? "noPadding" : ""}
      >
        {/* <Box width={"100%"} mb={2} textAlign="center" >
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
            <Logo
              style={{
                height: "40px",
                width: "100px",
              }}
            />
          )}
        </Box> */}

        <Box
          display={"flex"}
          flexDirection="row"
          alignItems="center"
          mt={mobileScreen ? "5%" : undefined}
          marginBottom={mobileScreen ? "20%" : props?.specficMargin}
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
              fontWeight={700}
              color={clinetContext?.theme?.headingTextColor ?? "black"}
              textAlign="center"
            >
              {props.headerText}
            </Typography>
            {props?.extraText && (
              <>
                <br />
                <Typography
                  color={clinetContext?.theme?.secondaryTextColor ?? "black"}
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
              {/* <InfoOutlined
                sx={{
                  color: "#3D3D3D",
                }}
              /> */}
            </IconButton>
          ) : undefined}
        </Box>

        <Box {...props?.BoxProps}>{props.children}</Box>

        {!mobileScreen && (
          <Box
            mt={4}
            display={"flex"}
            flexDirection="row"
            justifyContent="space-between"
          >
            <img src={require('../assets/images/kyc-verify/footer-logo.png').default || require('../assets/images/kyc-verify/footer-logo.png')} height={25} width={60} />
            {props.onConfirm ? (
              <Button
                onClick={() => {
                  props.onConfirm?.();
                }}
                style={{
                  backgroundColor:clinetContext?.theme?.buttonbg || "#f8b427"
                }}
                variant={"contained"}
              >
                {props.confirmButtonText ?? "Next >"}
              </Button>
            ) : undefined}
          </Box>
        )}
        {mobileScreen && (
          <Box
            mt={4}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            style={{
              position: "absolute",
              bottom: "18%",
              width: "90%",
            }}
          >
 
            <img src={ require('../assets/images/kyc-verify/footer-logo.png').default || require('../assets/images/kyc-verify/footer-logo.png') || undefined} height={25} width={60} />
            {props.onConfirm ? (
              <Button
                onClick={() => {
                  props.onConfirm?.();
                }}
                variant={"contained"}
                style={{
                  backgroundColor:clinetContext?.theme?.buttonbg || "#f8b427"
                }}
              >
                {props.confirmButtonText ?? "Next >"}
              </Button>
            ) : undefined}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
