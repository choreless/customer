import useFormPhone from '~/composables/useFormPhone';

export const useComponentEntry = defineStore('component_entry', ()=>{
	const step = ref<0|1|2>(0);
	const phone = useFormPhone();

	const error = reactive({
		phone: undefined as undefined | boolean
	})

	watch(()=>phone.unmasked, n=>{
		error.phone = n.value.length===10 ? false : undefined;
	}, {deep: true})

	return {
		step, phone,
		error
	}
})

if(import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useComponentEntry, import.meta.hot))
