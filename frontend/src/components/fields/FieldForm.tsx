import React, { useState } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import InputAdornment from "@material-ui/core/InputAdornment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import jaLocale from "date-fns/locale/ja";
import { format } from "date-fns";

import CorrectBox from "components/selectbox/correct/CorrectBox";
import { FieldCreateParams } from "interfaces";
const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    marginTop: theme.spacing(3),
  },
  datePicker: {
    marginTop: theme.spacing(3),
  },
  header: {
    textAlign: "center",
  },
}));
//datepickerを日本語化
class JaLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, "yyyy年M月", { locale: this.locale });
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, "M月d日(E)", { locale: this.locale });
  }
}

interface Props {
  title: string;
  field: FieldCreateParams;
  //fieldName: string;
  //product: string;
  //area: number | null;
  //info: string;
  //correct: number;
  //startDate: number | null;
  onChangeFieldParams: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeFieldName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeProduct: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeArea: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStartDate: (date: number) => void;
  //onChangeInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCorrect: (selected: number) => void;
}

const FieldForm: React.FC<Props> = (props) => {
  const {
    title,
    field,
    onChangeFieldParams,
    //fieldName,
    //product,
    //area,
    //info,
    //correct,
    //startDate,
    //onChangeFieldName,
    //onChangeProduct,
    //onChangeArea,
    onChangeStartDate,
    //onChangeInfo,
    onChangeCorrect,
  } = props;
  const classes = useStyles();

  const numToDate = (date: number | null) => {
    return new Date(date! * 1000);
  }; //

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    numToDate(field.startDate)
  ); //選択した日付を保持

  const changeDateHandler = (newDate: Date | null): void => {
    setSelectedDate(newDate);
    //Railsで日付を扱うためにUNIX時間に変換してstateにセット
    const newTime: number | null = newDate!.getTime() / 1000;
    onChangeStartDate(newTime);
  };

  return (
    <>
      <CardHeader className={classes.header} title={title} />
      <CardContent>
        <TextField
          name="fieldName"
          className={classes.textField}
          variant="outlined"
          required
          fullWidth
          label="圃場名"
          value={field.fieldName}
          margin="dense"
          onChange={onChangeFieldParams}
        />
        <TextField
          name="product"
          className={classes.textField}
          variant="outlined"
          required
          fullWidth
          label="作物名"
          value={field.product}
          margin="dense"
          onChange={onChangeFieldParams}
        />
        <TextField
          name="area"
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="圃場面積"
          value={field.area}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">単位（a）</InputAdornment>
            ),
          }}
          onChange={onChangeFieldParams}
          margin="dense"
        />
        <div className={classes.datePicker}>
          <MuiPickersUtilsProvider locale={jaLocale} utils={JaLocalizedUtils}>
            <DatePicker
              name="startDate"
              label="測定開始日"
              value={selectedDate}
              format="yyyy年M月d日"
              inputVariant="outlined"
              margin="dense"
              maxDate={new Date()}
              minDate={new Date().setFullYear(new Date().getFullYear() - 1)} //１年まで取得できるよう範囲指定
              onChange={changeDateHandler}
            />
          </MuiPickersUtilsProvider>
        </div>
        <TextField
          name="info"
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="情報"
          value={field.info}
          margin="dense"
          multiline
          rows={3}
          onChange={onChangeFieldParams}
        />
        <CorrectBox
          name="correct"
          inputLabel="補正値"
          value={field.correct}
          onChange={(e) => {
            onChangeCorrect(e);
          }}
        />
      </CardContent>
    </>
  );
};

export default FieldForm;
