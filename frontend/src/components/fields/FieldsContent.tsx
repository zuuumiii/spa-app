import React, { useState, useEffect } from "react";
import FieldCard from "./TargetCard";
import { useHistory, Link } from "react-router-dom";
import AlertMessage from "components/utils/AlertMessage";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { fieldCreate, fieldIndex } from "lib/api/field";
import { FieldParams } from "interfaces";
import TargetCard from "./TargetCard";

const useStyles = makeStyles((theme: Theme) => ({
  fieldsWrapper: {
    width: 1000,
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

const FieldsIndex: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const [fields, setFields] = useState<FieldParams[]>([]);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleFieldIndex = async () => {
    try {
      const res = await fieldIndex();

      if (res.status === 200) {
        histroy.push("/");
        console.log(res.data.data);
        setFields(res.data.data);
        console.log("FieldIndex successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(true);
    }
  };

  useEffect(() => {
    handleFieldIndex();
  }, []); //第2引数にfieldsを渡すと無限ループに陥る

  //UNIX時間からYYYY/MM/DDに変換
  const conversionDate = (num: number) => {
    const d = new Date(num * 1000);
    const date = d.toLocaleDateString();
    return date;
  };

  return (
    <div className={classes.fieldsWrapper}>
      <Grid container spacing={3} direction="column">
        {fields.map((field) => (
          <Card className={classes.fieldContainer} key={field.id}>
            <Grid container>
              <Grid item xs={2} className={classes.paper}>
                <Button
                  className={classes.btn}
                  component={Link}
                  to={{ pathname: `/fields/${field.id}`, state: field }}
                >
                  <Typography>{field.fieldName}</Typography>
                  <Typography>{field.product}</Typography>
                  <Typography>{field.accumTemp}℃</Typography>
                  <Typography>{conversionDate(field.startDate!)}</Typography>
                </Button>
              </Grid>

              <Grid item xs={2} className={classes.paper}>
                <TargetCard />
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid Field Data"
      />
    </div>
  );
};

export default FieldsIndex;
