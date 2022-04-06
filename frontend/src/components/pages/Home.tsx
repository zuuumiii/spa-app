import React, { useContext } from "react";
import { AuthContext } from "App";
import { Link } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import FieldsContent from "components/fields/FieldsContent";
import { PrecBlockList } from "components/precblock/PrefBlockList";
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

  const getPrecName = PrecBlockList.filter((prec) => {
    return prec.precNo === currentUser?.precNo;
  });
  const getBlockName = getPrecName[0].blocks.filter((block) => {
    return block.blockNo === currentUser?.blockNo;
  });
  return (
    <>
      <div className={classes.topWrapper}>
        <Button
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
          <Typography>{getPrecName[0].precName}</Typography>
          <Typography variant="h6" style={{ marginTop: 3 }}>
            観測所
          </Typography>
          <Typography>{getBlockName[0].blockName}</Typography>
        </div>
      </div>
      <FieldsContent />
    </>
  );
};

export default Home;
