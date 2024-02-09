<script setup lang="ts">
import Header from '~/components/orders/washer/Header.vue';
import OrderDetails from '~/components/orders/washer/OrderDetails.vue';
import Footer from '~/components/orders/washer/Footer.vue';
import type { CustomerInfo4Washer } from '~/types/user';
import type { Order4Washer } from '~/types/order';

definePageMeta({
	layout: 'clean',
	middleware: 'washer'
})
const api = useApi();
const {params} = useRoute();
const id = params.id as string;

const customer_id = ref('');
const customer = ref<CustomerInfo4Washer>();
const loading = ref(false);
// bag
const {bags, total_bag, total_weight, deleteBag} = useFormBags();
const due_time = ref<Date|null>(null);
const error = reactive({
	total_weight: false
})

async function getCustomer(){
	const {data: customer_info}: {data: CustomerInfo4Washer} = await api.get(`/users/${customer_id.value}`);
	customer.value = customer_info;
}

async function next(){
	error.total_weight = total_weight.value<=0;
	if(error.total_weight) return;
	loading.value = true;
	const {data}: {data: boolean} = await api.post(`/orders/${id}`, {
		action: 'complete',
		bags_final: bags.value!.filter(v=>v && v>0)
	})
	if(data) await navigateTo('/orders/active');
	else notify.error('Failed to complete the order');
	loading.value = false;
}

const {data}: {data: Order4Washer|false} = await api.get(`/orders/${id}`);
if(data){
	if(!data.is_wet) await navigateTo('/orders/active');
	customer_id.value = data.customer_id;
	getCustomer();
	if(data.due_time) due_time.value = new Date(data.due_time);
}
else await navigateTo('/orders/active');

watch(total_weight, n=>{ error.total_weight = n<=0; })

provide('action', 'edit');
provide('order_id', id);
</script>

<template>
<div>
	<Title>Wet Weight - {{ id }}</Title>
	<div class="flex flex-col h-screen gap-y-4">
		<Header v-model:due_time="due_time" :total_bag="total_bag" :total_weight="total_weight" :customer="customer" />
		<OrderDetails v-model:bags="bags" step="wet_weight" :deleteBag="deleteBag" :error_total_weight="error.total_weight" @next="next()" />
		<Footer step="wet_weight" :total_weight="total_weight" :loading="loading" @next="next()" />
	</div>
</div>
</template>
