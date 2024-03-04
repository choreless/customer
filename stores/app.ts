import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export const useApp = defineStore('app', ()=>{
	const loading = ref(false); // global loading
	const breakpoints = useBreakpoints(breakpointsTailwind);

	return {
		loading, breakpoints
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useApp, import.meta.hot))
