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

import CorrectBox from "components/correct/CorrectBox";
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
  fieldName: string;
  product: string;
  area: number | null;
  info: string;
  correct: number;
  startDate: number | null;
  onChangeFieldName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeProduct: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeArea: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStartDate: (date: number) => void;
  onChangeInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCorrect: (selected: number) => void;
}

const FieldForm: React.FC<Props> = (props) => {
  const {
    title,
    fieldName,
    product,
    area,
    info,
    correct,
    startDate,
    onChangeFieldName,
    onChangeProduct,
    onChangeArea,
    onChangeStartDate,
    onChangeInfo,
    onChangeCorrect,
  } = props;
  const classes = useStyles();

  const numToDate = (date: number | null) => {
    return new Date(date! * 1000);
  }; //

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    numToDate(startDate)
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
          className={classes.textField}
          variant="outlined"
          required
          fullWidth
          label="圃場名"
          value={fieldName}
          margin="dense"
          onChange={onChangeFieldName}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          required
          fullWidth
          label="作物名"
          value={product}
          margin="dense"
          onChange={onChangeProduct}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="圃場面積"
          value={area}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">単位（a）</InputAdornment>
            ),
          }}
          onChange={onChangeArea}
          margin="dense"
        />
        <div className={classes.datePicker}>
          <MuiPickersUtilsProvider locale={jaLocale} utils={JaLocalizedUtils}>
            <DatePicker
              label="測定開始日"
              value={selectedDate}
              format="yyyy年M月d日"
              inputVariant="outlined"
              margin="dense"
              onChange={changeDateHandler}
            />
          </MuiPickersUtilsProvider>
        </div>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="情報"
          value={info}
          margin="dense"
          multiline
          rows={3}
          onChange={onChangeInfo}
        />
        <CorrectBox
          inputLabel="補正値"
          value={correct}
          onChange={(event) => {
            onChangeCorrect(event);
          }}
        />
      </CardContent>
    </>
  );
};

export default FieldForm;
