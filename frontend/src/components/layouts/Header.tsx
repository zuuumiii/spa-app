import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "images/logo.png";
import { signOut } from "lib/api/auth";

import { AuthContext } from "App";

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textTransform: "none",
  },
}));

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } =
    useContext(AuthContext);
  const classes = useStyles();
  const histroy = useHistory();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();
      console.log(res);
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        histroy.push("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Button
              component={Link}
              to="/user"
              color="inherit"
              id="user"
              className={classes.linkBtn}
            >
              {currentUser?.name} さん
            </Button>
            <Button
              color="inherit"
              className={classes.linkBtn}
              onClick={handleSignOut}
            >
              ログアウト
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              className={classes.linkBtn}
            >
              ログイン
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.linkBtn}
              id="signup"
            >
              新規登録
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <img src={logo} alt="Logo" width="190" height="55" />
          </Link>

          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
