import axios from 'axios';

let url
if(process.env.NODE_ENV === 'development') {
    url = 'http://localhost:9090/api/'
}

if(process.env.NODE_ENV === 'production') {
    url = ''
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
        getFilteredData: async (data) => {
            try{
                let res = await axios.get('http://localhost:3030/getIndicentsByFilter',data)
                return res.data
            }
            catch (error){
                console.error(error);
            }

        },
        postIncident: async (data) => {
            try{
                let res = await axios.post('http://localhost:3030/addIncident',data)
                return res.data
            }
            catch (error){
                console.error(error);
            }

        }

    }
};
