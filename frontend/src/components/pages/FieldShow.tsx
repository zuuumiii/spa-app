import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { Card, Typography, Grid, CardHeader } from "@material-ui/core";

import DeleteModal from "components/modal/DeleteModal";
import { FieldParams } from "interfaces";
import TargetCard from "components/fields/TargetCard";
import { fieldDelete } from "lib/api/field";

const useStyles = makeStyles((theme: Theme) => ({
  createBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 0),
    "&:hover": {
      backgroundColor: "#4db6ac",
    },
  },
  targetBtn: {
    width: 220,
    "&:hover": {
      backgroundColor: "#4db6ac",
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
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldContainer: {
    textAlign: "center",
    height: 130,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: "#eceff1",
  },
  targetCard: {
    backgroundColor: "#eceff1",
  },
  header: {
    textAlign: "center",
  },
  targetWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: 800,
    margin: theme.spacing(4),
  },
  target: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
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

      <Card className={classes.targetCard}>
        <CardHeader className={classes.header} title="目標一覧" />
        <div className={classes.btnWrapper}>
          <Button
            className={classes.targetBtn}
            variant="contained"
            size="large"
            component={Link}
            to={{ pathname: `/fields/${field.id}/targetCreate` }}
            color="default"
            onClick={() => {}}
          >
            目標新規作成
          </Button>
        </div>
        <Grid container className={classes.targetWrapper}>
          <Grid item xs={3} className={classes.target}>
            <TargetCard />
          </Grid>
          <Grid item xs={3} className={classes.target}>
            <TargetCard />
          </Grid>
          <Grid item xs={3} className={classes.target}>
            <TargetCard />
          </Grid>
          <Grid item xs={3} className={classes.target}>
            <TargetCard />
          </Grid>
          <Grid item xs={3} className={classes.target}>
            <TargetCard />
          </Grid>
          <Grid item xs={3} className={classes.target}>
            <TargetCard />
          </Grid>
          <Grid item xs={3} className={classes.target}>
            <TargetCard />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default FieldShow;
