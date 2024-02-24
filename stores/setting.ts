import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export const useSetting = defineStore('setting', ()=>{
	const loading = ref(false); // global loading
	const breakpoints = useBreakpoints(breakpointsTailwind);

	return {
		loading, breakpoints
	}
})

if(import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSetting, import.meta.hot))
}
