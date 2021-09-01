import { Grid, Box } from "@material-ui/core";
import React from "react";
import { useEffect,useState } from "react";
import UploadFileCard from "src/components/upload/UploadFileCard";
import {createApiClient} from "../api"
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
    let dataAsJson = papa.parse(file, {header: true});
    //  const newData = dataAsJson.data.filter(element => {
    //    element.domestic !== ''
    // //     element.domestic = element.domestic === "1" || element.domestic.toLowerCase() === "domestic";
    // //     element.weight = parseFloat(element.weight);
    // //     element.amountCharged = parseFloat(element.amountCharged);
    //  });
    // dataAsJson.data = newData
    return dataAsJson
  }


  return (
    
    <Box  m={8}>
      <UploadFileCard setIsUpdate={setIsUpdate} setIsNew={setIsNew} handleUploadClick={handleUploadClick} setFile={setFile} />
    </Box>
  );
}

export default UploadFile;