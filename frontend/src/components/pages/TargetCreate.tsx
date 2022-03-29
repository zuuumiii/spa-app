import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import AlertMessage from "components/utils/AlertMessage";
import { TargetCreateParams } from "interfaces/index";
import { targetCreate } from "lib/api/target";
import TargetForm from "components/targets/TargetForm";

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#4db6ac",
    },
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(10),
    maxWidth: 400,
  },
}));

const TargetCreate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();

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
      const res = await targetCreate(params);
      console.log(res);

      if (res.status === 200) {
        histroy.push("/");
        console.log("Create successfully!");
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
            targetTemp={targetTemp}
            targetName={targetName}
            memo={memo}
            onChangeTargetName={handleChangeTargetName}
            onChangeMemo={handleChangeMemo}
            onChangeTargetTemp={handleChangeTargetTemp}
          />
        </Card>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={!targetName || !targetTemp ? true : false}
          className={classes.submitBtn}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid Field Data"
      />
    </>
  );
};

export default TargetCreate;
