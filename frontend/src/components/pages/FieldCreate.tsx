import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import AlertMessage from "components/utils/AlertMessage";
import { FieldCreateParams } from "interfaces/index";
import { fieldCreate, fieldUpdate } from "lib/api/field";
import FieldForm from "components/fields/FieldForm";

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

const FieldCreate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();

  const [fieldName, setFieldName] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [area, setArea] = useState<number | null>(0);
  const [info, setInfo] = useState<string>("");
  const [correct, setCorrect] = useState<number>(0);
  const [startDate, setStartDate] = useState<number | null>(
    new Date().getTime() / 1000
  );
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

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
      const res = await fieldUpdate(params);
      console.log(res);

      if (res.status === 200) {
        histroy.push("/");
        console.log("Update successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(true);
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
            title="新規圃場情報登録"
            fieldName={fieldName}
            product={product}
            area={area}
            info={info}
            correct={correct}
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

export default FieldCreate;
