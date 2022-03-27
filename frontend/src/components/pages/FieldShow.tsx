import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link, useParams, useLocation } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import FieldsContent from "components/fields/FieldsContent";
import { Typography } from "@material-ui/core";
import { fieldCreate } from "lib/api/field";
import { FieldParams } from "interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  createBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 8),
    "&:hover": {
      backgroundColor: "#4db6ac",
    },
  },
  fieldsWrapper: {
    width: 1280,
    margin: theme.spacing(4, 0, 0, 8),
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
    height: 130,
    marginTop: theme.spacing(3),
    backgroundColor: "#eceff1",
  },
  paper: {
    textAlign: "center",
    margin: theme.spacing(0),
    color: theme.palette.text.primary,
    height: 100,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  btn: {
    padding: theme.spacing(0.5),
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#26a69a",
    },
  },
}));

type Id = {
  id: string;
};

const FieldShow: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<Id>();
  const { state } = useLocation<FieldParams>();
  const field = state;
  return (
    <>
      <Button
        className={classes.createBtn}
        variant="contained"
        size="large"
        component={Link}
        to="/fieldCreate"
        color="default"
        onClick={() => {}}
      >
        さくじょ{id}
      </Button>
      <Typography>{field.correct}</Typography>
    </>
  );
};

export default FieldShow;
