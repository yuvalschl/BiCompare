import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "200px",
  },
}));

export default function DataPicker({values, header, onChange}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value)
  };

  return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">{header}</InputLabel>
          <Select
              style={{minWidth: 150}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
          >
            {values.map(val => (
                <MenuItem  key={val} value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
  );
}
