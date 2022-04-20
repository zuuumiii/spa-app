import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { Card, Typography, Grid, CardHeader } from "@material-ui/core";

import DeleteModal from "components/modals/DeleteModal";
import { FieldParams, TargetParams, TargetCreateParams } from "interfaces";
import TargetCard from "components/targets/TargetCard";
import { fieldDelete, fieldShow } from "lib/api/field";
import { targetCreate } from "lib/api/target";
import TargetModal from "components/modals/TargetModal";
import AlertMessage, {
  AlertMessageProps,
} from "components/alerts/AlertMessage";

const useStyles = makeStyles((theme: Theme) => ({
  createBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 0),
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  btnWrapper: {
    width: 800,
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldsWrapper: {
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldContainer: {
    width: 850,
    textAlign: "center",
    height: 150,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: "#eceff1",
  },
  targetCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#eceff1",
  },
  header: {
    textAlign: "center",
  },
  targetWrapper: {
    display: "flex",
    justifyContent: "space-around",
    width: 800,
    margin: theme.spacing(4),
  },
  target: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldIndex: { marginTop: 3 },
  fieldDetail: {
    margin: theme.spacing(1.5),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldInfo: { display: "flex", flexDirection: "column" },
  footer: {
    marginTop: 20,
    display: "flex",
    alignItems: "right",
  },
}));

const FieldShow: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const { state } = useLocation<FieldParams>();
  const [field, setField] = useState<FieldParams>(state);
  const targets: TargetParams[] = field.targets as unknown as TargetParams[];

  const initialTargetParams: TargetCreateParams = {
    targetName: "",
    targetTemp: 0,
    memo: "",
  };
  const [target, setTarget] = useState<TargetCreateParams>(initialTargetParams);
  //const [targetName, setTargetName] = useState<string>("");
  //const [targetTemp, setTargetTemp] = useState<number>(0);
  //const [memo, setMemo] = useState<string>("");

  const [alertMessageOpen, setAlertMessageOpen] = useState<AlertMessageProps>({
    open: false,
    setOpen: () => {},
    severity: "error",
    message: "",
  });
  const targetSort = (field: FieldParams) => {
    (field.targets as unknown as TargetParams[]).sort((a, b) => {
      return a.targetTemp < b.targetTemp ? -1 : 1;
    });
  };

  const handleFieldDelete = async () => {
    try {
      const res = await fieldDelete(field.id);
      console.log(res.data);
      if (res.status === 200) {
        histroy.push("/");
      } else {
        console.log("Failed in Field Delete");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFieldShow = async () => {
    try {
      const res = await fieldShow(field.id);

      if (res.status === 200) {
        targetSort(res.data.data);
        setField(res.data.data);
      } else {
        setAlertMessageOpen({
          open: true,
          setOpen: setAlertMessageOpen,
          severity: "error",
          message: "読み込みに失敗しました。",
        });
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen({
        open: true,
        setOpen: setAlertMessageOpen,
        severity: "error",
        message: "読み込みに失敗しました。",
      });
    }
  };

  useEffect(() => {
    handleFieldShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setField]);

  const handleTargetCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: TargetCreateParams = {
      targetName: target.targetName,
      targetTemp: target.targetTemp,
      memo: target.memo,
    };

    try {
      const res = await targetCreate(params, field.id);
      console.log(res);

      if (res.data.status === "SUCCESS") {
        (field.targets as unknown as TargetParams[]).push(res.data.data);
        setField(field);
        setTarget(initialTargetParams);
        handleFieldShow();
        setAlertMessageOpen({
          open: true,
          setOpen: setAlertMessageOpen,
          severity: "success",
          message: "目標を作成しました。",
        });
      } else {
        setAlertMessageOpen({
          open: true,
          setOpen: setAlertMessageOpen,
          severity: "error",
          message: `${res.data.data.join("\n")}`,
        });
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen({
        open: true,
        setOpen: setAlertMessageOpen,
        severity: "error",
        message: "目標の作成に失敗しました。",
      });
    }
  };

  const handleChangeTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(target);
  };
  //const handleChangeTargetTemp = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setTargetTemp(parseInt(e.target.value) || 0);
  //};
  //const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setMemo(e.target.value);
  //};

  const conversionDate = (num: number) => {
    const d = new Date(num * 1000);
    const date = d.toLocaleDateString();
    return date;
  };

  return (
    <>
      <div className={classes.btnWrapper}>
        <Button
          id="field-update"
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
          onClick={handleFieldDelete}
          modalTitle={"圃場情報削除"}
          modalText={"本当に削除してもよろしいですか？"}
        />
      </div>
      <div className={classes.fieldsWrapper}>
        <Card className={classes.fieldContainer}>
          <div className={classes.fieldDetail}>
            <div>
              <Typography variant="h6">圃場名</Typography>
              <Typography>{field.fieldName}</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                作物名
              </Typography>
              <Typography>{field.product}</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                面積
              </Typography>
              <Typography>{field.area}a</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                積算温度
              </Typography>
              <Typography>{field.accumTemp}℃</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                測定開始日
              </Typography>
              <Typography>{conversionDate(field.startDate!)}</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                補正値
              </Typography>
              <Typography>{field.correct}℃</Typography>
            </div>
          </div>
          <div className={classes.fieldInfo}>
            <Typography variant="h6" className={classes.fieldIndex}>
              圃場詳細
            </Typography>
            <Typography>{field.info}</Typography>
          </div>
          <div className={classes.fieldInfo}></div>
        </Card>
      </div>

      <Card className={classes.targetCard}>
        <CardHeader className={classes.header} title="目標一覧" />
        <div className={classes.btnWrapper}>
          <TargetModal
            title="目標新規作成"
            target={target}
            //targetTemp={target.targetTemp}
            //memo={target.memo}
            onChangeTarget={handleChangeTarget}
            //onChangeTargetTemp={handleChangeTargetTemp}
            //onChangeMemo={handleChangeMemo}
            onClickSubmit={(e) => {
              handleTargetCreate(e);
            }}
            onClickDelete={() => {}}
          >
            <Typography>目標新規作成</Typography>
          </TargetModal>
        </div>
        <Grid container className={classes.targetWrapper}>
          {targets.map((target) => {
            return (
              <Grid item xs={3} className={classes.target} key={target.id}>
                <TargetCard
                  target={target}
                  field={field}
                  onClickSubmit={() => {
                    handleFieldShow();
                    setAlertMessageOpen({
                      open: true,
                      setOpen: setAlertMessageOpen,
                      severity: "success",
                      message: "目標を更新しました。",
                    });
                  }}
                  onClickDelete={() => {
                    handleFieldShow();
                    setAlertMessageOpen({
                      open: true,
                      setOpen: setAlertMessageOpen,
                      severity: "warning",
                      message: "目標を削除しました",
                    });
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Card>
      <Typography variant="h6" className={classes.footer}>
        ※当サイトの気象データは、気象庁「過去の気象データ」を元に加工して作成しています。
      </Typography>
      <AlertMessage
        open={alertMessageOpen.open}
        setOpen={setAlertMessageOpen}
        severity={alertMessageOpen.severity}
        message={alertMessageOpen.message}
      />
    </>
  );
};

export default FieldShow;
