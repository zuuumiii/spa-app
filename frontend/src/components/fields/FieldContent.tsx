import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertMessage, {
  AlertMessageProps,
} from "components/alerts/AlertMessage";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { fieldIndex } from "lib/api/field";
import { FieldParams, TargetParams } from "interfaces";
import TargetCard from "../targets/TargetCard";
import ArrowBack from "@material-ui/icons/ArrowBack";
import {
  initialMessage,
  errorMessage,
  successMessage,
  warningMessage,
} from "components/alerts/Messages";

const useStyles = makeStyles((theme: Theme) => ({
  fieldsWrapper: {
    width: 1200,
    marginTop: theme.spacing(4),
  },
  fieldCard: {
    height: 160,
    marginTop: theme.spacing(3),
    backgroundColor: "#eceff1",
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.primary,
    height: 160,
    display: "flex",
    alignItems: "center",
  },
  fieldBtn: {
    height: 160,
    width: 205,
    textAlign: "center",
    display: "block",
    "&:hover": {
      backgroundColor: "#b2dfdb",
    },
  },
  fieldIndex: { marginTop: 3 },
  loadingCard: {
    height: 160,
    marginTop: theme.spacing(3),
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  loadingStatus: { marginTop: theme.spacing(3) },
  newStatus: { display: "flex" },
  footer: {
    marginTop: 20,
    textAlign: "right",
  },
}));

const FieldsIndex: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [fields, setFields] = useState<FieldParams[]>([]);
  const [alertMessageOpen, setAlertMessageOpen] =
    useState<AlertMessageProps>(initialMessage);

  const sortFieldsTargets = (fields: FieldParams[]) => {
    //???????????????????????????filed??????target???????????????
    fields.map((field: FieldParams) => {
      return (field.targets as unknown as TargetParams[]).sort((a, b) => {
        return a.targetTemp < b.targetTemp ? -1 : 1;
      });
    });
    //????????????????????????????????????????????????????????????field???????????????
    fields.sort((a: any, b: any) => {
      const aP = a.accumTemp / a.targets[0]?.targetTemp;
      const bP = b.accumTemp / b.targets[0]?.targetTemp;
      if (isNaN(aP)) {
        //target??????????????????????????????????????????????????????
        return 1;
      } else {
        if (isNaN(bP)) {
          return -1;
        } else {
          return aP > bP ? -1 : 1;
        }
      }
    });
  };

  const handleFieldIndex = async () => {
    try {
      const res = await fieldIndex();
      if (res.status === 200) {
        sortFieldsTargets(res.data.data);
        setFields(res.data.data);
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
    setLoading(false);
  };

  useEffect(() => {
    handleFieldIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //UNIX????????????YYYY/MM/DD?????????
  const conversionDate = (num: number) => {
    const d = new Date(num * 1000);
    const date = d.toLocaleDateString();
    return date;
  };

  const Loading = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      return children;
    } else {
      return (
        <>
          {[...Array(3)].map((_, i) => {
            return (
              <Grid container spacing={3} direction="column" key={i}>
                <Card className={classes.loadingCard}>
                  <CircularProgress size={50} />
                  <Typography variant="h6" className={classes.loadingStatus}>
                    ???????????????...
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </>
      );
    }
  };

  interface TargetListProps {
    targets: TargetParams[];
    field: FieldParams;
  }

  const TargetList = (props: TargetListProps) => {
    const { targets, field } = props;
    if (targets.length !== 0) {
      return (
        <>
          {targets.map((target) => {
            return (
              <Grid item xs={2} className={classes.paper} key={target.id}>
                <TargetCard
                  target={target}
                  field={field}
                  onClickSubmit={() => {
                    handleFieldIndex();
                    setAlertMessageOpen(
                      successMessage(
                        setAlertMessageOpen,
                        "??????????????????????????????????????????????????????????????????"
                      )
                    );
                  }}
                  onClickDelete={() => {
                    handleFieldIndex();
                    setAlertMessageOpen(
                      warningMessage(setAlertMessageOpen, "???????????????????????????")
                    );
                  }}
                />
              </Grid>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          <Typography variant="h5" className={classes.newStatus}>
            <ArrowBack />
            ?????????????????????????????????????????????????????????????????????
          </Typography>
        </>
      );
    }
  };
  const FieldList = () => {
    if (fields.length !== 0) {
      return (
        <>
          {fields.map((field) => {
            const targets: TargetParams[] = (
              field.targets as unknown as TargetParams[]
            ).slice(0, 5); //?????????5?????????????????????????????????
            return (
              <Card className={classes.fieldCard} key={field.id}>
                <Grid container className={classes.fieldContainer}>
                  <Grid item xs={2} className={classes.paper}>
                    <Button
                      className={classes.fieldBtn}
                      component={Link}
                      to={{ pathname: `/fields/${field.id}`, state: field }}
                    >
                      <Typography variant="h6" className={classes.fieldIndex}>
                        ?????????
                      </Typography>
                      <Typography>{field.fieldName}</Typography>
                      <Typography variant="h6" className={classes.fieldIndex}>
                        ?????????
                      </Typography>
                      <Typography>{field.product}</Typography>
                      <Typography variant="h6" className={classes.fieldIndex}>
                        ????????????
                      </Typography>
                      <Typography>{field.accumTemp}???</Typography>
                      <Typography variant="h6" className={classes.fieldIndex}>
                        ???????????????
                      </Typography>
                      <Typography>
                        {conversionDate(field.startDate!)}
                      </Typography>
                    </Button>
                  </Grid>
                  <TargetList targets={targets} field={field} />
                </Grid>
              </Card>
            );
          })}
        </>
      );
    } else {
      return (
        <Grid container spacing={3} direction="column" key={0}>
          <Card className={classes.loadingCard}>
            <Typography variant="h5" className={classes.newStatus}>
              <ArrowUpwardIcon />
              ???????????????????????????????????????????????????????????????????????????
            </Typography>
          </Card>
        </Grid>
      );
    }
  };

  return (
    <div className={classes.fieldsWrapper}>
      <Loading>
        <Grid container spacing={3} direction="column">
          <FieldList />
          <Typography variant="h6" className={classes.footer}>
            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </Typography>
        </Grid>
      </Loading>

      <AlertMessage alertProp={alertMessageOpen} />
    </div>
  );
};

export default FieldsIndex;
