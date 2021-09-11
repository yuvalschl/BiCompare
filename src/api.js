import axios from 'axios';

let url
if(process.env.NODE_ENV === 'development') {
    url = 'http://localhost:9090/api/'
}

if(process.env.NODE_ENV === 'production') {
    url = "http://ec2-3-133-98-107.us-east-2.compute.amazonaws.com:9090/api"
}

export const createApiClient = () => {
    return {
        getMeta: async (clientId) => {
            try{
                let res = await axios.get(`${url}data/meta/${clientId}`)
                return res.data
            }
            catch (error){
                console.error(error);
            }
        },
        getCourierData: async (clientId, year, month, courierName) => {
            try{
                let res = await axios.get(`${url}data/${clientId}/${year}/${month}/${courierName}`)
                return res.data
            }
            catch (error){
                console.error(error);
            }
        },
        getMonthlySummary: async (clientId, year, month) => {
            try{
                let res = await axios.get(`${url}data/monthly_summary/${clientId}/${year}/${month}/`)
                return res.data
            }
            catch (error){
                console.error(error);
            }
        },
        postMonthlyData: async (data, year, month, courier) => {
            try{
                let res = await axios.post(`http://localhost:9090/api/data/1122332211/us-east-1:e9fe86c4-1583-48bf-8e40-d73b8c61c60a/${year}/${month}/${courier}`,data)
                return res.status
            }
            catch (error){
                console.error(error);
            }

        },
        updateMonthlyData: async (data, year, month, courier) => {
            try{
                let res = await axios.put(`http://localhost:9090/api/data/1122332211/us-east-1:e9fe86c4-1583-48bf-8e40-d73b8c61c60a/${year}/${month}/${courier}`,data)
                return res.status
            }
            catch (error){
                console.error(error);
            }
        },
        deleteMonthlyData: async (year, month, courier) => {
            try{
                let res = await axios.delete(`http://localhost:9090/api/data/1122332211/us-east-1:e9fe86c4-1583-48bf-8e40-d73b8c61c60a/${year}/${month}/${courier}`)
                return res.status
            }
            catch (error){
                console.error(error);
            }
        },
        getUserData: async (id) =>{
            try{
                let res = await axios.get(`http://localhost:9090/api/users/role/${id}`)
                return res.data
            }
            catch (error){
                console.error(error);
            }
        }

    }
};
