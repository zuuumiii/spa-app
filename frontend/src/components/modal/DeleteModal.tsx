import { Button, Typography, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "3px solid #4db6ac",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 5),
    textAlign: "center",
  },
  deleteBtn: {
    marginTop: theme.spacing(2),
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ff5722",
    },
  },
  cancelBtn: {
    marginTop: theme.spacing(2),
    backgroundColor: "#eeeeee",
    flexGrow: 1,
    textTransform: "none",
    marginLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface DeleteModalProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  modalTitle: string;
  modalText: string;
}

const DeleteModal = ({
  text,
  onClick,
  modalTitle,
  modalText,
}: DeleteModalProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOK = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClose();
    return onClick(e);
  };

  const body = (
    <div className={classes.paper}>
      <h2>{modalTitle}</h2>
      <Typography>{modalText}</Typography>
      <Button
        variant="contained"
        className={classes.deleteBtn}
        color="default"
        onClick={(e) => handleOK(e)}
      >
        OK
      </Button>
      <Button
        variant="contained"
        className={classes.cancelBtn}
        color="default"
        onClick={() => handleClose()}
      >
        キャンセル
      </Button>
    </div>
  );
  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="default"
        className={classes.deleteBtn}
        onClick={() => {
          handleOpen();
        }}
      >
        {text}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default DeleteModal;
