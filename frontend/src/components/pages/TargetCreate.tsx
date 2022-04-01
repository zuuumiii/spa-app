import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import AlertMessage from "components/utils/AlertMessage";
import { TargetCreateParams } from "interfaces/index";
import { FieldParams } from "interfaces/index";
import { targetCreate } from "lib/api/target";
import TargetForm from "components/targets/TargetForm";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(10),
    maxWidth: 400,
  },
}));

const TargetCreate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const { state } = useLocation<FieldParams>();
  const field = state;

  const [targetName, setTargetName] = useState<string>("");
  const [targetTemp, setTargetTemp] = useState<number>(0);
  const [memo, setMemo] = useState<string>("");

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: TargetCreateParams = {
      targetName: targetName,
      targetTemp: targetTemp,
      memo: memo,
    };

    try {
      const res = await targetCreate(params, field.id);
      console.log(res);

      if (res.status === 200) {
        histroy.push("/");
        console.log("Create Target successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(true);
    }
  };
  const handleChangeTargetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetName(e.target.value);
  };
  const handleChangeTargetTemp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetTemp(parseInt(e.target.value) || 0);
  };
  const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <TargetForm
            title="新規目標登録"
            targetName={targetName}
            targetTemp={targetTemp}
            memo={memo}
            onChangeTargetName={handleChangeTargetName}
            onChangeMemo={handleChangeMemo}
            onChangeTargetTemp={handleChangeTargetTemp}
            onClickSubmit={(e) => handleSubmit(e)}
          />
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid Target Data"
      />
    </>
  );
};

export default TargetCreate;
