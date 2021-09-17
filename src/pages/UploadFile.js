import {Grid, Box, Accordion, AccordionSummary, Typography, AccordionDetails, CardMedia} from "@material-ui/core";
import React from "react";
import { useEffect,useState } from "react";
import UploadFileCard from "src/components/upload/UploadFileCard";
import {createApiClient} from "../api"
import InfoIcon from '@material-ui/icons/Info';
let apiClient = createApiClient();
const papa = require("papaparse");
const monthDict={
  'January':1,
  'February':2,
  'March':3,
  'April':4,
  'May':5,
  'June':6,
  'July':7,
  'August':8,
  'September':9,
  'October':10,
  'November':11,
  'December':12
}
function UploadFile() {
  

  const [file, setFile] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    
  }, [file])

  const handleUploadClick = async (year, month, uploadType, courier) => {
    const json = parseFile()
    console.log(json)
    console.log([year, monthDict[month], uploadType, courier])
    year = parseInt(year)
    let serverRes
    let successAlertString
    let failAlertString

    if(uploadType === 'new'){
        serverRes = await apiClient.postMonthlyData(json, year, monthDict[month], courier)
        successAlertString = 'Data added successfully'
        failAlertString = 'Something wnt wrong :( make sure that the csv you have uploaded is according to the format'
        console.log(serverRes)
    }
    else if(uploadType === 'update'){
        serverRes = await  apiClient.updateMonthlyData(json, year, monthDict[month] ,courier)
        successAlertString = 'Data updated successfully'
        failAlertString ='Something wnt wrong :( make sure that the date you wish to update exists'
        console.log(serverRes)
    }
    else{
        serverRes = await  apiClient.deleteMonthlyData(year, monthDict[month] ,courier)
        successAlertString = 'Data deleted successfully'
        failAlertString ='Something wnt wrong :( make sure that the date you wish to delete exists'
        console.log(serverRes)
    }
    if(serverRes === 201 || serverRes ===204){
      alert(successAlertString)
    }else{
      alert(failAlertString)
    }
  }

  const parseFile = ()=>{
    let dataAsJson = papa.parse(file, {header: true})
    return dataAsJson
  }


  return (
    
    <Box  m={8}>
      <UploadFileCard setIsUpdate={setIsUpdate} setIsNew={setIsNew} handleUploadClick={handleUploadClick} setFile={setFile} />
        <Grid  item md={12}>
            <div style={{minWidth:'1574'}} >
                <Accordion  >
                    <Grid container disableGutters="true">
                        <Grid item md={12}>
                            <AccordionSummary
                                style={{ float:'left'}}
                                expandIcon={<InfoIcon color={'primary'} style={{ float:'right'}} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >

                                <Typography style={{paddingRight:'5px'}}>Click here to learn how to upload your data  </Typography>
                            </AccordionSummary>
                        </Grid>
                    </Grid>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <Typography variant="h5" > These are the required parameters for each shipment you upload in the csv file:</Typography>
                            </Grid>
                            <Grid item md={12}>

                                <ul style={{paddingLeft:'25px'}}>
                                    <li >domestic - 1 or true if the shipment was domestic. 0 or false for international. </li>
                                    <li >shipmentDate - The date of the shipment departure in the format - dd/mm/year. </li>
                                    <li >shipmentDeliveryDate - the date of the shipment arrival in the same format. </li>
                                    <li >shipperCompanyName - the name of the company sending.</li>
                                    <li >shipperAddress - the address of the company sending. </li>
                                    <li >shipperCity - the city of the company sending.</li>
                                    <li >shipperPostalCode - the postal code of the company sending.</li>
                                    <li >shipperCountry - the country of the company sending.</li>
                                    <li >amountCharged - amount charged. </li>
                                    <li >currencyCode - currency of the amount charged (USD or NIS for example). </li>
                                    <li >weight - the weight of the shipment in kg.</li>
                                    <li >recipientCompanyName - the name of the recipient company.</li>
                                    <li >recipientAddress - the address of the recipient company.</li>
                                    <li >recipientCity - the city of the recipient company.</li>
                                    <li >recipientCountry - the country of the recipient company.</li>
                                    <li >recipientPostalCode - the postal code of the recipient company.</li>
                                </ul>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="h6" >Please contact us inorder to get a template csv file.</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <CardMedia
                                    // className={classes.media}
                                    square
                                    image='/static/images/example.jpg'
                                    title="csv example"
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="h6" >Example:</Typography>
                                <img src='/static/images/example.jpg' alt="csv example" width='1100px'/>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Grid>
    </Box>

);
}

export default UploadFile;