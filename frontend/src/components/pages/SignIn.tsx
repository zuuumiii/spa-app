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
    height: "1200px",
    width: "100vw",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(170, 200, 200, 0.7)",
    backgroundBlendMode: "lighten",
  },
  desc: {
    textAlign: "center",
    background: "rgba(200, 255, 255, 0.4)",
    marginTop: "30px",
    padding: "40px",
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
              name="email"
              variant="filled"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              name="password"
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
              disabled={!email || !password ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              ログイン
            </Button>
            <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                アカウントをお持ちでない方はこちら→
                <Link to="/signup" className={classes.link}>
                  新規登録
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <div className={classes.desc}>
        <Typography variant="h6" style={{ color: "#263238" }}>
          積算温度管理アプリ
        </Typography>
        <Typography variant="h1" style={{ color: "#263238", marginTop: -10 }}>
          TR<span style={{ color: "#c62828" }}>A</span>Gについて
        </Typography>
        <Typography variant="h5" style={{ color: "#263238" }}>
          農業者様、ご家庭で栽培を行なっている方に向けた積算温度
          <span style={{ fontSize: 10 }}>※</span>
          を基準に、作業予定を可視化できるサービスです。
        </Typography>
        <Typography variant="h6" style={{ color: "#263238", marginTop: 6 }}>
          ※積算温度とは、ある期間の毎日の日平均気温を合計した値のことです。植物の成長との関係が非常に深く、気象庁発表の毎年の桜の開花予想も積算温度による計算で求められています。
          <br />
          当サイトの気象データは、気象庁「過去の気象データ」を元に加工して作成しています。
        </Typography>
        <Typography variant="h4" style={{ color: "#263238", marginTop: 20 }}>
          使用方法
        </Typography>
        <Typography variant="h5" style={{ color: "#263238", marginTop: 6 }}>
          ユーザー登録時に都道府県を選択し、最寄りの観測所を選択してください。
          <br />
          <br />
          圃場登録では20件まで登録可能で、
          計測開始日（一般的には播種日や定植日）を設定してください。
          <br />
          開始日から前日までの積算温度を気象庁のデータをもとに自動で計算を行います。
          <br />
          <br />
          圃場には複数の目標が設定でき、目標名（予定している作業名）と目標とする積算温度を入力してください。
          <br />
          <br />
          目標を設定すると自動的に計算と並び替えが行われ、
          <br />
          目標温度に対しての現在の積算温度の達成率％が一番高いものから順に色分けして表示されます。
          <br />
          <br />
          作業が完了したら、目標を作業完了（削除）してください。
        </Typography>
      </div>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレス、パスワードが間違っています。"
      />
    </div>
  );
};

export default SignIn;
