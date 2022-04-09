import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import AlertMessage, { AlertMessageProps } from "components/utils/AlertMessage";
import { FieldCreateParams, FieldParams } from "interfaces/index";
import { fieldUpdate } from "lib/api/field";
import FieldForm from "components/fields/FieldForm";

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(10),
    maxWidth: 400,
  },
}));

const FieldUpdate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const { state } = useLocation<FieldParams>();

  const [fieldName, setFieldName] = useState<string>(state.fieldName);
  const [product, setProduct] = useState<string>(state.product);
  const [area, setArea] = useState<number | null>(state.area);
  const [info, setInfo] = useState<string>(state.info);
  const [correct, setCorrect] = useState<number>(state.correct);
  const [startDate, setStartDate] = useState<number | null>(state.startDate);
  const [alertMessageOpen, setAlertMessageOpen] = useState<AlertMessageProps>({
    open: false,
    setOpen: () => {},
    severity: "error",
    message: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: FieldCreateParams = {
      fieldName: fieldName,
      product: product,
      area: area,
      startDate: startDate,
      info: info,
      correct: correct,
    };

    try {
      const res = await fieldUpdate(params, state.id);
      console.log(res.data.data);

      if (res.data.status === "SUCCESS") {
        histroy.push("/");
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
        message: "読み込みに失敗しました。",
      });
    }
  };

  const handleChangeFieldName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldName(e.target.value);
  };
  const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value);
  };
  const handleChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArea(parseInt(e.target.value) || 0);
  };
  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };
  const handleChangeStartDate = (e: number) => {
    setStartDate(e);
  };
  const handleChangeCorerct = (e: number) => {
    setCorrect(e);
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <FieldForm
            title="圃場情報編集"
            fieldName={fieldName}
            product={product}
            area={area}
            info={info}
            correct={correct}
            startDate={startDate}
            onChangeFieldName={handleChangeFieldName}
            onChangeProduct={handleChangeProduct}
            onChangeInfo={handleChangeInfo}
            onChangeArea={handleChangeArea}
            onChangeStartDate={(e) => handleChangeStartDate(e)}
            onChangeCorrect={(e) => handleChangeCorerct(e)}
          />
        </Card>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={!fieldName || !product ? true : false}
          className={classes.submitBtn}
          onClick={handleSubmit}
        >
          登録
        </Button>
      </form>
      <AlertMessage
        open={alertMessageOpen.open}
        setOpen={setAlertMessageOpen}
        severity={alertMessageOpen.severity}
        message={alertMessageOpen.message}
      />
    </>
  );
};

export default FieldUpdate;
