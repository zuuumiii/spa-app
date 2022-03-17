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
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[400],
    },
    secondary: {
      main: "#00bcd4",
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
          <Container maxWidth="lg" className={classes.container}>
            <Grid container justify="center">
              <Grid item>{children}</Grid>
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
};

export default CommonLayout;
