import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";

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
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  deleteBtn: {
    marginTop: theme.spacing(2),
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ff5722",
    },
  },
}));

interface Props {
  title: string;
  targetName: string;
  targetTemp: number;
  memo: string;
  onChangeTargetName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTargetTemp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TargetForm: React.FC<Props> = (props) => {
  const {
    title,
    targetName,
    targetTemp,
    memo,
    onChangeTargetName,
    onChangeTargetTemp,
    onChangeMemo,
    onClickSubmit,
  } = props;
  const classes = useStyles();

  return (
    <>
      <CardHeader className={classes.header} title={title} />
      <CardContent>
        <TextField
          name="target-name"
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
          name="target-temp"
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
          name="memo"
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="メモ"
          value={memo}
          margin="dense"
          onChange={onChangeMemo}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={!targetName || !targetTemp ? true : false}
          className={classes.submitBtn}
          onClick={onClickSubmit}
        >
          登録
        </Button>
      </CardContent>
    </>
  );
};

export default TargetForm;
