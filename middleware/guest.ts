export default defineNuxtRouteMiddleware(() => {
	const {usertype} = useUser()

	if(usertype) return navigateTo('/dashboard');
})
