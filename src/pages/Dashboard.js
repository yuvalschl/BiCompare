import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import ShippingByDay from "src/components/dashboard/ShippingByDay";
import ShippingDyDate from "src/components/dashboard/ShippingByDate";
import CompanyPicker from "src/components/dashboard/CompanyPicker"
import ShippingByPostalCode from "src/components/dashboard/ShippingByPostalCode"
import ShippingByDestination from "src/components/dashboard/ShippingByDestination"
import TotalDeliveries from "../components/dashboard/TotalDeliveries"
import { useEffect, useState } from 'react';
import { createApiClient } from 'src/api';
const useStyles = makeStyles((theme) => ({
  pickers: {
    marginTop: 50
  },
}));
const meta = [
  {
    year: 2020,
    month: 10,
    couriers: ['FEDEX', 'UPS']
  },
  {
    year: 2020,
    month: 2,
    couriers: ['FEDEX', 'DHL']
  },
  {
    year: 2021,
    month: 11,
    couriers: ['FEDEX', 'DHL', 'UPS']
  },
  {
    year: 2019,
    month: 12,
    couriers: ['DHL', 'UPS']
  }
]
let count=0

const monthDict={
                  1: 'January',
                  2:'February',
                  3:'March',
                  4:'April',
                  5:'May',
                  6:'June',
                  7:'July',
                  8:'August',
                  9:'September',
                  10:'October',
                  11:'November',
                  12:'December'
                }
const Dashboard = () => {
  const classes = useStyles()
  const [firstCompanyData, setFirstCompanyData] = useState({})
  const [secondCompanyData, setSecondCompanyData] = useState({})
  const [yearOptions, setYearOptions] = useState([])
  const [couriersInfo, setCouriersInfo] = useState({
    1:{year:0, monthOptions:[],month:'', couriersOptions:[], courier:'', data:"data imported from server"},
    2:{year:2021, monthOptions:["may","april"],pickedMonth:"may", couriersOptions:["DHL","FEDEX"],pickedCouriers:"DHL", data:"data imported from server"},

  })


  const getData = async (companyName, selectedRow) => {
    let res = await fetch(`http://localhost:8000/${companyName}`,{headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      })
    res = await res.json()
    if(selectedRow === 1){
      setFirstCompanyData(res)
    }else{
      setSecondCompanyData(res)
    }
    console.log(res)
    return res
  }

  const ingestServerResponse = () =>{
    let years =[]
    Object.values(meta).forEach(data => years.push(data.year))
    setYearOptions(years)
  }

  const setMonths = (year,selectedRow) =>{
    const yearData = Object.values(meta).filter(data =>data.year===year)
    let monthNumbers = []
    let monthStrings = []
    for(let i in yearData){
      monthNumbers.push(yearData[i].month)
    }
    monthNumbers = monthNumbers.sort(function(a, b){return a-b})//sort array in ascending order
    monthNumbers.map(monthNum => monthStrings.push(monthDict[monthNum]))
    let newInfoObj= {...couriersInfo}
    newInfoObj[selectedRow].monthOptions = monthNumbers
    setCouriersInfo(newInfoObj)
  }

  const setCouriers = (selectedRow, year,month) =>{
    const couriers = Object.values(meta).filter(data => data.year===year && data.month===month)[0].couriers
    let newInfoObj= {...couriersInfo}
    newInfoObj[selectedRow].couriersOptions = couriers
    setCouriersInfo(newInfoObj)
  }


  useEffect(() => {
      getIncidents()
      ingestServerResponse()
  }, [])

  useEffect(() => {
      if(couriersInfo[1].courier !== ''){
        getData(couriersInfo[1].courier,1)
      }
      if(couriersInfo[2].courier !== ''){
        getData(couriersInfo[2].courier,2)
      }
  }, [couriersInfo])


  const getIncidents = async ()  =>{//An example of how to make an api call for the server
    let apiClient = createApiClient();
    let res = await apiClient.getCourierData('DHL');
    // parseServerResponse(res)
  }


  const handlePickedValue = (selectorRowNum, selectorType,selectedValue) =>{//handles the change in the dropdown
    let NewInfoObj= {...couriersInfo}
    NewInfoObj[selectorRowNum][selectorType]=selectedValue
    if(selectorType === 'year'){
      setMonths(selectedValue,selectorRowNum)
    }
    if(selectorType ==='month'){
      setCouriers(selectorRowNum, couriersInfo[selectorRowNum].year, selectedValue)
    }
    setCouriersInfo(NewInfoObj)
  }

  const checkIfUndefined = (selectorRowNumber, type)=>{//check why this works
    return couriersInfo[selectorRowNumber]==undefined? '':couriersInfo[selectorRowNumber][type]
  }

  const getPickedValue = (selectorRowNumber,type)=>{//check why this works
    const res = checkIfUndefined(selectorRowNumber, type)
  }


  return (<>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              container 
              spacing={3}
              sx={{paddingTop: 3, paddingLeft: 3}}
            >
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Year:</Typography>
                <CompanyPicker onChange={handlePickedValue} selectorRowNumber={1} inputLabel={"Year"} pickingOptions={yearOptions}  pickedValue={getPickedValue(1,"year")}/>
              </Grid>
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Month:</Typography>
                <CompanyPicker onChange={handlePickedValue} selectorRowNumber={1} disable={couriersInfo[1].year===0} inputLabel={"Month"} pickingOptions={couriersInfo[1].monthOptions}  pickedValue={getPickedValue(1,"month")}/>
              </Grid>
              <Grid
              item
              lg={2}
              md={3}
              xl={2}
              xs={6}
              >
                <Typography variant='h6'>Courier:</Typography>
                <CompanyPicker onChange={handlePickedValue} selectorRowNumber={1}  disable={couriersInfo[1].month === ''} inputLabel={"Courier"}   pickingOptions={couriersInfo[1].couriersOptions.filter((courier)=>{return couriersInfo[2].courier !== courier})} pickedValue={getPickedValue(1,"courier")}/>
              </Grid>
            </Grid>
            <Grid
                container
                spacing={3}
                sx={{paddingTop: 3, paddingLeft: 3}}
            >
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Year:</Typography>
                <CompanyPicker onChange={handlePickedValue} selectorRowNumber={2} inputLabel={"Year"} pickingOptions={yearOptions} pickedValue={getPickedValue(2,"year")}/>
              </Grid>
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Month:</Typography>
                <CompanyPicker onChange={handlePickedValue} selectorRowNumber={2} disable={couriersInfo[2].year===0} inputLabel={"Month"} pickingOptions={couriersInfo[2].monthOptions} pickedValue={getPickedValue(2,"month")}/>
              </Grid>
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Courier:</Typography>
                <CompanyPicker onChange={handlePickedValue} selectorRowNumber={2}  disable={couriersInfo[2].month === ''} inputLabel={"Courier"}   pickingOptions={couriersInfo[2].couriersOptions.filter((courier)=>{return couriersInfo[1].courier !== courier})} pickedValue={getPickedValue(2,"courier")}/>
              </Grid>

            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <ShippingByDay data1={firstCompanyData.shippingByDayOfWeek || []} data2={secondCompanyData.shippingByDayOfWeek || []} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <TotalDeliveries companies={[couriersInfo[1].courier,couriersInfo[2].courier]} totalDeliveries={[firstCompanyData.totalDeliveries, secondCompanyData.totalDeliveries]} sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              xl={4}
              xs={12}
            >
              <ShippingDyDate data1={firstCompanyData} data2={secondCompanyData}/>
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              xl={4}
              xs={12}
            >
              <ShippingByPostalCode data1={firstCompanyData} data2={secondCompanyData}/>
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              xl={4}
              xs={12}
            >
              <ShippingByDestination data1={firstCompanyData} data2={secondCompanyData}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

export default Dashboard;
