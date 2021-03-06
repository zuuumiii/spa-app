import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import TargetForm from "components/targets/TargetForm";
import DeleteModal from "./DeleteModal";
import { TargetCreateParams } from "interfaces";
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
  openBtn: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#b2dfdb",
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

interface TargetModalProps {
  children: React.ReactElement;
  title: string;
  target: TargetCreateParams;
  //targetTemp: number;
  //memo: string;
  onChangeTarget: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeTargetTemp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;

  onClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TargetModal: React.FC<TargetModalProps> = ({
  children,
  title,
  target,
  //targetTemp,
  //memo,
  onChangeTarget,
  //onChangeTargetTemp,
  //onChangeMemo,
  onClickSubmit,
  onClickDelete,
}: TargetModalProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <TargetForm
        title={title}
        target={target}
        //targetTemp={targetTemp}
        //memo={memo}
        onChangeTarget={onChangeTarget}
        //onChangeTargetTemp={onChangeTargetTemp}
        //onChangeMemo={onChangeMemo}
        onClickSubmit={(e) => {
          onClickSubmit(e);
          handleClose();
        }}
      />
      <>
        {title !== "??????????????????" ? (
          <DeleteModal
            text={"????????????"}
            onClick={(e) => {
              onClickDelete(e);
              handleClose();
            }}
            modalTitle={"????????????"}
            modalText={"????????????????????????????????????????????????"}
          />
        ) : (
          <></>
        )}
      </>
    </div>
  );
  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="default"
        className={classes.openBtn}
        onClick={() => {
          handleOpen();
        }}
      >
        {children}
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

export default TargetModal;
