import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import FieldsContent from "components/container/FieldsContent";

const useStyles = makeStyles((theme: Theme) => ({
  createBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 8),
    "&:hover": {
      backgroundColor: "#4db6ac",
    },
  },
  fieldsWrapper: {
    width: 1280,
    margin: theme.spacing(4, 0, 0, 8),
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
    height: 130,
    marginTop: theme.spacing(3),
    backgroundColor: "#eceff1",
  },
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

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const classes = useStyles();
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      <Button
        className={classes.createBtn}
        variant="contained"
        size="large"
        component={Link}
        to="/fieldCreate"
        color="default"
        onClick={() => {}}
      >
        新 規 圃 場 登 録
      </Button>
      <div className={classes.fieldsWrapper}>
        <Grid container spacing={3} direction="column">
          <Card className={classes.fieldContainer}>
            <Grid container>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>圃場名</Typography>
                  <Typography>作物名</Typography>
                  <Typography>60000℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target1</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid container spacing={3} direction="column">
          <Card className={classes.fieldContainer}>
            <Grid container>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>圃場名</Typography>
                  <Typography>作物名</Typography>
                  <Typography>60000℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target1</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} className={classes.paper}>
                <Button className={classes.btn}>
                  <Typography>target2</Typography>
                  <Typography>600℃</Typography>
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default Home;

//<Card className={classes.card}>
//        <CardHeader className={classes.header} title="main contents" />
//        <CardContent>
//          {isSignedIn && currentUser ? (
//            <>
//              <h1>Signed in successfully!</h1>
//              <h2>Email: {currentUser?.email}</h2>
//              <h2>Name: {currentUser?.name}</h2>
//            </>
//          ) : (
//            <h1>Not signed in</h1>
//          )}
//        </CardContent>
//      </Card>
