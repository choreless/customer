<script setup lang="ts">
interface Customer {
	id: string
	first_name: string
	last_name: string
}
const api = useApi();
const order = useOrderWasher();

const customers = ref<{value: string, label: string}[]>([]);
const error = reactive({
	customer_id: false
})

const {data}: {data: Customer[]} = await api.get('/users');
customers.value = data.map(v=>({value: v.id, label: `${v.first_name} ${v.last_name}`}));

watch(()=>order.customer_id, n=>{ error.customer_id = !n; })

function next(){
	error.customer_id = !order.customer_id;
	if(error.customer_id) return;
	order.step = 'order_details';
}
</script>

<template>
<section class="flex flex-col h-screen">
	<div class="flex items-center justify-between mx-4 sm:mx-[4.375rem] mt-5 h-[3.125rem]">
		<div class="flex items-center gap-x-2.5">
			<img src="https://ik.imagekit.io/choreless/v2/icons/busket.svg" alt="icon" loading="lazy" class="w-9 sm:w-12">
			<h1 class="text-[2rem]">New Order</h1>
		</div>
		<NuxtLink to='/dashboard' class="btn btn-ghost btn-square hover:bg-brand-orange hover:text-white group">
			<Icon name="material-symbols:close-rounded" class="text-4xl sm:text-5xl transition-transform duration-500 group-hover:-rotate-90" />
		</NuxtLink>
	</div>
	<div class="grow flex items-center justify-center">
		<div>
			<h1 class="text-3xl sm:text-5xl">Who is the customer?</h1>
			<div class="mt-8 grid grid-cols-[auto_1fr] items-center gap-x-[1.6875rem]">
				<IconPerson class="stroke-black w-6" />
				<Multiselect v-model="order.customer_id" :options="customers" placeholder="Select customer" :searchable="true" :canClear="false" :closeOnDeselect="true" class="input-md" />
				<span></span>
				<p v-if="error.customer_id" class="text-error">* Customer name is required</p>
			</div>
		</div>
	</div>
	<hr>
	<div class="ms-auto">
		<button @click="next()" class="btn rounded-full text-base mx-3 sm:mx-[3.125rem] my-5 bg-brand-orange text-white hover:border-brand-orange hover:bg-transparent hover:text-brand-orange">Continue</button>
	</div>
</section>
</template>
