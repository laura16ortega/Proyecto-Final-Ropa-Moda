import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNotification } from "../UseNotification/UseNotification";

export const Notification = (): JSX.Element => {
  const notification = useSelector((state: RootState) => state.notification);
  const { clearNotification } = useNotification();

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== "clickaway" && clearNotification();

  return (
    <Snackbar
    
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
        
      <Alert
      
        variant="filled"
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};