import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import InputAdornment from "@material-ui/core/InputAdornment";

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

type Props = {
  title: string;
  targetName: string;
  targetTemp: number | null;
  memo: string;
  onChangeTargetName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTargetTemp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TargetForm: React.FC<Props> = (props) => {
  const {
    title,
    targetName,
    targetTemp,
    memo,
    onChangeTargetName,
    onChangeTargetTemp,
    onChangeMemo,
  } = props;
  const classes = useStyles();

  return (
    <>
      <CardHeader className={classes.header} title={title} />
      <CardContent>
        <TextField
          className={classes.textField}
          variant="outlined"
          required
          fullWidth
          label="目標名"
          value={targetName}
          margin="dense"
          onChange={onChangeTargetName}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="目標積算温度"
          value={targetTemp}
          InputProps={{
            endAdornment: <InputAdornment position="end">℃</InputAdornment>,
          }}
          onChange={onChangeTargetTemp}
          margin="dense"
        />

        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="メモ"
          value={memo}
          margin="dense"
          onChange={onChangeMemo}
        />
      </CardContent>
    </>
  );
};

export default TargetForm;
