import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface AlertMessageProps {
  open: boolean;
  setOpen: Function;
  severity: "error" | "success" | "info" | "warning";
  message: string;
}

interface Prop {
  alertProp: AlertMessageProps;
}
// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
const AlertMessage: React.FC<Prop> = (props) => {
  const { alertProp } = props;
  const handleCloseAlertMessage = (
    e?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    alertProp.setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={alertProp.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleCloseAlertMessage}
      >
        <Alert
          onClose={handleCloseAlertMessage}
          severity={alertProp.severity}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {alertProp.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
