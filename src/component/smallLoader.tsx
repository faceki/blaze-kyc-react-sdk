import Typography from "@mui/material/Typography";
import { Dialog, CircularProgress, Card, CardContent } from "@mui/material";
import React from "react";
type TLoadingDialogProps = {
    show: boolean;
    message?: any;
    disableRestoreFocus?: boolean;
    size?:any
};
export default function LoadingDialog(props: TLoadingDialogProps) {
    return (
        <Dialog
            disableRestoreFocus={props.disableRestoreFocus}
            PaperProps={{
                style: {
                    borderRadius: 10,
                    color:"black"
                },
            }}
            open={props.show}
            maxWidth={props?.size || "lg"}
        >
            <Card>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: "200px",
                    }}
                >
                    <CircularProgress
                        size={25}
                        sx={{
                            mt: 1,
                        }}
                    />
                    <Typography mt={2} color={"black"}>
                        {props.message}
                    </Typography>
                </CardContent>
            </Card>
        </Dialog>
    );
}
