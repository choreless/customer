<script setup lang="ts">
import SelectCustomer from '~/components/orders/washer/SelectCustomer.vue';
import Header from '~/components/orders/washer/Header.vue';
import OrderDetails from '~/components/orders/washer/OrderDetails.vue';
import Footer from '~/components/orders/washer/Footer.vue';
type Step = 'select_customer'|'order_details'|'weight_order';
interface Customer {
	detergent: string
	water_temperature: string
	dryer_temperature: string
	addons: string[]
	comment: string
	customer_name: string
}

useHead({ title: 'Orders - New Order' })
definePageMeta({
	layout: 'clean',
	middleware: 'washer'
})
const api = useApi();

const step = ref<Step>('select_customer');
const customer_id = ref('');
const customer = ref<Customer>();
const loading = ref(false);
// bag
const bags = ref<(number|null)[]>();
const total_bag = ref(0);
const total_weight = ref(0);
const due_time = ref('');
const error = reactive({
	total_weight: false
})

async function next(){
	if(step.value==='order_details') step.value = 'weight_order';
	else if(step.value==='weight_order'){
		error.total_weight = total_weight.value<=0;
		if(error.total_weight) return;
		loading.value = true;
		await api.post('/orders', {
			customer_id: customer_id.value,
			bags: bags.value!.filter(v=>v && v>0),
			due_time: due_time.value
		})
		notify.success('Order has bene created successfully');
		await navigateTo('/orders/active');
		loading.value = false;
	}
}

watch(total_weight, n=>{ error.total_weight = n<=0; })
watch(customer_id, async n=>{
	const {data}: {data: Customer} = await api.get(`/users/${n}`);
	customer.value = data;
});

export type { Step, Customer };
</script>

<template>
<div>
	<SelectCustomer v-show="step==='select_customer'" @setCustomerId="(v: string)=>{customer_id=v; step='order_details';}" />
	<div v-if="['order_details', 'weight_order'].includes(step)" class="flex flex-col h-screen gap-y-4">
		<Header :total_bag="total_bag" :total_weight="total_weight" :customer="customer" :due_time="due_time" @dueTime="v=>{due_time=v}" />
		<OrderDetails v-if="['order_details', 'weight_order'].includes(step)" :step="step" :customer="customer" :error_total_weight="error.total_weight" @setBags="v=>{ bags=v }" @setTotalBag="v=>{ total_bag = v; }" @setTotalWeight="v=>{ total_weight=v }" @next="next()" />
		<Footer :step="step" :total_weight="total_weight" :loading="loading" @next="next()" />
	</div>
</div>
</template>
