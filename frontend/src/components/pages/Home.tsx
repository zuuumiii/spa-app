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
    margin: theme.spacing(2, 0, 0, 8),
  },
  createBtn: {
    width: 220,
    "&:hover": {
      backgroundColor: "#4db6ac",
    },
  },
  blockName: {},
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
          <Typography>地方：{getPrecName[0].precName}</Typography>
          <Typography>観測所：{getBlockName[0].blockName}</Typography>
        </div>
      </div>
      <FieldsContent />
    </>
  );
};

export default Home;
