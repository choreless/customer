<script setup lang="ts">
import Index from '~/components/customers/admin/Index.vue';
import Create from '~/components/customers/admin/Create.vue';
import EmptyPanel from '~/components/customers/admin/EmptyPanel.vue';
import Show from '~/components/customers/admin/Show.vue';

useHead({ title: 'Customers' })
definePageMeta({ middleware: 'admin' })
const customer = useAdminCustomer();
await customer.getCustomers();

onMounted(()=>{
	if(globalThis.innerWidth>=640 && customer.customers.length>0)
		customer.id = customer.customers[0].id;
})
</script>

<template>
<section class="mx-2.5 mb-4">
	<div class="max-w-7xl w-full mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2">
		<Index :class="customer.end_panel ? 'hidden sm:block' : 'block'" />
		<div :class="customer.end_panel ? 'block' : 'hidden sm:block'" >
			<EmptyPanel v-show="customer.end_panel===undefined" class="w-full" />
			<Show v-show="customer.end_panel==='show'" class="w-full" />
			<Create v-if="customer.end_panel==='create'" class="w-full" />
		</div>
	</div>
</section>
</template>
