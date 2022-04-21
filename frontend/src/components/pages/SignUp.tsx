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

  const initialUserParams: SignUpParams = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    precNo: PrecBlockList[0].precNo,
    blockNo: PrecBlockList[0].blocks[0].blockNo,
  };
  const [signUpUserParams, setSignUpUserParams] = useState(initialUserParams);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await signUp(signUpUserParams);

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

  const handleChangeUserParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setSignUpUserParams({ ...signUpUserParams, [name]: e.target.value });
  };
  const handleChangePrecNo = (
    selectedPrecNo: number,
    selectedBlockNo: number
  ) => {
    setSignUpUserParams({
      ...signUpUserParams,
      precNo: selectedPrecNo,
      blockNo: selectedBlockNo,
    });
  };

  const handleChangeBlockNo = (e: number) => {
    console.log(e);
    setSignUpUserParams({ ...signUpUserParams, blockNo: e });
  };
  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <UserForm
            title="ユーザー新規登録"
            user={signUpUserParams}
            onChangeUserParams={handleChangeUserParams}
            onChangePrecNo={handleChangePrecNo}
            onChangeBlockNo={handleChangeBlockNo}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="default"
            disabled={
              !signUpUserParams.name ||
              !signUpUserParams.email ||
              !signUpUserParams.password ||
              !signUpUserParams.passwordConfirmation
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
