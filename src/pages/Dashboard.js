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
    couriers: ['FEDEX', 'DHL']
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
  const [firstCompanyName, setFirstCompanyName] = useState("")
  const [secondCompanyName, setSecondCompanyName] = useState("")
  const [firstCompanyData, setFirstCompanyData] = useState({})
  const [secondCompanyData, setSecondCompanyData] = useState({})
  const [companies, setCompanies] = useState([])
  const [yearOptions, setYearOptions] = useState([])
  const [monthOptions, setMonthOptions] = useState([])
  const [pickedYear1, setPickedYear1] = useState('')
  const [pickedMonth1, setPickedMonth1] = useState('')
  const [pickedYear2, setPickedYear2] = useState('')
  const [pickedMonth2, setPickedMonth2] = useState('')
  const [couriersInfo, setCouriersInfo] = useState({})


  const getData = async (companyName, setData) => {
    let res = await fetch(`http://localhost:8000/${companyName}`,{headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      })
    res = await res.json()
    setData(res)
    // setTotalDeliveries([res[companyName].totalDeliveries, res[companyName].totalDeliveries])
    return res
  }

  const getCompanies = async () =>{
    let res = await fetch(`http://localhost:8000/db`)
    res = await res.json()
    let resCompanies= Object.keys(res)
    setCompanies(resCompanies)
  }

  const ingestServerResponse = () =>{
    let years =[]
    Object.values(meta).forEach(data => years.push(data.year))
    setYearOptions(years)
    getMonths(2020)
  }

  const getMonths = (year) =>{
    const yearData = Object.values(meta).filter(data =>data.year===year)
    let monthNumbers = []
    let monthStrings = []
    for(let i in yearData){
      monthNumbers.push(yearData[i].month)
    }
    monthNumbers = monthNumbers.sort(function(a, b){return a-b})//sort array in ascending order
    monthNumbers.map(monthNum => monthStrings.push(monthDict[monthNum]))
    setMonthOptions(monthStrings)
  }

  const getCouriers = (year,month) =>{
    const couriers = Object.values(meta).filter(data => data.year===year && data.month===month)[0].couriers
    return couriers
  }


  useEffect(() => {
    const data = getData(secondCompanyName, setSecondCompanyData)
  }, [secondCompanyName])

  useEffect(() => {
    getData(firstCompanyName, setFirstCompanyData)
  }, [firstCompanyName])

  useEffect(() => {
      getCompanies()
      getIncidents()
      ingestServerResponse()
      const obj = {
        courier1:{name:"test1", data:"yaron"}
      }
      setCouriersInfo(obj)
  }, [])

  useEffect(() => {
    if(couriersInfo.courier1!=undefined)
      console.log(couriersInfo.courier1.name)
  }, [couriersInfo])


  const getIncidents = async ()  =>{
    let apiClient = createApiClient();
    let res = await apiClient.getCourierData('DHL');
    console.log(res)
    // parseServerResponse(res)
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
                <CompanyPicker inputLabel={"Year"} pickingOptions={yearOptions} setPickedValue={setPickedYear1} pickedValue={pickedYear1}/>
              </Grid>
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Month:</Typography>
                <CompanyPicker disable={pickedYear1 === ''} inputLabel={"Month"} pickingOptions={monthOptions} setPickedValue={setPickedMonth1} pickedValue={pickedMonth1}/>
              </Grid>
              <Grid
              item
              lg={2}
              md={3}
              xl={2}
              xs={6}
              >
                <Typography variant='h6'>Courier:</Typography>
                <CompanyPicker disable={pickedMonth1 === ''} inputLabel={"Courier"}   pickingOptions={companies.filter((company)=>{return secondCompanyName !==company})} setPickedValue={setFirstCompanyName} pickedValue={firstCompanyName}/>
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
                <CompanyPicker inputLabel={"Year"} pickingOptions={yearOptions} setPickedValue={setPickedYear1} pickedValue={pickedYear1}/>
              </Grid>
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Month:</Typography>
                <CompanyPicker disable={pickedYear1 === ''} inputLabel={"Month"} pickingOptions={monthOptions} setPickedValue={setPickedMonth1} pickedValue={pickedMonth1}/>
              </Grid>
              <Grid
                  item
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
              >
                <Typography variant='h6'>Courier</Typography>
                <CompanyPicker disable={pickedMonth1 === ''} inputLabel={"Courier"}   pickingOptions={companies.filter((company)=>{return firstCompanyName !==company})} setPickedValue={setSecondCompanyName} pickedValue={secondCompanyName}/>
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
              <TotalDeliveries companies={[firstCompanyName,secondCompanyName]} totalDeliveries={[firstCompanyData.totalDeliveries, secondCompanyData.totalDeliveries]} sx={{ height: '100%' }} />
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
