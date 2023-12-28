export const useSetting = defineStore('setting', ()=>{
	const loading = ref(false); // global loading

	return {
		loading
	}
})

if(import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSetting, import.meta.hot))
}
