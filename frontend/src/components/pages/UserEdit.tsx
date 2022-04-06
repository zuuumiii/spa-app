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
import { userDelete, userEdit } from "lib/api/auth";
import { UserEditParams } from "interfaces/index";
import PrecBlockBox, { PrecBlockItem } from "components/precblock/PrecBlockBox";
import { PrecBlockList } from "components/precblock/PrecBlockList";
import DeleteModal from "components/modal/DeleteModal";

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
    marginBottom: theme.spacing(10),
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

  const [name, setName] = useState<string>(currentUser!.name);
  const [email, setEmail] = useState<string>(currentUser!.email);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: UserEditParams = {
      name: name,
      email: email,
      precNo: selectedPrecNo,
      blockNo: selectedBlockNo,
    };

    try {
      const res = await userEdit(params);
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

  const [precOptions] = useState<PrecBlockItem[]>(
    PrecBlockList.map((p) => {
      return {
        no: p.precNo,
        name: p.precName,
      };
    })
  );

  const [selectedPrecNo, setSelectedPrecNo] = useState<number>(
    currentUser!.precNo
  );

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
  const [selectedBlockNo, setSelectedBlockNo] = useState<number>(
    currentUser!.blockNo
  );

  const onPrecBoxChangeHandler = (precNo: number) => {
    setSelectedPrecNo(precNo);
    const selectedPrecBlocks = PrecBlockList.filter(
      (p) => p.precNo === precNo
    )[0].blocks;
    setSelectedBlockNo(selectedPrecBlocks[0].blockNo);

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
          <CardHeader className={classes.header} title="ユーザー情報編集" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="名前"
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
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!name || !email ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              登録
            </Button>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="User Delete" />
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
