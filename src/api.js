import axios from 'axios';

export const createApiClient = () => {
	return {
		getCourierData: async (courierName) => {
			try{
                let res = await axios.get(`http://localhost:9090/api/data/1122332211/2020/10/${courierName}`)
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
