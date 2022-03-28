import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import FieldsContent from "components/fields/FieldsContent";

const useStyles = makeStyles((theme: Theme) => ({
  createBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 8),
    "&:hover": {
      backgroundColor: "#4db6ac",
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
      <FieldsContent />
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
