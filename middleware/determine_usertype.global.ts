import type { Role } from "~/types/user"

interface AuthenticationResponse {
	uid: string
	created_at: string
	iat: number
	roles: Role[]
}

export default defineNuxtRouteMiddleware(async () => {
	const user = useUser();

	if(user.token){
		const api = useApi();
		const { data } : {data: false|AuthenticationResponse} = await api({url: '/users/authentication', headers: {'User-Authorization': user.token}});
		if(!(data && data.roles.includes(user.usertype))) user.$reset();
	}
	else user.$reset();
})
