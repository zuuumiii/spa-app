import React, { useState, useRef } from "react";

import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import PrecBlockBox, {
  PrecBlockItem,
} from "components/selectbox/precblock/PrecBlockBox";

import { PrecBlockList } from "components/selectbox/precblock/PrecBlockList";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: "center",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
}));

interface Props {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  selectedPrecNo: number;
  selectedBlockNo: number;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePrecNo: (e: number) => void;
  onChangeBlockNo: (e: number) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirmaiton: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const UserForm: React.FC<Props> = (props) => {
  const {
    name,
    email,
    password,
    passwordConfirmation,
    selectedPrecNo,
    selectedBlockNo,
    onChangeName,
    onChangeEmail,
    onChangePrecNo,
    onChangeBlockNo,
    onChangePassword,
    onChangePasswordConfirmaiton,
  } = props;
  const classes = useStyles();

  //Boxのアイテムとするprec一覧をStateへ
  const [precOptions] = useState<PrecBlockItem[]>(
    PrecBlockList.map((p) => {
      return {
        no: p.precNo,
        name: p.precName,
      };
    })
  );

  //選択中のprecに属するblockをRefに
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

  const onPrecBoxChangeHandler = (precNo: number) => {
    //選択したprecNoをStateへ
    onChangePrecNo(precNo);
    //選択したprecのblock一覧取得
    const selectedPrecBlocks = PrecBlockList.filter(
      (p) => p.precNo === precNo
    )[0].blocks;
    //選択した０番のblockをStateに指定
    onChangeBlockNo(selectedPrecBlocks[0].blockNo);

    //選択したblockをRefに
    blockOptionsRef.current = selectedPrecBlocks.map((p) => {
      return {
        no: p.blockNo,
        name: p.blockName,
      };
    });
  };

  return (
    <>
      <CardHeader className={classes.header} title="新規登録" />
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
          value={email}
          margin="dense"
          onChange={onChangeEmail}
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
          onChange={(selected) => onChangeBlockNo(selected)}
        />

        <TextField
          name="password"
          variant="outlined"
          required
          fullWidth
          label="パスワード"
          type="password"
          value={password}
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
          value={passwordConfirmation}
          margin="dense"
          autoComplete="current-password"
          onChange={onChangePasswordConfirmaiton}
        />
      </CardContent>
    </>
  );
};

export default UserForm;
