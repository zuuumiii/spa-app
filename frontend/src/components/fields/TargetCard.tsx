import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    textAlign: "center",
    margin: theme.spacing(0),
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
      backgroundColor: "#26a69a",
    },
  },
}));

const TargetCard: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid item xs={2} className={classes.paper}>
      <Button className={classes.btn}>
        <Typography>target1</Typography>
        <Typography>600℃</Typography>
      </Button>
    </Grid>
  );
};

export default TargetCard;
