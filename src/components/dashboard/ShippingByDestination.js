import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, colors, Divider, useTheme } from '@material-ui/core';


const ShippingDyPostalCode = ({data1, data2}) => {
  const theme = useTheme();

  const setData = (dataToSet) => {
    if (dataToSet !== undefined && Object.keys(dataToSet).length !== 0) {
      const res = []
      for (const entry of dataToSet.averageShippingTimeByDestination){
        res.push({x: entry.destination, y: entry.count})
      }
      return res
    }
  }

  function setUnionByPostalCode (A, B){
    let a = new Set(A.map(a => a.destination));
    let b = new Set(B.map(a => a.destination));
    return [...new Set([...a, ...b])]
  }

  const data = {
    label: 'Legend Title',
    labels: setUnionByPostalCode(data1.averageShippingTimeByDestination || [], data2.averageShippingTimeByDestination || []),
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        borderColor: colors.indigo[500],
        data: setData(data1),
        fill: false,
        label: data1.companyName || ' '
      },
      {
        backgroundColor: colors.blue[200],
        borderColor: colors.blue[200],
        fill: false,
        data: setData(data2),
        label: data2.companyName || ' '
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
          type: 'category',
          pointRadius: 12,
          display: true, // mandatory
          scaleLabel: {
            display: true, // mandatory
          },
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
        title="Average shipping time by destination"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ShippingDyPostalCode;
