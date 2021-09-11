import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { AttachFile, Description, PictureAsPdf } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactFileReader from 'react-file-reader';
import { Box, FormControlLabel, CardHeader, Divider, Grid, TextField, Select,MenuItem,FormControl,InputLabel, Checkbox   } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import {useDropzone} from 'react-dropzone';
import MyDropZone from './MyDropZone';
import { useEffect,useState } from 'react';
import { element } from 'prop-types';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  
  title: {
    fontSize: 14,
  },
 
});

const months=  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
export default function UploadFileCard({handleUploadClick, setIsUpdate, setIsNew, setFile}) {
  const classes = useStyles();
  const [fileName, setFileName] = useState('')
  const [isFileValid, setIsFileValid] = useState(true)
  const [month, setMonth] = useState('')
  const [uploadType, setUploadType] = useState('')
  const [isRequiredNotFilled, setIsRequiredNotFilled] = useState(true)
  const [year, setYear] = useState(undefined)
  const [courier, setCourier] = useState('')


    useEffect(() => {
      validateRequiredFields()
    }, [fileName,uploadType, month, year,courier])


 const renderFileName = () =>{
  if(isFileValid) {
    return(
      <Typography className={classes.title} color="textSecondary" gutterBottom>
                {fileName}
        </Typography>
    )
  }
  else{
    return(
      <Typography className={classes.title} color="red" gutterBottom>
                {fileName}
        </Typography>
    )
  }
 }

 const handleMonthChange = (event) => {
   setMonth(event.target.value)
  };

  const handleUploadType = (event) =>{
    setUploadType(event.target.value)
    
  }



  const handleYear = (event)=>{
    const is4Digits = /^\d{4}$/.test(event.target.value); // true if there ar 4 digits
    if(is4Digits){
      setYear(event.target.value)
    }
  }
    const handleCourier = (event)=>{
        const courierInput = event.target.value
        setCourier(courierInput.toUpperCase())
    }

  const validateRequiredFields = ()=>{
      if(uploadType === 'new' || uploadType ==='update') {
          if (month !== '' && year != undefined && uploadType !== '' && courier !== '' && fileName !== '') {
              setIsRequiredNotFilled(false)
          }
          else{
              setIsRequiredNotFilled(true)

          }
      }
      else{
          if (month !== '' && year != undefined && uploadType !== '' && courier !== '') {
              setIsRequiredNotFilled(false)
          }else
          {
              setIsRequiredNotFilled(true)

          }
      }
  }

  const handleUpload =() =>{
    handleUploadClick(year, month, uploadType, courier)
  }


  const handleInput = (event) =>{
      event.target.value = Math.max(0, parseInt(event.target.value) ).toString().slice(0,4)

  }


  return (
    <Card >
      <Box color="whitesmoke" bgcolor="info.main">
        <Grid container>
          <Grid item lg={11}>
            <Typography paddingLeft='1%' variant="h2" component="h2">
              Manage data
            </Typography>
          </Grid>
          <Grid item justifySelf="flex-end" lg={1}>
            <PublishIcon fontSize="large"/>
          </Grid>
        </Grid>
        
      </Box>
      <CardContent>
        <Grid container spacing={3}>
            <Grid item lg={3}>
                <TextField onChange={handleCourier}   type="text" id="standard-required" label="courier" placeholder="courier" />
            </Grid>
          <Grid item lg={3}>
            <TextField onChange={handleYear} onInput={handleInput}  type="number" id="standard-required" label="year" placeholder="2021" />
          </Grid>
          <Grid item marginTop={1} lg={2}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{width:"100px"}}
                onChange={handleMonthChange}
              >
                {months.map((element,i) => {
                      return <MenuItem  key={i} value={element}>{element}</MenuItem>
                    })
                  }
              </Select>
            </FormControl>

          </Grid>
          <Grid item marginTop={1} lg={2}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Upload type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{width:"110px"}}
                  onChange={handleUploadType}
                >
                <MenuItem  value={"new"}>New</MenuItem>
                <MenuItem  value={"update"}>Update</MenuItem>
                <MenuItem  value={"delete"}>Delete</MenuItem>
                </Select>
            </FormControl>
          </Grid>

          <Grid item lg={12}>
            <MyDropZone setFile={setFile} setIsFileValid={setIsFileValid} setFileName={setFileName}/>
          </Grid>
          <Grid item lg={12}>
            {renderFileName()}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
            <Button disabled={isRequiredNotFilled} onClick={handleUpload} className='btn'>Submit</Button>
      </CardActions>
    </Card>
  );
}



 
