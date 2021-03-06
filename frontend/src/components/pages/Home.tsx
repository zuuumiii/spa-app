import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import FieldsContent from "components/fields/FieldContent";
import { PrecBlockList } from "components/selectbox/precblock/PrecBlockList";
const useStyles = makeStyles((theme: Theme) => ({
  topWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: theme.spacing(4, 0, 0, 8),
  },
  createBtn: {
    width: 220,
    height: 40,
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  blockName: { marginLeft: 400 },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  //ユーザー情報から観測所表示
  const getPrec = PrecBlockList.filter((prec) => {
    return prec.precNo === currentUser?.precNo;
  });
  const getBlock = getPrec[0].blocks.filter((block) => {
    return block.blockNo === currentUser?.blockNo;
  });
  return (
    <>
      <div className={classes.topWrapper}>
        <Button
          id="field-create"
          className={classes.createBtn}
          variant="contained"
          size="large"
          component={Link}
          to="/fieldCreate"
          color="default"
          onClick={() => {}}
        >
          新規圃場登録
        </Button>
        <div className={classes.blockName}>
          <Typography variant="h6" style={{ marginTop: 3 }}>
            観測地域
          </Typography>
          <Typography>{getPrec[0].precName}</Typography>
          <Typography variant="h6" style={{ marginTop: 3 }}>
            観測所
          </Typography>
          <Typography>{getBlock[0].blockName}</Typography>
        </div>
      </div>
      <FieldsContent />
    </>
  );
};

export default Home;
