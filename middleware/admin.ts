export default defineNuxtRouteMiddleware(() => {
	const {usertype} = useUser();

	if(!usertype) return navigateTo('/');
	if(usertype!=='admin') return navigateTo('/dashboard');
})
