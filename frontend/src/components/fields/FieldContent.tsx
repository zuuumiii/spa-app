import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertMessage, {
  AlertMessageProps,
} from "components/alerts/AlertMessage";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { fieldIndex } from "lib/api/field";
import { FieldParams, TargetParams } from "interfaces";
import TargetCard from "../targets/TargetCard";
import ArrowBack from "@material-ui/icons/ArrowBack";
import {
  initialMessage,
  errorMessage,
  successMessage,
  warningMessage,
} from "components/alerts/Messages";

const useStyles = makeStyles((theme: Theme) => ({
  fieldsWrapper: {
    width: 1200,
    marginTop: theme.spacing(4),
  },
  fieldCard: {
    height: 160,
    marginTop: theme.spacing(3),
    backgroundColor: "#eceff1",
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.primary,
    height: 160,
    display: "flex",
    alignItems: "center",
  },
  fieldBtn: {
    height: 160,
    width: 205,
    textAlign: "center",
    display: "block",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  fieldIndex: { marginTop: 3 },
  loadingCard: {
    height: 160,
    marginTop: theme.spacing(3),
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  loadingStatus: { marginTop: theme.spacing(3) },
  newStatus: { display: "flex" },
  footer: {
    marginTop: 20,
    textAlign: "right",
  },
}));

const FieldsIndex: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [fields, setFields] = useState<FieldParams[]>([]);
  const [alertMessageOpen, setAlertMessageOpen] =
    useState<AlertMessageProps>(initialMessage);

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
      if (isNaN(aP)) {
        //target登録されてない場合は比較せずに後方へ
        return 1;
      } else {
        if (isNaN(bP)) {
          return -1;
        } else {
          return aP > bP ? -1 : 1;
        }
      }
    });
  };

  const handleFieldIndex = async () => {
    try {
      const res = await fieldIndex();
      if (res.status === 200) {
        sortFieldsTargets(res.data.data);
        setFields(res.data.data);
      } else {
        setAlertMessageOpen(
          errorMessage(setAlertMessageOpen, "読み込みに失敗しました")
        );
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(
        errorMessage(setAlertMessageOpen, "読み込みに失敗しました")
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFieldIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //UNIX時間からYYYY/MM/DDに変換
  const conversionDate = (num: number) => {
    const d = new Date(num * 1000);
    const date = d.toLocaleDateString();
    return date;
  };

  const Loading = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      return children;
    } else {
      return (
        <>
          {[...Array(3)].map((_, i) => {
            return (
              <Grid container spacing={3} direction="column" key={i}>
                <Card className={classes.loadingCard}>
                  <CircularProgress size={50} />
                  <Typography variant="h6" className={classes.loadingStatus}>
                    温度計算中...
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </>
      );
    }
  };

  interface TargetListProps {
    targets: TargetParams[];
    field: FieldParams;
  }

  const TargetList = (props: TargetListProps) => {
    const { targets, field } = props;
    if (targets.length !== 0) {
      return (
        <>
          {targets.map((target) => {
            return (
              <Grid item xs={2} className={classes.paper} key={target.id}>
                <TargetCard
                  target={target}
                  field={field}
                  onClickSubmit={() => {
                    handleFieldIndex();
                    setAlertMessageOpen(
                      successMessage(
                        setAlertMessageOpen,
                        "目標を更新しました。並べ替えを自動で行います"
                      )
                    );
                  }}
                  onClickDelete={() => {
                    handleFieldIndex();
                    setAlertMessageOpen(
                      warningMessage(setAlertMessageOpen, "目標を削除しました")
                    );
                  }}
                />
              </Grid>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <Typography variant="h5" className={classes.newStatus}>
            <ArrowBack />
            「圃場詳細」画面へ行き、目標を登録しましょう！
          </Typography>
        </>
      );
    }
  };
  const FieldList = () => {
    if (fields.length !== 0) {
      return (
        <>
          {fields.map((field) => {
            const targets: TargetParams[] = (
              field.targets as unknown as TargetParams[]
            ).slice(0, 5); //最初の5個のみコピーして並べる
            return (
              <Card className={classes.fieldCard} key={field.id}>
                <Grid container className={classes.fieldContainer}>
                  <Grid item xs={2} className={classes.paper}>
                    <Button
                      className={classes.fieldBtn}
                      component={Link}
                      to={{ pathname: `/fields/${field.id}`, state: field }}
                    >
                      <Typography variant="h6" className={classes.fieldIndex}>
                        圃場名
                      </Typography>
                      <Typography>{field.fieldName}</Typography>
                      <Typography variant="h6" className={classes.fieldIndex}>
                        作物名
                      </Typography>
                      <Typography>{field.product}</Typography>
                      <Typography variant="h6" className={classes.fieldIndex}>
                        積算温度
                      </Typography>
                      <Typography>{field.accumTemp}℃</Typography>
                      <Typography variant="h6" className={classes.fieldIndex}>
                        測定開始日
                      </Typography>
                      <Typography>
                        {conversionDate(field.startDate!)}
                      </Typography>
                    </Button>
                  </Grid>
                  <TargetList targets={targets} field={field} />
                </Grid>
              </Card>
            );
          })}
        </>
      );
    } else {
      return (
        <Grid container spacing={3} direction="column" key={0}>
          <Card className={classes.loadingCard}>
            <Typography variant="h5" className={classes.newStatus}>
              <ArrowUpwardIcon />
              「新規圃場登録」のボタンから圃場を登録しましょう！
            </Typography>
          </Card>
        </Grid>
      );
    }
  };

  return (
    <div className={classes.fieldsWrapper}>
      <Loading>
        <Grid container spacing={3} direction="column">
          <FieldList />
          <Typography variant="h6" className={classes.footer}>
            ※当サイトの気象データは、気象庁「過去の気象データ」を元に加工して作成しています。
          </Typography>
        </Grid>
      </Loading>

      <AlertMessage alertProp={alertMessageOpen} />
    </div>
  );
};

export default FieldsIndex;
