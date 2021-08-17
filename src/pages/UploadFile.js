import { Grid, Box } from "@material-ui/core";
import React from "react";
import { useEffect,useState } from "react";
import UploadFileCard from "src/components/upload/UploadFileCard";
const papa = require("papaparse");

function UploadFile() {
  

  const [file, setFile] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    
  }, [file])

  const handleUploadClick = (year, month, uploadType) =>{
    const res = parseFile()
    
  }

  const parseFile = ()=>{
    let dataAsJson = papa.parse(file, {header: true});
    dataAsJson.data.forEach(element => {
        element.domestic = element.domestic === "1" || element.domestic.toLowerCase() === "domestic";
        element.weight = parseFloat(element.weight);
        element.amountCharged = parseFloat(element.amountCharged);
    });
    return dataAsJson
  }


  return (
    
    <Box  m={8}>
      <UploadFileCard setIsUpdate={setIsUpdate} setIsNew={setIsNew} handleUploadClick={handleUploadClick} setFile={setFile} />
    </Box>
  );
}

export default UploadFile;