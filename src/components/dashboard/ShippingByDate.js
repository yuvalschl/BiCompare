import { Line } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import { useEffect, useState } from 'react';


const ShippingDyDate = ({data1, data2}) => {
  const theme = useTheme();

  function getData(data) {
    return data === undefined ? [] : data.numOfDeliveriesByDayOfMonth
  }

  const createDatesArray = () => {
    // const now = new Date();
    // const days = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    const days = 30
    const arr = [];
    for (let i = 1 ; i < days; i++){
      arr.push(i);
    }

    return arr;
  }
  const data = {
    label: 'Legend Title',
    labels: createDatesArray(),
    datasets: [
      {
        borderColor: colors.indigo[500],
        data: data1 === undefined ? [] : data1.numOfDeliveriesByDayOfMonth,
        fill: false,
        label: data1 === undefined ? " " : data1.courierName
      },
      {
        borderColor: colors.blue[200],
        fill: false,
        data: data2 === undefined ? [] : data2.numOfDeliveriesByDayOfMonth,
        label: data2 === undefined ? " " : data2.courierName + " "
      }
    ],
  }

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: true,
            drawBorder: true
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: true,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card>
      <CardHeader
        title="Number of shipments by date"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ShippingDyDate;
