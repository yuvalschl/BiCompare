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
        
	}
};
