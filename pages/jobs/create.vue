<script setup lang="ts">
import Bags from '@/components/forms/jobs/Bags.vue';
interface Customer {
	id: string
	first_name: string
	last_name: string
}

useHead({ title: 'Jobs - Create' })
definePageMeta({ middleware: 'washer' })
const api = useApi();
const setting = useSetting();

const customers = ref<{value: string, label: string}[]>([]);
const customer_id = ref('');
const bags = ref<(number|null)[]>([null]);
const error = reactive({
	customer_id: false
})

async function createJob(){
	error.customer_id = !customer_id.value;
	if(error.customer_id) return;
	setting.loading = true;
	const {data} = await api.post('/jobs', {
		customer_id: customer_id.value,
		bags: bags.value.filter(v=>v)
	})
	notify.success('A job has been created successfully.')
	await navigateTo(`/jobs/${data}`);
	setting.loading = false;
}

const {data}: {data: Customer[]} = await api.get('/users');
customers.value = data.map(v=>({value: v.id, label: `${v.first_name} ${v.last_name}`}));

watch(customer_id, n=>{ error.customer_id = !n; })
</script>

<template>
<div class="mt-6 max-w-4xl mx-auto">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold font-mono">Create job</h1>
		<NuxtLink to='/dashboard' class="btn btn-sm btn-ghost btn-square hover:bg-brand-orange hover:text-white">
			<Icon name="material-symbols:close-rounded" class="text-3xl" />
		</NuxtLink>
	</div>
	<div class="mt-4">
		<Multiselect v-model="customer_id" :options="customers" placeholder="Select customer" :searchable="true" :canClear="false" :closeOnDeselect="true" class="input-md" />
		<p v-if="error.customer_id" class="text-error">* Customer name is required</p>
		<Bags :error_weight="false" v-model="bags" />
		<button @click="createJob()" class="btn btn-outline mx-auto block mt-4 btn-primary">Create job</button>
	</div>
</div>
</template>
