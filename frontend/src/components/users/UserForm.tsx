import React, { useState } from "react";

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
  onChangeUserParams: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePrecNo: (selectedPrecNo: number, selectedBlockNo: number) => void;
  onChangeBlockNo: (selectedBlockNo: number) => void;
}

const UserForm: React.FC<Props> = (props) => {
  const { title, user, onChangeUserParams, onChangePrecNo, onChangeBlockNo } =
    props;
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

  //選択中のprecの持つblockの一覧blockOptionsの初期値に設定
  const [blockOptions, setBlockOptions] = useState<PrecBlockItem[]>(
    PrecBlockList.filter((p) => p.precNo === user.precNo)[0].blocks.map((p) => {
      return {
        no: p.blockNo,
        name: p.blockName,
      };
    })
  );

  const onPrecBoxChangeHandler = (precNo: number) => {
    //選択したprecに属するblock一覧取得
    const selectedPrecBlocks = PrecBlockList.filter(
      (p) => p.precNo === precNo
    )[0].blocks;
    //選択したprecNoとblockNoを持って親へ伝える
    onChangePrecNo(precNo, selectedPrecBlocks[0].blockNo);
    //選択したblock一覧をsetState
    setBlockOptions(
      selectedPrecBlocks.map((p) => {
        return {
          no: p.blockNo,
          name: p.blockName,
        };
      })
    );
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
          value={user.name}
          margin="dense"
          onChange={onChangeUserParams}
        />
        <TextField
          name="email"
          variant="outlined"
          required
          fullWidth
          label="Email"
          value={user.email}
          margin="dense"
          onChange={onChangeUserParams}
        />
        <PrecBlockBox
          name="precNo"
          inputLabel="都道府県"
          items={precOptions}
          value={user.precNo}
          onChange={(selected) => {
            onPrecBoxChangeHandler(selected);
          }}
        />
        <PrecBlockBox
          name="blockNo"
          inputLabel="観測所"
          items={blockOptions}
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
              onChange={onChangeUserParams}
            />
            <TextField
              name="passwordConfirmation"
              variant="outlined"
              required
              fullWidth
              label="確認用パスワード"
              type="password"
              value={user.passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={onChangeUserParams}
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
