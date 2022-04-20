import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import AlertMessage, {
  AlertMessageProps,
} from "components/alerts/AlertMessage";
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

  const initialFieldParams: FieldCreateParams = {
    fieldName: state.fieldName,
    product: state.product,
    area: state.area,
    info: state.info,
    correct: state.correct,
    startDate: state.startDate,
  };
  const [fieldUpdateParams, setFieldUpdateParams] =
    useState(initialFieldParams);
  //const [fieldName, setFieldName] = useState<string>(state.fieldName);
  //const [product, setProduct] = useState<string>(state.product);
  //const [area, setArea] = useState<number | null>(state.area);
  //const [info, setInfo] = useState<string>(state.info);
  //const [correct, setCorrect] = useState<number>(state.correct);
  //const [startDate, setStartDate] = useState<number | null>(state.startDate);
  const [alertMessageOpen, setAlertMessageOpen] = useState<AlertMessageProps>({
    open: false,
    setOpen: () => {},
    severity: "error",
    message: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await fieldUpdate(fieldUpdateParams, state.id);
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
    const name: string = e.target.name;
    if (name !== "area") {
      setFieldUpdateParams({ ...fieldUpdateParams, [name]: e.target.value });
    } else {
      setFieldUpdateParams({
        ...fieldUpdateParams,
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
    setFieldUpdateParams({ ...fieldUpdateParams, ["startDate"]: e });
  };
  const handleChangeCorerct = (e: number) => {
    setFieldUpdateParams({ ...fieldUpdateParams, ["correct"]: e });
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <FieldForm
            title="圃場情報編集"
            field={fieldUpdateParams}
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
            !fieldUpdateParams.fieldName || !fieldUpdateParams.product
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

export default FieldUpdate;
