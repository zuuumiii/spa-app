import React, { useContext } from "react";
import { AuthContext } from "App";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  header: {
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
}));

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const classes = useStyles();
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="main contents" />
        <CardContent>
          {isSignedIn && currentUser ? (
            <>
              <h1>Signed in successfully!</h1>
              <h2>Email: {currentUser?.email}</h2>
              <h2>Name: {currentUser?.name}</h2>
            </>
          ) : (
            <h1>Not signed in</h1>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
