import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { targetCreate } from "lib/api/target";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    textAlign: "center",
    color: theme.palette.text.primary,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  btn: {
    padding: theme.spacing(0.5),
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
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

type Props = {
  targetName: string;
  targetTemp: number;
  accumTemp: number;
  id: number;
};

const TargetCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  const value = Math.floor((props.accumTemp / props.targetTemp) * 100);
  let color = "";
  if (value >= 90) {
    color = "#e53935";
  } else if (value >= 75) {
    color = "#ffeb3b";
  }
  return (
    <Button className={classes.btn}>
      <Typography>{props.targetName}</Typography>

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
            <Typography>{props.targetTemp}</Typography>
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
    </Button>
  );
};

export default TargetCard;
