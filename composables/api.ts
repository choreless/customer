import axios from 'axios';

export const useApi = ()=>{
	const config = useRuntimeConfig();
	const {token, usertype} = useUser();
	axios.defaults.baseURL = config.public.base.API_MAIN;
	if(token) axios.defaults.headers.common['User-Authorization'] = token;
	if(usertype) axios.defaults.headers.common['User-Usertype'] = usertype;
	return axios;
}
