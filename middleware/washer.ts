export default defineNuxtRouteMiddleware(async () => {
	const {usertype} = useUser();

	const {push} = useRouter();
	if(!usertype) await push('/');
	else if(usertype!=='washer') await push('/dashboard');
})
