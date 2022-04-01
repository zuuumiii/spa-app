import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "components/utils/AlertMessage";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { fieldIndex } from "lib/api/field";
import { FieldParams, TargetParams } from "interfaces";
import TargetCard from "./TargetCard";

const useStyles = makeStyles((theme: Theme) => ({
  fieldsWrapper: {
    width: 1000,
    margin: theme.spacing(4, 0, 0, 8),
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
    height: 150,
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
  fieldBtn: {
    height: 150,
    padding: theme.spacing(0.5),
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
}));

const FieldsIndex: React.FC = () => {
  const classes = useStyles();
  const [fields, setFields] = useState<FieldParams[]>([]);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const sortFieldsTargets = (fields: FieldParams[]) => {
    //設定温度の低い順にfiled内でtargetの並べ替え
    fields.map((field: FieldParams) => {
      return (field.targets as unknown as TargetParams[]).sort((a, b) => {
        return a.targetTemp < b.targetTemp ? -1 : 1;
      });
    });
    //そして積算温度と設定温度の比率が高い順にfieldを並べ替え
    fields.sort((a: any, b: any) => {
      const aP = a.accumTemp / a.targets[0]?.targetTemp;
      const bP = b.accumTemp / b.targets[0]?.targetTemp;
      return aP > bP ? -1 : 1;
    });
  };

  const handleFieldIndex = async () => {
    try {
      const res = await fieldIndex();

      if (res.status === 200) {
        console.log(res.data.data);
        sortFieldsTargets(res.data.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {fields.map((field) => {
          const targets: TargetParams[] = (
            field.targets as unknown as TargetParams[]
          ).slice(0, 5);
          return (
            <Card className={classes.fieldContainer} key={field.id}>
              <Grid container>
                <Grid item xs={2} className={classes.paper}>
                  <Button
                    className={classes.fieldBtn}
                    component={Link}
                    to={{ pathname: `/fields/${field.id}`, state: field }}
                  >
                    <Typography variant="h6">{field.fieldName}</Typography>
                    <Typography>{field.product}</Typography>
                    <Typography>{field.accumTemp}℃</Typography>
                    <Typography>{conversionDate(field.startDate!)}</Typography>
                  </Button>
                </Grid>
                {targets.map((target) => {
                  return (
                    <Grid item xs={2} className={classes.paper} key={target.id}>
                      <TargetCard
                        target={target}
                        field={field}
                        onClickSubmit={handleFieldIndex}
                        onClickDelete={handleFieldIndex}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          );
        })}
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
