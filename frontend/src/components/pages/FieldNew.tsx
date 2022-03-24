import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { FieldCreateParams } from "interfaces/index";
import CorrectBox from "components/correct/CorrectBox";
import { fieldNew } from "lib/api/field";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
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
    maxWidth: 400,
  },
}));

const FieldNew: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();

  const { setIsSignedIn, setCurrentUser, currentUser } =
    useContext(AuthContext);

  const [fieldName, setFieldName] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [area, setArea] = useState<number>(0);
  const [info, setInfo] = useState<string>("");
  const [correct, setCorrect] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const changeDateHandler = (newDate: Date | null): void => {
    setStartDate(newDate);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: FieldCreateParams = {
      fieldName: fieldName,
      product: product,
      area: area,
      startDate: startDate,
      info: info,
      correct: correct,
    };

    try {
      const res = await fieldNew(params);
      console.log(res);
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="新規圃場登録" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="圃場名"
              value={fieldName}
              margin="dense"
              onChange={(event) => setFieldName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="作物名"
              value={product}
              margin="dense"
              onChange={(event) => setProduct(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="圃場面積"
              value={area}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
              margin="dense"
              onChange={(event) => {
                const value: number = Number(event.target.value);
                setArea(value);
              }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker value={startDate} onChange={changeDateHandler} />
            </MuiPickersUtilsProvider>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="情報"
              value={info}
              margin="dense"
              onChange={(event) => setInfo(event.target.value)}
            />
            <CorrectBox
              inputLabel="補正値"
              value={correct}
              onChange={(selected) => setCorrect(selected)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!fieldName || !product ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
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

export default FieldNew;
