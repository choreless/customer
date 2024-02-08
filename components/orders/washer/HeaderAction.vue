<script setup lang="ts">
type Action = 'create'|'edit';

const action = inject<Action|Ref<Action>>('action');
const order_id = inject<string|Ref<string>>('order_id');
const is_delete_dialog_open = ref(false);

const api = useApi();

async function deleteOrder(){
	const {data}: {data: boolean} = await api.delete(`/orders/${isRef(order_id) ? order_id.value : order_id}`);
	if(data){
		notify.success('Order has been deleted');
		await navigateTo('/orders/active')
	}
	else notify.error('Failed to delete the order');
}
</script>

<template>
<div>
	<div class="flex items-center gap-x-2 lg:gap-x-[3.125rem]">
		<div class="dropdown dropdown-end dropdown-hover group" :class="action==='create' && 'invisible'">
			<div class="pb-1"><button class="w-9 h-9 rounded-md group-hover:bg-info"><Icon name="mdi:dots-horizontal" class="text-4xl" /></button></div>
			<ul tabindex="0" class="dropdown-content z-[1] menu border rounded-lg shadow w-52 p-0 bg-base-100">
				<li class="rounded-t-[inherit] hover:bg-info active:bg-info group/dropdown-item">
					<button class="active:!bg-inherit active:!text-inherit !bg-transparent group-hover/dropdown-item:-translate-x-1" @click="notify.underDevelopment()">
						<IconPrinter class="w-5" />
						<p>Print order details</p>
					</button>
				</li>
				<li class="rounded-b-[inherit] hover:bg-info active:bg-info group/dropdown-item">
					<button class="active:!bg-inherit active:!text-inherit !bg-transparent group-hover/dropdown-item:-translate-x-1" @click="is_delete_dialog_open=true">
						<Icon name="material-symbols:delete-forever-outline" class="text-xl" />
						<p>Delete order</p>
					</button>
				</li>
			</ul>
		</div>
		<NuxtLink to="/dashboard" class="block w-9 h-9 rounded-md hover:bg-brand-orange hover:text-white group">
			<Icon name="material-symbols:close-rounded" class="text-4xl transition-transform duration-500 group-hover:-rotate-90" />
		</NuxtLink>
	</div>
	<dialog class="modal" :class="is_delete_dialog_open && 'modal-open'">
		<div class="modal-box max-w-2xl rounded-2xl shadow-[0px_0px_15px_0px_#00000015] bg-white">
			<h1 class="text-lg sm:text-3xl text-center mt-2 sm:mt-6">Are you sure you want to void this order?</h1>
			<p class="sm:text-2xl text-center mt-1 sm:mt-4">You will not be able to reactive it.</p>
			<div class="flex justify-center gap-x-8 mt-4 sm:mt-8">
				<button class="btn btn-outline sm:btn-wide rounded-full hover:scale-105 btn-info" @click="is_delete_dialog_open=false">CANCEL</button>
				<button class="btn sm:btn-wide rounded-full hover:scale-105 btn-error text-white" @click="deleteOrder()">CONFIRM</button>
			</div>
		</div>
		<div class="modal-backdrop bg-black/40" @click="is_delete_dialog_open=false" />
	</dialog>
</div>
</template>
