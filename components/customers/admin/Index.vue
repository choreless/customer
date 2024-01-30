<script setup lang="ts">
const customer_store = useAdminCustomer();
</script>

<template>
<div>
	<div class="w-full sm:border-r">
		<div class="flex items-center justify-between text-sm h-10 mx-2.5">
			<p class="text-sm">Showing customers</p>
			<button class="btn btn-sm btn-ghost btn-square hover:font-bold hover:bg-brand-orange hover:text-white" @click="customer_store.end_panel='create'">
				<Icon name="material-symbols:add-rounded" class="text-2xl" />
			</button>
		</div>
		<hr>
		<label class="flex items-center join border m-2.5">
			<input v-model="customer_store.search" type="search" placeholder="Search by name, email, phone" class="join-item input w-full focus:border-none focus:outline-none focus-within:border-none focus-within:outline-none">
			<Icon name="ic:outline-search" class="join-item text-3xl me-2" />
		</label>
		<div class="flex gap-x-2 px-4" :class="!customer_store.loading.index && 'invisible'">
			<span class="loading loading-bars bg-primary" />
			<p>loading</p>
		</div>
		<p class="px-2">{{ customer_store.filter_customers.length }} customer{{ customer_store.filter_customers.length>1 ? 's':'' }}</p>
		<div v-if="customer_store.filter_customers.length" class="min-h-[9rem] max-h-[calc(100vh-17rem)] overflow-y-auto">
			<button v-for="customer of customer_store.filter_customers" :key="customer.id" class="flex items-center justify-between gap-x-3 w-full py-2.5 px-4 text-start border-b [&.active]:bg-brand-black/10 hover:!bg-brand-black/10" :class="customer_store.id===customer.id && 'active'" @click="customer_store.id=customer.id">
				<div class="whitespace-nowrap overflow-auto">
					<p v-if="customer.type==='retail'">{{ customer.first_name }} {{ customer.last_name }}</p>
					<p v-else>{{ customer.business_name }}</p>
					<p class="whitespace-nowrap overflow-auto text-black/50">{{ customer.email }}</p>
				</div>
				<p class="text-sm">{{ customer.phone }}</p>
			</button>
		</div>
		<p v-else class="alert alert-info mx-2">No customer found</p>
	</div>
</div>
</template>
