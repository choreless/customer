export default defineNuxtRouteMiddleware(async () => {
	const {usertype} = useUser();

	if(usertype){
		const {push} = useRouter();
		await push('/dashboard');
	}
})
