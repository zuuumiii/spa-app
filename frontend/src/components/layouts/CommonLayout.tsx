import React from "react";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

import Header from "components/layouts/Header";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "5rem",
  },
  itemCenter: {
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[400],
    },
  },
  typography: {
    fontFamily: ["Noto Sans", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontSize: "1.65rem",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontSize: "1.25rem",
      lineHeight: 1.5,
      letterSpacing: "-0.06em",
    },
    h5: {
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "-0.06em",
    },
    h6: {
      fontSize: "0.2rem",
      lineHeight: 0.9,
      letterSpacing: "-0.06em",
      color: "#455a64",
    },
  },
});

interface CommonLayoutProps {
  children: React.ReactElement;
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <header>
          <Header />
        </header>
        <main>
          <Container maxWidth="xl" className={classes.container}>
            <Grid container className={classes.itemCenter}>
              <Grid item>{children}</Grid>
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
};

export default CommonLayout;
