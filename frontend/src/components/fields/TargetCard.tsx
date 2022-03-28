import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

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
  probabilitySuffix: {
    marginBottom: 4,
  },
  circularBackground: {
    color: "#bfbfbf",
  },
  circularBar: {
    position: "absolute",
  },
}));

const TargetCard: React.FC = () => {
  const classes = useStyles();
  const value = 90;
  let color = "";
  if (value >= 90) {
    color = "#e53935";
  } else if (value >= 75) {
    color = "#ffeb3b";
  }
  return (
    <Button className={classes.btn}>
      <Typography>t1</Typography>

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
            <Typography>600℃</Typography>
            <Grid container justify="center" alignItems="flex-end">
              <Typography variant="h5">{value}</Typography>
              <Typography
                className={classes.probabilitySuffix}
                variant="caption"
              >
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
