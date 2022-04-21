import { AlertMessageProps } from "./AlertMessage";

export const initialMessage = (): AlertMessageProps => {
  return { open: false, setOpen: () => {}, severity: "error", message: "" };
};

export const errorMessage = (
  setOpen: Function,
  message: string
): AlertMessageProps => {
  return { open: true, setOpen: setOpen, severity: "error", message: message };
};

export const successMessage = (
  setOpen: Function,
  message: string
): AlertMessageProps => {
  return {
    open: true,
    setOpen: setOpen,
    severity: "success",
    message: message,
  };
};

export const warningMessage = (
  setOpen: Function,
  message: string
): AlertMessageProps => {
  return {
    open: true,
    setOpen: setOpen,
    severity: "warning",
    message: message,
  };
};
