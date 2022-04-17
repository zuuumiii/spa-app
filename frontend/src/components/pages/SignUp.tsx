import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import { AuthContext } from "App";
import AlertMessage from "components/alerts/AlertMessage";
import { signUp } from "lib/api/auth";
import { SignUpParams } from "interfaces/index";
import UserForm from "components/users/UserForm";
import { PrecBlockList } from "components/selectbox/precblock/PrecBlockList";

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
  //選択中のprecNoをStateへ
  const [selectedPrecNo, setSelectedPrecNo] = useState<number>(
    PrecBlockList[0].precNo
  );
  //選択中のblockNoをStateへ
  const [selectedBlockNo, setSelectedBlockNo] = useState<number>(
    PrecBlockList[0].blocks[0].blockNo
  );
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

      if (res.status === 200) {
        // アカウント作成と同時にログイン
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        histroy.push("/");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
  };
  const handleChangePrecNo = (e: number) => {
    setSelectedPrecNo(e);
  };
  const handleChangeBlockNo = (e: number) => {
    setSelectedBlockNo(e);
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <UserForm
            title="ユーザー新規登録"
            name={name}
            email={email}
            password={password}
            passwordConfirmation={passwordConfirmation}
            selectedPrecNo={selectedPrecNo}
            selectedBlockNo={selectedBlockNo}
            onChangePrecNo={handleChangePrecNo}
            onChangeBlockNo={handleChangeBlockNo}
            onChangeName={handleChangeName}
            onChangeEmail={handleChangeEmail}
            onChangePassword={handleChangePassword}
            onChangePasswordConfirmaiton={handleChangePasswordConfirmation}
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
            登録
          </Button>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="各項目を正しく入力してください。"
      />
    </>
  );
};

export default SignUp;
