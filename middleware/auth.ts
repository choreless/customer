export default defineNuxtRouteMiddleware(async () => {
	const {usertype} = useUser();

	if(!usertype) return navigateTo('/');
})
