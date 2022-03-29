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
import { PrecBlockList } from "components/precblock/PrefBlockList";
import DeleteModal from "components/modal/DeleteModal";

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#4db6ac",
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
        //PUTするとトークンが変更されるので再ログイン処理
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

        console.log("Succeeded in User Delete");
      } else {
        console.log("Failed in User Delete");
      }
    } catch (err) {
      console.log(err);
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
    currentUser!.precNo
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
    currentUser!.blockNo
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
          <CardHeader className={classes.header} title="User Edit" />
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
              Submit
            </Button>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="User Delete" />
          <CardContent>
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
        message="Invalid email or password"
      />
    </>
  );
};

export default UserEdit;
