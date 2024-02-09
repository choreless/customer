<script setup lang="ts">
import SelectCustomer from '~/components/orders/washer/SelectCustomer.vue';
import Header from '~/components/orders/washer/Header.vue';
import OrderDetails from '~/components/orders/washer/OrderDetails.vue';
import Footer from '~/components/orders/washer/Footer.vue';
import type { CustomerInfo4Washer } from '~/types/user';
import type { UpdateResponseApi4Washer } from '~/types/order';

useHead({ title: 'Orders - New Order' })
definePageMeta({
	layout: 'clean',
	middleware: 'washer'
})
const api = useApi();

const step = ref<'select_customer'|'order_details'|'weight_order'>('select_customer');
const customer_id = ref('');
const customer = ref<CustomerInfo4Washer>();
const loading = ref(false);
// bag
const {bags, total_bag, total_weight, deleteBag} = useFormBags();
const is_wet = ref(false);
const due_time = ref<Date|null>(null);
const order_id = ref('');
const error = reactive({
	total_weight: false
})
const action = computed(()=>step.value==='weight_order' ? 'edit' : 'create');

async function next(){
	if(step.value==='order_details'){
		const {data} = await api.post('/orders', {customer_id: customer_id.value})
		order_id.value = data;
		step.value = 'weight_order';
	}
	else if(step.value==='weight_order'){
		error.total_weight = total_weight.value<=0;
		if(error.total_weight) return;
		loading.value = true;
		const {data}: {data: UpdateResponseApi4Washer} = await api.post(`/orders/${order_id.value}`, {
			action: 'edit',
			bags_initial: bags.value!.filter(v=>v && v>0),
			due_time: due_time.value ? due_time.value.valueOf() : null,
			is_wet: is_wet.value
		})
		if(data.success) await navigateTo('/orders/active');
		else notify.error('Failed to update the order');
		loading.value = false;
	}
}

watch(total_weight, n=>{ error.total_weight = n<=0; })
watch(customer_id, async n=>{
	const {data}: {data: CustomerInfo4Washer} = await api.get(`/users/${n}`);
	customer.value = data;
});

provide('action', action);
provide('order_id', order_id);
</script>

<template>
<div>
	<SelectCustomer v-if="step==='select_customer'" @setCustomerId="(v: string)=>{customer_id=v; step='order_details';}" />
	<div v-else class="flex flex-col h-screen gap-y-4">
		<Header v-model:due_time="due_time" :total_bag="total_bag" :total_weight="total_weight" :customer="customer" />
		<OrderDetails v-model:bags="bags" v-model:is_wet="is_wet" :step="step" :customer="customer" :deleteBag="deleteBag" :error_total_weight="error.total_weight" @next="next()" />
		<Footer :step="step" :total_weight="total_weight" :loading="loading" @next="next()" />
	</div>
</div>
</template>
