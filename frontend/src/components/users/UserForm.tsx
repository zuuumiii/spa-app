import React, { useState, useRef } from "react";

import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import PrecBlockBox, {
  PrecBlockItem,
} from "components/selectbox/precblock/PrecBlockBox";

import { PrecBlockList } from "components/selectbox/precblock/PrecBlockList";
import { SignUpParams } from "interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: "center",
  },
}));

interface Props {
  title: string;
  user: SignUpParams;
  //name: string;
  //email: string;
  //password?: string;
  //passwordConfirmation?: string;
  //selectedPrecNo: number;
  //selectedBlockNo: number;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePrecNo: (e: number) => void;
  onChangeBlockNo: (e: number) => void;
  onChangePassword?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirmaiton?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const UserForm: React.FC<Props> = (props) => {
  const {
    title,
    user,
    //name,
    //email,
    //password,
    //passwordConfirmation,
    //selectedPrecNo,
    //selectedBlockNo,
    onChangeName,
    onChangeEmail,
    onChangePrecNo,
    onChangeBlockNo,
    onChangePassword,
    onChangePasswordConfirmaiton,
  } = props;
  const classes = useStyles();

  //１つ目のBOXに表示させるprecの一覧のみ取り出してStateへ
  const [precOptions] = useState<PrecBlockItem[]>(
    PrecBlockList.map((p) => {
      return {
        no: p.precNo,
        name: p.precName,
      };
    })
  );

  //選択中のprecの持つblockを一覧化してRefに設定
  const blockOptionsRef = useRef(
    PrecBlockList.filter((p) => p.precNo === user.precNo)[0].blocks.map((p) => {
      return {
        no: p.blockNo,
        name: p.blockName,
      };
    })
  );

  const onPrecBoxChangeHandler = (precNo: number) => {
    //選択したprecNoを親に渡す
    onChangePrecNo(precNo);
    //選択したprecに属するblock一覧取得
    const selectedPrecBlocks = PrecBlockList.filter(
      (p) => p.precNo === precNo
    )[0].blocks;
    //選択した項目の０番のblockを親に渡す
    onChangeBlockNo(selectedPrecBlocks[0].blockNo);

    //選択したblock一覧をRef.currentに設定し直し
    blockOptionsRef.current = selectedPrecBlocks.map((p) => {
      return {
        no: p.blockNo,
        name: p.blockName,
      };
    });
  };

  return (
    <>
      <CardHeader className={classes.header} title={title} />
      <CardContent>
        <TextField
          name="name"
          variant="outlined"
          required
          fullWidth
          label="名前"
          value={name}
          margin="dense"
          onChange={onChangeName}
        />
        <TextField
          name="email"
          variant="outlined"
          required
          fullWidth
          label="Email"
          value={user.email}
          margin="dense"
          onChange={onChangeEmail}
        />
        <PrecBlockBox
          inputLabel="都道府県"
          items={precOptions}
          value={user.precNo}
          onChange={(selected) => onPrecBoxChangeHandler(selected)}
        />
        <PrecBlockBox
          inputLabel="観測所"
          items={blockOptionsRef.current}
          value={user.blockNo}
          onChange={(selected) => onChangeBlockNo(selected)}
        />

        {title === "ユーザー新規登録" ? (
          <>
            <TextField
              name="password"
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={user.password}
              margin="dense"
              autoComplete="current-password"
              onChange={onChangePassword}
            />
            <TextField
              name="password-confirmation"
              variant="outlined"
              required
              fullWidth
              label="確認用パスワード"
              type="password"
              value={user.passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={onChangePasswordConfirmaiton}
            />
          </>
        ) : (
          <></>
        )}
      </CardContent>
    </>
  );
};

export default UserForm;
