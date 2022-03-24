import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const correctItems = [
  -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

type Props = {
  inputLabel: string;
  value: number;
  onChange: (selected: number) => void;
};

const CorrectBox: React.FC<Props> = (props) => {
  const { inputLabel, value, onChange } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        value={value}
        onChange={(e) => {
          if (e.target.value !== undefined) {
            onChange(e.target.value as number);
          }
        }}
      >
        {correctItems.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CorrectBox;
