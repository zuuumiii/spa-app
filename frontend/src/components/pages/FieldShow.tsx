import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link, useParams, useLocation } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { Card, Typography, Grid } from "@material-ui/core";

import { fieldCreate } from "lib/api/field";
import { FieldParams } from "interfaces";
import TargetCard from "components/fields/TargetCard";

const useStyles = makeStyles((theme: Theme) => ({
  createBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 8),
    "&:hover": {
      backgroundColor: "#4db6ac",
    },
  },
  deleteBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 8),
    "&:hover": {
      backgroundColor: "#ff5722",
    },
  },
  btnWrapper: {
    width: 800,
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldsWrapper: {
    width: 800,
    margin: theme.spacing(4, 0, 0, 8),
  },
  fieldContainer: {
    textAlign: "center",
    height: 130,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: "#eceff1",
  },
  targetWrapper: {
    display: "flex",
    justifyContent: "space-around",
    width: 800,
    margin: theme.spacing(4, 0, 0, 8),
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
      <div className={classes.btnWrapper}>
        <Button
          className={classes.createBtn}
          variant="contained"
          size="large"
          component={Link}
          to="/fieldCreate"
          color="default"
          onClick={() => {}}
        >
          編集
        </Button>
        <Button
          className={classes.deleteBtn}
          variant="contained"
          size="large"
          component={Link}
          to="/fieldCreate"
          color="default"
          onClick={() => {}}
        >
          削除
        </Button>
      </div>
      <div className={classes.fieldsWrapper}>
        <Card className={classes.fieldContainer}>
          <Typography variant="h5">{field.fieldName}</Typography>
          <Typography variant="h6">作物名：{field.product}</Typography>
          <Typography>
            {field.info}
            インフォインフォインフォインフォインフォインフォインフォインフォインフォインフォイン
          </Typography>
        </Card>
      </div>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.createBtn}
          variant="contained"
          size="large"
          component={Link}
          to="/fieldCreate"
          color="default"
          onClick={() => {}}
        >
          目標新規作成
        </Button>
      </div>
      <Grid container className={classes.targetWrapper}>
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
        <TargetCard />
      </Grid>
    </>
  );
};

export default FieldShow;
