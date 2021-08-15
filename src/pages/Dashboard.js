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

const useStyles = makeStyles((theme) => ({
  pickers: {
    marginTop: 50
  },
}));
let arr=[]

const Dashboard = () => {
  const classes = useStyles()
  const [firstCompanyName, setFirstCompanyName] = useState("")
  const [secondCompanyName, setSecondCompanyName] = useState("")
  const [firstCompanyData, setFirstCompanyData] = useState({})
  const [secondCompanyData, setSecondCompanyData] = useState({})
  const [companies, setCompanies] = useState([])
  const [totalDeliveries, setTotalDeliveries] = useState([])


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
  /*


  useEffect(() => {
    const asyncUseEffect = async () => {
      let res = await fetch(`http://localhost:8000/db`)
      res = await res.json()
      res = Object.keys(res)
      setAvailableCompanies(res)
    }

    asyncUseEffect()
  }, [])
  */

  useEffect(() => {
    const data = getData(secondCompanyName, setSecondCompanyData)
    console.log(data)
  }, [secondCompanyName])

  useEffect(() => {
    getData(firstCompanyName, setFirstCompanyData)
  }, [firstCompanyName])

  useEffect(() => {
      getCompanies()
      
        
  }, [])

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
              xs={4}
              >
                <Typography variant='h6'>First company:</Typography>
                <CompanyPicker   companies={companies.filter((company)=>{return secondCompanyName !==company})} setCompanyName={setFirstCompanyName} companyName={firstCompanyName}/>
              </Grid>
              <Grid 
              item
              lg={2}
              md={3}
              xl={2}
              xs={4}
              >
                <Typography variant='h6'>Second company:</Typography>
                <CompanyPicker companies={companies.filter((company)=>{return firstCompanyName !==company})} setCompanyName={setSecondCompanyName} companyName={secondCompanyName}/>
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
              xs={4}
            >
              <ShippingDyDate data1={firstCompanyData} data2={secondCompanyData}/>
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              xl={4}
              xs={4}
            >
              <ShippingByPostalCode data1={firstCompanyData} data2={secondCompanyData}/>
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              xl={4}
              xs={4}
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
