import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import jaLocale from "date-fns/locale/ja";
import { format } from "date-fns";

import AlertMessage from "components/utils/AlertMessage";
import { FieldCreateParams } from "interfaces/index";
import CorrectBox from "components/correct/CorrectBox";
import { fieldCreate } from "lib/api/field";
import FieldForm from "components/fields/FieldForm";

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    marginTop: theme.spacing(3),
  },
  datePicker: {
    marginTop: theme.spacing(3),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#4db6ac",
    },
  },
  header: {
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(10),
    maxWidth: 400,
  },
}));

class JaLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, "yyyy年M月", { locale: this.locale });
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, "M月d日(E)", { locale: this.locale });
  }
}

const FieldCreate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();

  const [fieldName, setFieldName] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [area, setArea] = useState<number | null>(null);
  const [info, setInfo] = useState<string>("");
  const [correct, setCorrect] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); //選択した日付を保持
  const [startDate, setStartDate] = useState<number | null>(
    selectedDate!.getTime() / 1000
  ); //初期値として洗濯中の日付（今日）をUNIX時間で設定
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const changeDateHandler = (newDate: Date | null): void => {
    setSelectedDate(newDate);
    //Railsで日付を扱うためにUNIX時間に変換してstateにセット
    const newTime: number | null = newDate!.getTime() / 1000;
    setStartDate(newTime);
  };

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
      const res = await fieldCreate(params);
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

  const handleChangeFieldName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldName(e.target.value);
  };
  const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value);
  };
  const handleChangeArea = (e: number) => {
    setArea(e);
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
            title="新規圃場登録"
            fieldName={fieldName}
            product={product}
            area={area!}
            info={info}
            correct={correct}
            onChangeFieldName={handleChangeFieldName}
            onChangeProduct={handleChangeProduct}
            onChangeArea={(e) => handleChangeArea(e)}
            onChangeInfo={handleChangeInfo}
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
