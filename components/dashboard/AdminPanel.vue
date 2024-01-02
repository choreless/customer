<script setup lang="ts">
import { useIMask } from 'vue-imask';
import CompletedJobs from '~/components/jobs/admin/Completed.vue';
interface Customer {
	id: string
	phone: string
	first_name: string
	last_name: string
}

const api = useApi();

const dialog_ref = ref<HTMLDialogElement>();
const customers = ref<Customer[]>([]);
const first_name= ref('');
const last_name= ref('');
const phone = reactive({masked: '', unmasked: ''});
const loading = reactive({
	customers: false,
	create_customer: false
})
const error = reactive({
	first_name: undefined as undefined|boolean,
	last_name: undefined as undefined|boolean,
	phone: undefined as undefined|boolean
})

async function getCustomers(){
	loading.customers = true;
	const {data}: {data: Customer[]} = await api.get('/users');
	customers.value = data;
	loading.customers = false;
}
getCustomers();

async function deleteCustomer(id: string){
	await api.delete(`/users/account/${id}`);
	getCustomers();
	notify.info('Customer has been deleted.');
}

function closeDialog(){
	first_name.value = '';
	last_name.value = '';
	phone.masked = '';
	phone.unmasked = '';
	error.first_name = undefined;
	error.last_name = undefined;
	error.phone = undefined;
	dialog_ref.value?.close();
}

async function createCustomer(){
	error.first_name = !first_name.value;
	error.last_name = !last_name.value;
	error.phone = phone.unmasked.length!==10;
	if(!(error.first_name===false && error.last_name===false && error.phone===false)) return;
	loading.create_customer = true;
	const {data} = await api.post('/users', {
		roles: ['customer'],
		phone: `+1${phone.unmasked}`,
		first_name: first_name.value.trim(),
		last_name: last_name.value.trim()
	});
	if(data){
		notify.info('New customer has been created');
		getCustomers();
		closeDialog();
	}
	else notify.error('User account already exists.')
	loading.create_customer = false;
}

const phone_imask = useIMask({
	mask: [{mask: '000'}, {mask: '(000) 000-0000'}],
	unmask: true,
}, { onAccept(){
	error.phone = undefined;
	phone.masked=phone_imask.masked.value;
	phone.unmasked=phone_imask.unmasked.value.trim();
}})

watch(first_name, n=>{if(dialog_ref.value?.open) error.first_name = !n;})
watch(last_name, n=>{if(dialog_ref.value?.open) error.last_name = !n;})
watch(phone, n=>{if(dialog_ref.value?.open) error.phone = n.unmasked.length!==10;})
</script>

<template>
<div class="max-w-4xl mx-auto px-4">
	<div class="mt-6">
		<div class="flex justify-between">
			<h1 class="flex items-center gap-x-2 text-2xl font-mono font-bold">Customers <span v-if="loading.customers" class="loading loading-bars bg-primary"></span></h1>
			<button @click="()=>{dialog_ref?.show()}" class="btn btn-sm btn-primary mt-2 text-gray-50">
				<Icon name="material-symbols:add" class="text-2xl" />
				<p>Add customer</p>
			</button>
		</div>
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th>No.</th>
						<th>Name</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(customer, key) of customers" :key="customer.id">
						<td>{{key+1}}</td>
						<td>{{customer.first_name}} {{customer.last_name}}</td>
						<td>{{customer.phone}}</td>
						<td>
							<button @click="deleteCustomer(customer.id)" class="btn btn-sm btn-square btn-outline border-none btn-error hover:!text-white">
								<Icon name="ic:baseline-delete-forever" class="text-2xl" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="mt-6">
		<h1 class="flex items-center gap-x-2 text-2xl font-mono font-bold">Completed jobs</h1>
		<CompletedJobs />
	</div>
	<dialog ref="dialog_ref" class="modal !duration-0">
		<div class="modal-box max-w-[650px] text-brand-black">
			<h1 class="text-xl font-bold">Create new customer</h1>
			<div class="grid grid-cols-[1fr_auto] gap-x-2 justify-around items-center border border-base-content/20 rounded-[0.3125rem] mt-4">
				<label class="input-float">
					<input type="text" v-model="first_name" placeholder="" class="!border-0" />
					<p>First Name</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="error.first_name===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'First name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
					<img v-else-if="error.first_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
					<img v-else-if="error.first_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
				</div>
			</div>
			<p v-if="error.first_name" class="text-error">* First name is required</p>
			<div class="grid grid-cols-[1fr_auto] gap-x-2 justify-around items-center border border-base-content/20 rounded-[0.3125rem] mt-4">
				<label class="input-float">
					<input type="text" v-model="last_name" placeholder="" class="!border-0" />
					<p>Last Name</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="error.last_name===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'Last name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
					<img v-else-if="error.last_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
					<img v-else-if="error.last_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
				</div>
			</div>
			<p v-if="error.last_name" class="text-error">* Last name is required</p>
			<div class="grid grid-cols-[1fr_auto] gap-x-2 justify-around items-center border border-base-content/20 rounded-[0.3125rem] mt-4">
				<label class="input-float">
					<input type="tel" class="!border-none" :value="phone.masked" :ref="phone_imask.el" placeholder="" >
					<p>Phone number</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="error.phone===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'Phone number is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
					<img v-else-if="error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
					<img v-else-if="error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
				</div>
			</div>
			<p v-if="error.phone" class="text-error">* Phone number is required</p>
			<button @click='createCustomer()' class="btn btn-primary mt-2 block mx-auto"><p class="flex items-center gap-x-2">Create <span v-if="loading.create_customer" class="loading loading-sm"></span></p></button>
		</div>
		<div class="modal-backdrop bg-black/40" @click='closeDialog()' />
	</dialog>
</div>
</template>
