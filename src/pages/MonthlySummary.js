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
import {createApiClient} from "../api";
import CompanyPicker from "../components/dashboard/CompanyPicker";
import DataPicker from "../components/monthlySummary/DataPicker";

let apiClient = createApiClient();

const Dashboard = () => {
    const [data, setData] = useState({
        totalDomesticDeliveries: 0,
        totalInternationalDeliveries: 0,
        totalAmountCharged: 0,
        averageShippingTime: 0,
        numberOfDeliveredDestinations: 0,
        averageDeliveriesPerDay: 0,
        totalPaymentPerDay: [],
        totalDeliveriesPerDay: [],
    })
    const [meta, setMeta] = useState([])
    const [year, setYear] = useState("")
    const [yearOptions, setYearOptions] = useState([])
    const [month, setMonth] = useState("")
    const [monthOptions, setMonthOptions] = useState([])

    const handleYearChange = (year) =>{
        setYear(year)
        const months = [...new Set (meta.filter(entry => entry.year === year).map(entry => entry.month))]
        setMonthOptions(months)
    }

    const handleMonthChange = (month) =>{
        setMonth(month)
    }


    useEffect(() => {
        async function asyncUseEffect() {
            const data = await apiClient.getMeta(1122332211)
            setMeta(data.data)
            const years = new Set()
            data.data.forEach( entry => {
                years.add(entry.year)
            })


            setYearOptions([...years])
        }

        asyncUseEffect()
    },[])


    useEffect(() => {
        async function asyncUseEffect() {
            if (month !== "") {
                const data = await apiClient.getMonthlySummary(1122332211, year, month)
                setData(data)
            }
        }

        asyncUseEffect()
    }, [month])

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
                        container
                        spacing={3}
                        sx={{paddingTop: 3, paddingLeft: 3}}
                    >
                        <Grid
                            item
                            lg={2}
                            md={2}
                            xl={2}
                            xs={2}
                        >
                            <Typography variant='h6'>Year:</Typography>
                            <DataPicker values={yearOptions} header="Year" onChange={handleYearChange}/>
                        </Grid>
                        <Grid
                            item
                            lg={2}
                            md={2}
                            xl={2}
                            xs={2}
                        >
                            <Typography variant='h6'>Month:</Typography>
                            <DataPicker values={monthOptions} header="Month" onChange={handleMonthChange}/>
                        </Grid>
                    </Grid>
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
