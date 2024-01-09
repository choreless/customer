<script setup lang="ts">
import SelectCustomer from '~/components/orders/washer/SelectCustomer.vue';

useHead({ title: 'Jobs - New Order' })
definePageMeta({
	layout: 'clean',
	middleware: 'washer'
})
const order = useOrderWasher();
</script>

<template>
<div>
	<SelectCustomer v-show="order.step==='select_customer'" />
</div>
</template>
