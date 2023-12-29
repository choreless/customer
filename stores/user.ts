import type { Role } from "~/types/user";

export const useUser = defineStore('user', ()=>{
	// note: 34560000 (400 days)
	const token = useCookie<string>('token', { maxAge: 34560000, default(){return ''} });
	const roles = useCookie<Role[]>('roles', { maxAge: 34560000, default(){return []} });
	const usertype = useCookie<Role>('usertype', { maxAge: 34560000, default(){return ''} });

	function $reset(){
		token.value = '';
		roles.value = [];
		usertype.value = '';
	}

	return {
		token, roles, usertype,
		$reset
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
