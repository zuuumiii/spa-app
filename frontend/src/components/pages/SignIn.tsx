import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import BackgroundImage from "images/background.jpg";

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { signIn } from "lib/api/auth";
import { SignInParams } from "interfaces/index";

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  header: {
    textAlign: "center",
  },
  card: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  box: {
    marginTop: "2rem",
  },
  link: {
    textDecoration: "none",
  },
  background: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(173, 200, 200, 0.6)",
    backgroundBlendMode: "lighten",
  },
  desc: {
    textAlign: "center",
    marginTop: 30,
  },
}));

// サインイン用ページ
const SignIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setCurrentUser(res.data.data);
        setIsSignedIn(true);
        history.push("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <div className={classes.background}>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="ログイン" />
          <CardContent>
            <TextField
              variant="filled"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              ログイン
            </Button>
            <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                アカウントをお持ちでない方はこちら &nbsp;
                <Link to="/signup" className={classes.link}>
                  新規登録
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <div className={classes.desc}>
        <Typography variant="h1" style={{ color: "#263238" }}>
          アプリ説明文
        </Typography>
        <Typography variant="h5" style={{ color: "#263238" }}>
          All in the golden afternoon Full leisurely we glide; For both our
          oars, with little skill, By little arms are plied, While little hands
          make vain pretence Our wanderings to guide.
        </Typography>
        <Typography variant="h5" style={{ color: "#263238" }}>
          Ah, cruel Three! In such an hour. Beneath such dreamy weather. To beg
          a tale of breath too weak To stir the tiniest feather! Yet what can
          one poor voice avail Against three tongues together?
        </Typography>
        <Typography variant="h5" style={{ color: "#263238" }}>
          Imperious Prima flashes forth Her edict "to begin it"— In gentler tone
          Secunda hopes "There will he nonsense in it!"— While Tertia interrupts
          the tale Not more than once a minute.
        </Typography>
      </div>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </div>
  );
};

export default SignIn;
