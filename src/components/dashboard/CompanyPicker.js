import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
  root: {
    padding: "0px"
  }
};


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },
}));

export default function CompanySelect({ companies ,setCompanyName, companyName}) {
  const classes = useStyles();

  const handleChange = (event) => {
    const selectedCompany = event.target.value 
    setCompanyName(selectedCompany);
  };

  return (
    <FormControl className={classes.formControl}> 
    <InputLabel id="demo-simple-select-label">Company</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={companyName}
        onChange={handleChange}
    >
      {companies.map(name => (
        <MenuItem  key={name} value={name}>{name}</MenuItem>
      ))}
    </Select>
    </FormControl>
  );
}
