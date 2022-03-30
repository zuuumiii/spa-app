import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import { FieldParams, TargetParams, TargetCreateParams } from "interfaces";
import { targetUpdate } from "lib/api/target";
import TargetModal from "components/modal/TargetModal";
import AlertMessage from "components/utils/AlertMessage";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    textAlign: "center",
    color: theme.palette.text.primary,
    height: 110,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  btn: {
    paddingBottom: theme.spacing(1),
    textAlign: "center",
    display: "block",
    justifyContent: "center",
  },
  circularInternalContent: {
    left: 0,
    top: 16,
    bottom: 0,
    right: 0,
    position: "absolute",
  },
  temperature: {
    marginTop: 4.2,
  },
  percent: {
    marginBottom: 4,
  },
  circularBackground: {
    color: "#bfbfbf",
  },
  circularBar: {
    position: "absolute",
  },
}));

interface Props {
  target: TargetParams;
  field: FieldParams;
}

const TargetCard: React.FC<Props> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { target, field } = props;

  const value = Math.floor((field.accumTemp / target.targetTemp) * 100);
  let color = "";
  if (value >= 90) {
    color = "#e53935";
  } else if (value >= 75) {
    color = "#ffeb3b";
  }

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const [targetName, setTargetName] = useState<string>(target.targetName);
  const [targetTemp, setTargetTemp] = useState<number>(target.targetTemp);
  const [memo, setMemo] = useState<string>(target.memo);

  const handleChangeTargetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetName(e.target.value);
  };
  const handleChangeTargetTemp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetTemp(parseInt(e.target.value) || 0);
  };
  const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const handleClickUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: TargetCreateParams = {
      targetName: targetName,
      targetTemp: targetTemp,
      memo: memo,
    };

    try {
      const res = await targetUpdate(params, target.fieldId, target.id);
      console.log(res);

      if (res.status === 200) {
        history.push("/");
        console.log("Update successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <TargetModal
        title="目標編集"
        targetName={targetName}
        targetTemp={targetTemp}
        memo={memo}
        onChangeTargetName={handleChangeTargetName}
        onChangeTargetTemp={handleChangeTargetTemp}
        onChangeMemo={handleChangeMemo}
        onClickSubmit={(e) => handleClickUpdate(e)}
      >
        <div className={classes.btn}>
          <Typography>{target.targetName}</Typography>

          <Box position="relative" display="inline-flex">
            {/* 背景用のCircularProgress */}
            <CircularProgress
              className={classes.circularBackground}
              variant="determinate"
              size={96}
              value={100}
            />
            {/* バロメーター用のCircularProgress */}
            <CircularProgress
              className={classes.circularBar}
              variant="determinate"
              size={96}
              value={value}
              style={{ color: color }}
            />
            <div className={classes.circularInternalContent}>
              <Grid container justify="center">
                <Typography>{target.targetTemp}</Typography>
                <Typography className={classes.temperature} variant="caption">
                  ℃
                </Typography>
                <Grid container justify="center" alignItems="flex-end">
                  <Typography variant="h5">{value}</Typography>
                  <Typography className={classes.percent} variant="caption">
                    %
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
      </TargetModal>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid Target Data"
      />
    </>
  );
};

export default TargetCard;
