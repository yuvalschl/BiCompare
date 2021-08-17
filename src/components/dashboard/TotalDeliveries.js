import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import { useEffect, useState } from 'react';


const TotalDeliveries = ({companies, totalDeliveries}) => {
const theme = useTheme();
const [totalDeliveriesArr, setTotalDeliveries] = useState([])
const [companyNames, setCompanyNames] = useState([])

  useEffect(() => {
    setTotalDeliveries(totalDeliveries)
    setCompanyNames(companies)

  },[companies])


  const calculatePercentage = (indexOfCompany) =>{
      let totalOrders = 0
      for(let numOfOrders of totalDeliveriesArr){
          totalOrders += numOfOrders
      }
      let res = (totalDeliveriesArr[indexOfCompany]/totalOrders*100).toFixed(2)
      if (isNaN(res)){
        res =''
      }
      if (totalDeliveriesArr[0] != undefined && totalDeliveriesArr[1] == undefined && indexOfCompany===0){
        res = 100
      }
      else if(totalDeliveriesArr[1] != undefined && totalDeliveriesArr[0] == undefined && indexOfCompany===1 ){
        res = 100
      }
      return res
  }


  const data = {
    datasets: [
      {
        data: totalDeliveriesArr,
        backgroundColor: [
          colors.indigo[500],
          colors.blue[200],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: companies
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const creatCompaniesArr = () =>{
      return [
          {
          title: companyNames[1],
          value: calculatePercentage(1),
          icon: TabletIcon,
          color: colors.grey[500]
        },
      {
          title: companyNames[0],
          value: calculatePercentage(0),
          icon: LaptopMacIcon,
          color: colors.indigo[500]
        },
      
      ];
    
  }

  const renderPerCent = (val) =>{
      if(val ==='')
        return ''
      return '%'
  }
  

  return (
    <Card >
      <CardHeader title="Total deliveries by company" />
      <Divider />
      <CardContent style={{pointerEvents: companyNames[0] !== "" && companyNames[1] !== ""? '':'none'}}>
        <Box
          sx={{ 
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut 
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {creatCompaniesArr().map(({color, title,value}) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            > 
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                {renderPerCent(value)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalDeliveries;
