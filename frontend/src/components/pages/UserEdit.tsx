import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

import { AuthContext } from "App";
import AlertMessage from "components/alerts/AlertMessage";
import { userDelete, userEdit } from "lib/api/auth";
import { UserUpdateParams } from "interfaces/index";
import DeleteModal from "components/modals/DeleteModal";
import UserForm from "components/users/UserForm";

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
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    width: 400,
  },
  deleteCard: {
    textAlign: "center",
  },
}));

// ユーザー編集ページ
const UserEdit: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();

  const { setIsSignedIn, setCurrentUser, currentUser } =
    useContext(AuthContext);

  const initialUserParams: UserUpdateParams = {
    name: currentUser!.name,
    email: currentUser!.email,
    precNo: currentUser!.precNo,
    blockNo: currentUser!.blockNo,
  };
  const [userUpdateParams, setUserUpdateParams] = useState(initialUserParams);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await userEdit(userUpdateParams);
      console.log(res);

      if (res.status === 200) {
        //再ログイン処理
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        histroy.push("/");
        console.log("User edit successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  const handleUserDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await userDelete();
      console.log(res);
      if (res.status === 200) {
        //各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        histroy.push("/signin");
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeUserParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setUserUpdateParams({ ...userUpdateParams, [name]: e.target.value });
  };
  const handleChangePrecNo = (
    selectedPrecNo: number,
    selectedBlockNo: number
  ) => {
    setUserUpdateParams({
      ...userUpdateParams,
      precNo: selectedPrecNo,
      blockNo: selectedBlockNo,
    });
  };

  const handleChangeBlockNo = (e: number) => {
    console.log(e);
    setUserUpdateParams({ ...userUpdateParams, blockNo: e });
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <UserForm
            title="ユーザー情報編集"
            user={userUpdateParams}
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
              !userUpdateParams.name || !userUpdateParams.email ? true : false
            }
            className={classes.submitBtn}
            onClick={handleSubmit}
          >
            登録
          </Button>
        </Card>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="アカウント削除" />
          <CardContent className={classes.deleteCard}>
            <DeleteModal
              text={"アカウント削除"}
              onClick={(e) => handleUserDelete(e)}
              modalTitle={"アカウント削除"}
              modalText={"本当に削除してもよろしいですか？"}
            />
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="各項目を正しく入力してください。"
      />
    </>
  );
};

export default UserEdit;
