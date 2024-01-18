<script setup lang="ts">
interface Customer {
	id: string
	first_name: string
	last_name: string
}

const emit = defineEmits(['setCustomerId']);
const api = useApi();

const customers = ref<{value: string, label: string}[]>([]);
const customer_id = ref('');
const error = reactive({
	customer_id: false
})

const {data}: {data: Customer[]} = await api.get('/users');
customers.value = data.map(v=>({value: v.id, label: `${v.first_name} ${v.last_name}`}));

function next(){
	error.customer_id = !customer_id.value;
	if(error.customer_id) return;
	emit('setCustomerId', customer_id.value);
}

watch(customer_id, n=>{ error.customer_id = !n; })
</script>

<template>
<section class="flex flex-col h-screen">
	<div class="flex items-center justify-between mx-4 sm:mx-[4.375rem] mt-5 h-[3.125rem]">
		<div class="flex items-center gap-x-2.5">
			<img src="https://ik.imagekit.io/choreless/v2/icons/busket.svg" alt="icon" loading="lazy" class="w-9 sm:w-12">
			<h1 class="text-[2rem]">New Order</h1>
		</div>
		<NuxtLink to="/dashboard" class="btn btn-ghost btn-square hover:bg-brand-orange hover:text-white group">
			<Icon name="material-symbols:close-rounded" class="text-4xl sm:text-5xl transition-transform duration-500 group-hover:-rotate-90" />
		</NuxtLink>
	</div>
	<div class="grow flex items-center justify-center">
		<div>
			<h1 class="text-3xl sm:text-5xl">Who is the customer?</h1>
			<div class="mt-8 grid grid-cols-[auto_1fr] items-center gap-x-[1.6875rem]">
				<IconPerson class="stroke-black w-6" />
				<Multiselect v-model="customer_id" :options="customers" placeholder="Select customer" :searchable="true" :can-clear="false" :close-on-deselect="true" class="input-md" />
				<span />
				<p v-if="error.customer_id" class="text-error">* Customer name is required</p>
			</div>
		</div>
	</div>
	<hr>
	<div class="ms-auto">
		<button class="btn rounded-full text-base mx-3 sm:mx-[3.125rem] my-5 bg-brand-orange text-white hover:bg-transparent hover:border-brand-orange hover:text-brand-orange" @click="next()">Continue</button>
	</div>
</section>
</template>
