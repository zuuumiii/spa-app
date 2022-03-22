import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "interfaces/index";
import PrecBlockBox, { PrecBlockItem } from "components/precblock/PrecBlockBox";
import { PrecBlockList } from "components/precblock/PrefBlockList";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
  },
  header: {
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
}));

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      precNo: selectedPrecNo,
      blockNo: selectedBlockNo,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        histroy.push("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };
  //Boxのアイテムとするprec一覧をStateで管理
  const [precOptions] = useState<PrecBlockItem[]>(
    PrecBlockList.map((p) => {
      return {
        no: p.precNo,
        name: p.precName,
      };
    })
  );
  //選択中のprecNoをStateで管理
  const [selectedPrecNo, setSelectedPrecNo] = useState<number>(
    PrecBlockList[0].precNo
  );

  //選択中のprecに属するblockをRefで管理
  const blockOptionsRef = useRef(
    PrecBlockList.filter((p) => p.precNo === selectedPrecNo)[0].blocks.map(
      (p) => {
        return {
          no: p.blockNo,
          name: p.blockName,
        };
      }
    )
  );
  //選択中のblockNoをStateで管理
  const [selectedBlockNo, setSelectedBlockNo] = useState<number>(
    PrecBlockList[0].blocks[0].blockNo
  );

  const onPrecBoxChangeHandler = (precNo: number) => {
    //選択したprecNoをStateに指定
    setSelectedPrecNo(precNo);
    //選択したprecのblock一覧
    const selectedPrecBlocks = PrecBlockList.filter(
      (p) => p.precNo === precNo
    )[0].blocks;
    //選択したpreckに属する最初のblockをStateに指定
    setSelectedBlockNo(selectedPrecBlocks[0].blockNo);

    //選択したblockをRefに指定
    blockOptionsRef.current = selectedPrecBlocks.map((p) => {
      return {
        no: p.blockNo,
        name: p.blockName,
      };
    });
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign Up" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={name}
              margin="dense"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
            <PrecBlockBox
              inputLabel="都道府県"
              items={precOptions}
              value={selectedPrecNo}
              onChange={(selected) => onPrecBoxChangeHandler(selected)}
            />
            <PrecBlockBox
              inputLabel="観測所"
              items={blockOptionsRef.current}
              value={selectedBlockNo}
              onChange={(selected) => setSelectedBlockNo(selected)}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={
                !name || !email || !password || !passwordConfirmation
                  ? true
                  : false
              }
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  );
};

export default SignUp;
