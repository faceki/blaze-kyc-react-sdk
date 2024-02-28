import { Radio, SxProps, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import KycVerifyCardContainer from "./mainWrapper";
import { useState } from "react";
import { useClientContext } from "./mainContext";

import React from "react";

const style: SxProps = {
  p: 1,
  backgroundColor: "#4C4E640D",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderRadius: "8px",
  cursor: "pointer",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",
};

export default function SelectDocument(props: any) {
  const theme = useTheme();
  const clinetContext = useClientContext();

  const [selectedDoc, setSelectedDoc] = useState<string>();

  return (
    <KycVerifyCardContainer
      height={props?.height}
      onBack={props.onBack}
      onConfirm={() => props.onConfirm?.(selectedDoc)}
      onHelpPress={props.onHelp}
      headerText="Verify your identity"
    >
      <Box pb={5}>
        <Typography variant="body2" my={1} textAlign="center">
          Select a document type..
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          {props?.allowedDocs?.map((doc: any, i: any) => (
            <Box
              key={i}
              sx={{
                ...style,
                borderColor: doc === selectedDoc ? (clinetContext?.theme?.buttonbg || "#f8b427") : "transparent",
              }}
              onClick={() => {
                if (!props?.disabled) {
                  setSelectedDoc(doc);
                }
              }}
            >
              {!props?.disabled && (
                <Radio
                  style={{ color: doc === selectedDoc ? (clinetContext?.theme?.buttonbg || "#f8b427"): "" }}
                  checked={doc === selectedDoc}
                />
              )}
              {props?.disabled && (
                <p style={{ marginRight: "1rem" }}>{`${i + 1} - `}</p>
              )}
              <img src={require('../assets/images/kyc-verify/id_card.png').default || require('../assets/images/kyc-verify/id_card.png')} width={50} height={30} />
              <Typography ml={2} fontWeight={"bold"}>
                {doc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </KycVerifyCardContainer>
  );
}
