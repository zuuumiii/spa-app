import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import TargetModal from "components/modal/TargetModal";
import { FieldParams, TargetParams } from "interfaces";

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
  const classes = useStyles();
  const { target, field } = props;

  const value = Math.floor((field.accumTemp / target.targetTemp) * 100);
  let color = "";
  if (value >= 90) {
    color = "#e53935";
  } else if (value >= 75) {
    color = "#ffeb3b";
  }

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

  const handleClickUpdate = () => {
    console.log("めんそーれ");
  };

  return (
    <TargetModal
      title="目標編集"
      field={field}
      targetName={targetName}
      targetTemp={targetTemp}
      memo={memo}
      onChangeTargetName={handleChangeTargetName}
      onChangeTargetTemp={handleChangeTargetTemp}
      onChangeMemo={handleChangeMemo}
      onClickSubmit={handleClickUpdate}
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
  );
};

export default TargetCard;
