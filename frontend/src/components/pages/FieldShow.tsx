import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { Card, Typography, Grid } from "@material-ui/core";

import DeleteModal from "components/modal/DeleteModal";
import { FieldParams } from "interfaces";
import TargetCard from "components/fields/TargetCard";
import { fieldDelete } from "lib/api/field";

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
}));

type Id = {
  id: string;
};

const FieldShow: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const { state } = useLocation<FieldParams>();
  const field = state;

  const handleFieldDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await fieldDelete(field.id);
      console.log(res);
      if (res.status === 200) {
        histroy.push("/");

        console.log("Succeeded in Field Delete");
      } else {
        console.log("Failed in Field Delete");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.createBtn}
          variant="contained"
          size="large"
          component={Link}
          to={{ pathname: `/fields/${field.id}/update`, state: field }}
          color="default"
          onClick={() => {}}
        >
          編集
        </Button>
        <DeleteModal
          text={"圃場情報削除"}
          onClick={(e) => handleFieldDelete(e)}
          modalTitle={"圃場情報削除"}
          modalText={"本当に削除してもよろしいですか？"}
        />
      </div>
      <div className={classes.fieldsWrapper}>
        <Card className={classes.fieldContainer}>
          <Typography variant="h5">{field.fieldName}</Typography>
          <Typography variant="h6">作物名：{field.product}</Typography>
          <Typography>
            {field.id}
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
