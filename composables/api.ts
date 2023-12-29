import axios from 'axios';

export const useApi = ()=>{
	const config = useRuntimeConfig();
	const {token} = useUser();
	axios.defaults.baseURL = config.public.base.ApiMain;
	if(token) axios.defaults.headers.common['User-Authorization'] = token;
	return axios;
}
