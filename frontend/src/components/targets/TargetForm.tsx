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
  onChangeTarget: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeTargetTemp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeMemo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TargetForm: React.FC<Props> = (props) => {
  const {
    title,
    targetName,
    targetTemp,
    memo,
    onChangeTarget,
    //onChangeTargetTemp,
    //onChangeMemo,
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
          onChange={onChangeTarget}
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
          onChange={onChangeTarget}
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
          multiline
          rows={3}
          onChange={onChangeTarget}
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
