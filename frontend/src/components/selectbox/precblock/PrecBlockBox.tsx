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

export interface PrecBlockItem {
  no: number;
  name: string;
}

type Props = {
  name: string;
  inputLabel: string;
  items: PrecBlockItem[];

  value: number;
  onChange: (selected: number) => void;
};

const PrecBlockBox: React.FC<Props> = (props) => {
  const { name, inputLabel, items, value, onChange } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={(e) => {
          if (e.target.value !== undefined) {
            onChange(e.target.value as number);
          }
        }}
      >
        {items.map((item) => (
          <MenuItem value={item.no} key={item.no}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PrecBlockBox;
