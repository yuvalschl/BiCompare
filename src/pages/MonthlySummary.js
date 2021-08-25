import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import StatCard from "../components/monthlySummary/StatCard";
import MonthlyDataGraph from "../components/monthlySummary/MonthlyDataGraph"
import { useEffect, useState} from "react";


const Dashboard = () => {
    const [data, setData] = useState({
        totalDomesticDeliveries: 323,
        totalInternationalDeliveries: 54,
        totalAmountCharged: 65,
        averageShippingTime: 234,
        numberOfDeliveredDestinations: 432,
        averageDeliveriesPerDay: 543,
        totalPaymentPerDay: [1,2,3,7,4,2,10,5,3],
        totalDeliveriesPerDay: [12,4,54,76,23,54,23,6,2,21],
    })

    return (
        <>
            <Helmet>
                <title>Monthly Summary</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Grid
                    container
                    spacing={3}
                    sx={{paddingTop: 3, paddingLeft: 3}}
                >
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xl={4}
                        xs={4}
                    >
                        <StatCard header="Total Local Deliveries" value={data.totalDomesticDeliveries}/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xl={4}
                        xs={4}
                    >
                        <StatCard header="Total International deliveries" value={data.totalInternationalDeliveries}/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xl={4}
                        xs={4}
                    >
                        <StatCard header="Total Amount Payed" value={data.totalAmountCharged}/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xl={4}
                        xs={4}
                    >
                        <StatCard header="Average shipping Time" value={data.averageShippingTime}/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xl={4}
                        xs={4}
                    >
                        <StatCard header="Number of Delivered Destinations" value={data.numberOfDeliveredDestinations}/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xl={4}
                        xs={4}
                    >
                        <StatCard header="Average number of Delivers Per Day" value={data.averageDeliveriesPerDay}/>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xl={6}
                        xs={6}
                    >
                        <MonthlyDataGraph header="Total Payment Per Day" monthlyData={data.totalPaymentPerDay}/>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xl={6}
                        xs={6}
                    >
                        <MonthlyDataGraph header="Total Deliveries Per Day" monthlyData={data.totalDeliveriesPerDay}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

export default Dashboard;
