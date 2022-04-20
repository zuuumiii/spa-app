import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import AlertMessage, {
  AlertMessageProps,
} from "components/alerts/AlertMessage";
import { FieldCreateParams } from "interfaces/index";
import { fieldCreate } from "lib/api/field";
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
  c: {
    display: "flex",

    flexDirection: "column",
    justifyContent: "center",
  },
}));

const FieldCreate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();

  const initialFieldParams: FieldCreateParams = {
    fieldName: "",
    product: "",
    area: 0,
    info: "",
    correct: 0,
    startDate: new Date().getTime() / 1000,
  };
  const [fieldCreateParams, setFieldCreateParams] =
    useState(initialFieldParams);
  //const [fieldName, setFieldName] = useState<string>("");
  //const [product, setProduct] = useState<string>("");
  //const [area, setArea] = useState<number | null>(0);
  //const [info, setInfo] = useState<string>("");
  //const [correct, setCorrect] = useState<number>(0);
  //const [startDate, setStartDate] = useState<number | null>(
  //  new Date().getTime() / 1000
  //);

  const [alertMessageOpen, setAlertMessageOpen] = useState<AlertMessageProps>({
    open: false,
    setOpen: () => {},
    severity: "error",
    message: "読み込みに失敗しました",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await fieldCreate(fieldCreateParams);
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
  const handleChangeFieldParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name !== "area") {
      setFieldCreateParams({ ...fieldCreateParams, [name]: e.target.value });
    } else {
      setFieldCreateParams({
        ...fieldCreateParams,
        [name]: parseInt(e.target.value) || 0,
      });
    }
  };

  //const handleChangeFieldName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setFieldName(e.target.value);
  //};
  //const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setProduct(e.target.value);
  //};
  //const handleChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setArea(parseInt(e.target.value) || 0);
  //};
  //const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setInfo(e.target.value);
  //};
  const handleChangeStartDate = (e: number) => {
    setFieldCreateParams({ ...fieldCreateParams, ["startDate"]: e });
  };
  const handleChangeCorerct = (e: number) => {
    setFieldCreateParams({ ...fieldCreateParams, ["correct"]: e });
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <FieldForm
            title="新規圃場情報登録"
            field={fieldCreateParams}
            //fieldName={fieldName}
            //product={product}
            //area={area}
            //info={info}
            //correct={correct}
            //startDate={startDate}
            onChangeFieldParams={handleChangeFieldParams}
            //onChangeFieldName={handleChangeFieldName}
            //onChangeProduct={handleChangeProduct}
            //onChangeInfo={handleChangeInfo}
            //onChangeArea={handleChangeArea}
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
          disabled={
            !fieldCreateParams.fieldName || !fieldCreateParams.product
              ? true
              : false
          }
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

export default FieldCreate;
