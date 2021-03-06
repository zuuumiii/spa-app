import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { Card, Typography, Grid, CardHeader } from "@material-ui/core";

import DeleteModal from "components/modals/DeleteModal";
import { FieldParams, TargetParams, TargetCreateParams } from "interfaces";
import TargetCard from "components/targets/TargetCard";
import { fieldDelete, fieldShow } from "lib/api/field";
import { targetCreate } from "lib/api/target";
import TargetModal from "components/modals/TargetModal";
import AlertMessage, {
  AlertMessageProps,
} from "components/alerts/AlertMessage";
import {
  initialMessage,
  errorMessage,
  successMessage,
  warningMessage,
} from "components/alerts/Messages";

const useStyles = makeStyles((theme: Theme) => ({
  createBtn: {
    width: 220,
    margin: theme.spacing(2, 0, 0, 0),
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  btnWrapper: {
    width: 800,
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldsWrapper: {
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldContainer: {
    width: 850,
    textAlign: "center",
    height: 150,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: "#eceff1",
  },
  targetCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#eceff1",
  },
  header: {
    textAlign: "center",
  },
  targetWrapper: {
    display: "flex",
    justifyContent: "space-around",
    width: 800,
    margin: theme.spacing(4),
  },
  target: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldIndex: { marginTop: 3 },
  fieldDetail: {
    margin: theme.spacing(1.5),
    display: "flex",
    justifyContent: "space-around",
  },
  fieldInfo: { display: "flex", flexDirection: "column" },
  footer: {
    marginTop: 20,
    display: "flex",
    alignItems: "right",
  },
}));

const FieldShow: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const { state } = useLocation<FieldParams>();
  const [field, setField] = useState<FieldParams>(state);
  const targets: TargetParams[] = field.targets as unknown as TargetParams[];

  const initialTargetParams: TargetCreateParams = {
    targetName: "",
    targetTemp: 0,
    memo: "",
  };
  const [targetCreateParams, setTargetCreateParams] =
    useState<TargetCreateParams>(initialTargetParams);
  const [alertMessageOpen, setAlertMessageOpen] =
    useState<AlertMessageProps>(initialMessage);
  const targetSort = (field: FieldParams) => {
    (field.targets as unknown as TargetParams[]).sort((a, b) => {
      return a.targetTemp < b.targetTemp ? -1 : 1;
    });
  };

  const handleFieldDelete = async () => {
    try {
      const res = await fieldDelete(field.id);
      console.log(res.data);
      if (res.status === 200) {
        histroy.push("/");
      } else {
        console.log("Failed in Field Delete");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFieldShow = async () => {
    try {
      const res = await fieldShow(field.id);

      if (res.status === 200) {
        targetSort(res.data.data);
        setField(res.data.data);
      } else {
        setAlertMessageOpen(
          errorMessage(setAlertMessageOpen, "?????????????????????????????????")
        );
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(
        errorMessage(setAlertMessageOpen, "?????????????????????????????????")
      );
    }
  };

  useEffect(() => {
    handleFieldShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setField]);

  const handleTargetCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await targetCreate(targetCreateParams, field.id);
      console.log(res);

      if (res.data.status === "SUCCESS") {
        (field.targets as unknown as TargetParams[]).push(res.data.data);
        setField(field);
        setTargetCreateParams(initialTargetParams);
        handleFieldShow();
        setAlertMessageOpen(
          successMessage(setAlertMessageOpen, "???????????????????????????")
        );
      } else {
        setAlertMessageOpen(
          errorMessage(setAlertMessageOpen, `${res.data.data.join("\n")}`)
        );
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(
        errorMessage(setAlertMessageOpen, "????????????????????????????????????")
      );
    }
  };

  const handleChangeTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name !== "targetTemp") {
      setTargetCreateParams({ ...targetCreateParams, [name]: e.target.value });
    } else {
      setTargetCreateParams({
        ...targetCreateParams,
        [name]: parseInt(e.target.value) || 0,
      });
    }
  };

  const conversionDate = (num: number) => {
    const d = new Date(num * 1000);
    const date = d.toLocaleDateString();
    return date;
  };

  return (
    <>
      <div className={classes.btnWrapper}>
        <Button
          id="field-update"
          className={classes.createBtn}
          variant="contained"
          size="large"
          component={Link}
          to={{ pathname: `/fields/${field.id}/update`, state: field }}
          color="default"
          onClick={() => {}}
        >
          ??????
        </Button>
        <DeleteModal
          text={"??????????????????"}
          onClick={handleFieldDelete}
          modalTitle={"??????????????????"}
          modalText={"????????????????????????????????????????????????"}
        />
      </div>
      <div className={classes.fieldsWrapper}>
        <Card className={classes.fieldContainer}>
          <div className={classes.fieldDetail}>
            <div>
              <Typography variant="h6">?????????</Typography>
              <Typography>{field.fieldName}</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                ?????????
              </Typography>
              <Typography>{field.product}</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                ??????
              </Typography>
              <Typography>{field.area}a</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                ????????????
              </Typography>
              <Typography>{field.accumTemp}???</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                ???????????????
              </Typography>
              <Typography>{conversionDate(field.startDate!)}</Typography>
            </div>
            <div>
              <Typography variant="h6" className={classes.fieldIndex}>
                ?????????
              </Typography>
              <Typography>{field.correct}???</Typography>
            </div>
          </div>
          <div className={classes.fieldInfo}>
            <Typography variant="h6" className={classes.fieldIndex}>
              ????????????
            </Typography>
            <Typography>{field.info}</Typography>
          </div>
          <div className={classes.fieldInfo}></div>
        </Card>
      </div>

      <Card className={classes.targetCard}>
        <CardHeader className={classes.header} title="????????????" />
        <div className={classes.btnWrapper}>
          <TargetModal
            title="??????????????????"
            target={targetCreateParams}
            onChangeTarget={handleChangeTarget}
            onClickSubmit={(e) => {
              handleTargetCreate(e);
            }}
            onClickDelete={() => {}}
          >
            <Typography>??????????????????</Typography>
          </TargetModal>
        </div>
        <Grid container className={classes.targetWrapper}>
          {targets.map((target) => {
            return (
              <Grid item xs={3} className={classes.target} key={target.id}>
                <TargetCard
                  target={target}
                  field={field}
                  onClickSubmit={() => {
                    handleFieldShow();
                    setAlertMessageOpen(
                      successMessage(setAlertMessageOpen, "???????????????????????????")
                    );
                  }}
                  onClickDelete={() => {
                    handleFieldShow();
                    setAlertMessageOpen(
                      warningMessage(setAlertMessageOpen, "???????????????????????????")
                    );
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Card>
      <Typography variant="h6" className={classes.footer}>
        ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
      </Typography>
      <AlertMessage alertProp={alertMessageOpen} />
    </>
  );
};

export default FieldShow;
