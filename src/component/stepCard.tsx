import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    SxProps,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import KycVerifyCardContainer from "./mainWrapper";

import { useState } from "react";
// import { Link } from "react-router-dom";
import React from "react";
import { useClientContext } from "./mainContext";

import {toast} from 'react-toastify'
const style: SxProps = {
    p: 1.5,
    px: 1,
    backgroundColor: "#4C4E640D",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "8px",
    cursor: "pointer",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    flexGrow: 1,
};

export default function StepsCard(props: any) {
  
    const [agree, setAgree] = useState<boolean>(false);
    const clientContext = useClientContext();

    const confirmDoc = () => {
        if (agree) {
            props.onConfirm?.();
        } else {
            toast.error( "Please agree to terms and conditions");
        }
    };

    let sequence = 1;

    return (
        <KycVerifyCardContainer
            specificMargin={props?.specificMargin}
            onBack={props.onBack}
            onConfirm={() => confirmDoc()}
            onHelpPress={props.onHelp}
            headerText="Verify your identity"
            confirmButtonText="Start >"
        >
            <Box>
                <Typography variant="body2" my={1} textAlign="center">
                    To do this, we'll need the following.
                </Typography>
                <Box display="flex" flexDirection="column" mt={2}>
                    {props?.allowedDocs?.map((doc, i) => (
                        <div
                            style={{
                                margin: 0,
                                padding: 0,
                            }}
                            key={i}
                        >
                            <Box display={"flex"} alignItems="center">
                                <Box
                                    display={"flex"}
                                    flexDirection="column"
                                    alignItems={"center"}
                                >
                                    <Typography variant="h6" m={2}>
                                        {sequence++}
                                    </Typography>
                                </Box>
                                <Box sx={style}>
                    
                                    <img src={require("../assets/images/kyc-verify/id_card.png").default || require("../assets/images/kyc-verify/id_card.png")} width={50} height={30}  />

                                    <Typography ml={2}>
                                        Picture of your <b>{doc}</b> - Front
                                    </Typography>
                                </Box>
                            </Box>
                          {doc !== "Passport" &&  <Box display={"flex"} mt={1} alignItems="center">
                                <Box>
                                    <Typography variant="h6" m={2}>
                                        {sequence++}
                                    </Typography>
                                </Box>
                                <Box sx={style}>
                                   
                                    <img src={require("../assets/images/kyc-verify/id_card_back.png").default || require("../assets/images/kyc-verify/id_card_back.png")} width={50} height={30}  />

                                    <Typography ml={2}>
                                        Picture of your <b>{doc}</b> - Back
                                    </Typography>
                                </Box>
                            </Box>}
                        </div>
                    ))}

                    <Box display={"flex"} mt={1} alignItems="center">
                        <Box>
                            <Typography variant="h6" m={2}>
                                {sequence}
                            </Typography>
                        </Box>
                        <Box sx={style}>
                            
                            <img src={require("../assets/images/kyc-verify/selfie.png").default || require("../assets/images/kyc-verify/selfie.png")} width={50} height={30}  />

                            <Typography ml={2}>
                                Take a selfie picture
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box mt={4}>
                    {/* <Link
                        style={{
                            color: theme.palette.primary.main,
                            marginLeft: 45,
                            marginBottom: 0,
                        }}
                        to={"/"}
                    >
                        Consents & Term of Use
                    </Link> */}
                    <FormGroup
                        sx={{
                            ml: 1.8,
                        }}
                    >
                        <FormControlLabel
                            checked={agree}
                            onClick={() => setAgree(!agree)}
                            control={<Checkbox style={{color:
                                
                                agree ?  (clientContext?.theme?.buttonbg || "#f8b427") : undefined,
                            }} />}
                            label={
                                <Typography variant="body2">
                                    I confirm I have read, understood and agree to 
                                    {
                                        clientContext?.theme?.externalTermsUrl && <a style={{marginLeft:3}} href={clientContext?.theme?.externalTermsUrl} target="_blank">Terms & Conditions </a>
                                    }

                                   { !clientContext?.theme?.externalTermsUrl  &&  " continue."}
                                   
                                </Typography>
                            }
                        />
                    </FormGroup>
                </Box>
            </Box>
        </KycVerifyCardContainer>
    );
}
