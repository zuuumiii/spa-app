import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";
import { TargetCreateParams } from "interfaces";

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
  target: TargetCreateParams;
  onChangeTarget: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TargetForm: React.FC<Props> = (props) => {
  const { title, target, onChangeTarget, onClickSubmit } = props;
  const classes = useStyles();

  return (
    <>
      <CardHeader className={classes.header} title={title} />
      <CardContent>
        <TextField
          name="targetName"
          className={classes.textField}
          variant="outlined"
          required
          fullWidth
          label="目標名"
          value={target.targetName}
          margin="dense"
          onChange={onChangeTarget}
        />
        <TextField
          name="targetTemp"
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="目標積算温度"
          value={target.targetTemp}
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
          value={target.memo}
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
          disabled={!target.targetName || !target.targetTemp ? true : false}
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
