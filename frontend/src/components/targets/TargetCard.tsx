import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import { FieldParams, TargetParams, TargetCreateParams } from "interfaces";
import { targetUpdate, targetDelete } from "lib/api/target";
import TargetModal from "components/modals/TargetModal";
import AlertMessage, {
  AlertMessageProps,
} from "components/alerts/AlertMessage";
import { initialMessage, errorMessage } from "components/alerts/Messages";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    textAlign: "center",
    color: theme.palette.text.primary,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  btn: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    width: 170,
  },
  circularInternalContent: {
    left: 0,
    top: 16,
    bottom: 0,
    right: 0,
    position: "absolute",
  },
  temperature: {
    marginTop: 4.2,
  },
  percent: {
    marginBottom: 4,
  },
  circularBackground: {
    color: "#bfbfbf",
  },
  circularBar: {
    position: "absolute",
  },
}));

interface Props {
  target: TargetParams;
  field: FieldParams;
  onClickSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TargetCard: React.FC<Props> = (props) => {
  const { target, onClickSubmit, onClickDelete }: Props = props;
  const classes = useStyles();

  const initialTargetUpdateParams: TargetCreateParams = {
    targetName: target.targetName,
    targetTemp: target.targetTemp,
    memo: target.memo,
  };
  const [targetUpdateParams, setTargetUpdateParams] =
    useState<TargetCreateParams>(initialTargetUpdateParams);
  const field: FieldParams = props.field;

  const [alertMessageOpen, setAlertMessageOpen] =
    useState<AlertMessageProps>(initialMessage);

  const handleChangeTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name !== "targetTemp") {
      setTargetUpdateParams({ ...targetUpdateParams, [name]: e.target.value });
    } else {
      setTargetUpdateParams({
        ...targetUpdateParams,
        [name]: parseInt(e.target.value) || 0,
      });
    }
  };

  const handleTargetUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await targetUpdate(
        targetUpdateParams,
        target.fieldId,
        target.id
      );
      console.log(res.data);
      if (res.data.status === "SUCCESS") {
        onClickSubmit(e);
      } else {
        setAlertMessageOpen(
          errorMessage(setAlertMessageOpen, `${res.data.data.join("\n")}`)
        );
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(
        errorMessage(setAlertMessageOpen, "???????????????????????????????????????")
      );
    }
  };

  const handleTargetDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await targetDelete(target.fieldId, target.id);

      if (res.data.status === "SUCCESS") {
        onClickDelete(e);
      } else {
        setAlertMessageOpen(
          errorMessage(setAlertMessageOpen, "???????????????????????????")
        );
      }
    } catch (err) {
      console.log("err");
      setAlertMessageOpen(
        errorMessage(setAlertMessageOpen, "???????????????????????????")
      );
    }
  };

  const value: number = Math.floor((field.accumTemp / target.targetTemp) * 100);
  //???????????????????????????
  let color: string = "";
  if (value >= 90) {
    color = "#e53935";
  } else if (value >= 75) {
    color = "#ffeb3b";
  }
  //???????????????100????????????????????????????????????value????????????????????????
  let valueE: number = value;
  if (value > 100) {
    valueE = 100;
  }

  return (
    <>
      <TargetModal
        title="????????????"
        target={targetUpdateParams}
        onChangeTarget={handleChangeTarget}
        onClickSubmit={(e) => {
          handleTargetUpdate(e);
        }}
        onClickDelete={(e) => {
          handleTargetDelete(e);
        }}
      >
        <div className={classes.btn}>
          <Typography variant="h5">{target.targetName}</Typography>

          <Box position="relative" display="inline-flex">
            {/* ??????(?????????) */}
            <CircularProgress
              className={classes.circularBackground}
              variant="determinate"
              size={96}
              value={100}
            />
            {/* ???????????? */}
            <CircularProgress
              className={classes.circularBar}
              variant="determinate"
              size={96}
              value={valueE}
              style={{ color: color }}
            />
            <div className={classes.circularInternalContent}>
              <Grid container justify="center">
                <Typography>{target.targetTemp}</Typography>
                <Typography className={classes.temperature} variant="caption">
                  ???
                </Typography>
                <Grid container justify="center" alignItems="flex-end">
                  <Typography variant="h3">{value}</Typography>
                  <Typography className={classes.percent} variant="caption">
                    %
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
      </TargetModal>
      <AlertMessage alertProp={alertMessageOpen} />
    </>
  );
};

export default TargetCard;
