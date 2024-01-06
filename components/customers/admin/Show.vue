<script setup lang="ts">
import zips from '~/assets/data/zip_services.json';
import { IMask, useIMask } from 'vue-imask';
import { z } from 'zod';
import { addons as addon_list, detergents, dryer_temperatures, water_temperatures } from '~/lib/customer';
import type { CustomerType } from '~/types/user';

const api = useApi();
const customer = useAdminCustomer();

interface Customer {
	id: string,
	type: CustomerType,
	business_name?: string,
	address: string,
	unit_or_suite?: string,
	city: string,
	zip: string,
	addons: typeof addon_list[number][],
	detergent: typeof detergents[number],
	dryer_temperature: typeof dryer_temperatures[number],
	water_temperature: typeof water_temperatures[number],
	comment: string,
	first_name: string,
	last_name: string,
	phone: string,
	email: string
}

const tab = ref<'details'|'orders'|'type'|'info'|'preference'>('details');
const type = ref<CustomerType>();
const business_name = ref('');
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const address = ref('');
const unit_or_suite = ref('');
const city = ref('');
const zip = ref('');
const phone = reactive({masked: '', unmasked: ''});
const addons = ref<typeof addon_list[number][]>([]);
const detergent = ref<typeof detergents[number]>();
const dryer_temperature = ref<typeof dryer_temperatures[number]>()
const water_temperature = ref<typeof water_temperatures[number]>();
const comment = ref('');

const loading = reactive({
	email_verifier: false,
	update: false
})
const error = reactive({
	business_name: undefined as undefined|boolean,
	first_name: undefined as undefined|boolean,
	last_name: undefined as undefined|boolean,
	email: undefined as undefined|boolean|'exists',
	phone: undefined as undefined|boolean|'exists',
	address: undefined as undefined|boolean,
	city: undefined as undefined|boolean,
	zip: undefined as undefined|boolean,
	detergent: false,
	dryer_temperature: false,
	water_temperature: false
})

async function verifyEmail(){
	if(z.string().email().safeParse(email.value).success){
		loading.email_verifier = true;
		const {data} = await api.get('/users/email_verifier?email='+email.value);
		error.email = !data;
		loading.email_verifier = false;
	}
	else error.email = true;
}

const phone_imask = useIMask({
	mask: [{mask: '000'}, {mask: '(000) 000-0000'}],
	unmask: true,
}, { onAccept(){
	phone.masked=phone_imask.masked.value;
	phone.unmasked=phone_imask.unmasked.value.trim();
}})

async function getCustomer(){
	const {data}: {data: Customer|false} = await api.get(`/users/${customer.id}`);
	if(data){
		first_name.value = data.first_name;
		last_name.value = data.last_name;
		type.value = data.type;
		business_name.value = data.business_name ?? '';
		first_name.value = data.first_name;
		last_name.value = data.last_name;
		email.value = data.email;
		if(data.phone){
			data.phone = data.phone.slice(2);
			const phone_masked = IMask.createMask({mask: [{mask: '000'}, {mask: '(000) 000-0000'}]});
			phone_masked.resolve(data.phone);
			phone.masked = phone_masked.value;
			phone.unmasked = phone_masked.unmaskedValue;
		}
		address.value = data.address;
		unit_or_suite.value = data.unit_or_suite ?? '';
		city.value = data.city;
		zip.value = data.zip;
		addons.value = data.addons;
		detergent.value = data.detergent;
		dryer_temperature.value = data.dryer_temperature;
		water_temperature.value = data.water_temperature;
		comment.value = data.comment ?? '';
	}
}

watch(()=>customer.id, async ()=>{
	await getCustomer();
	tab.value = 'details';
}, { immediate: true })

async function update(){
	type UpdateResponse =
	{ success: false, error: 'input'|('phone_exists'|'email_exists')[] } |
	{ success: true }

	if(tab.value==='type'){
		if(type.value==='commercial'){
			error.business_name = !business_name.value;
			if(error.business_name) return;
		}
		loading.update = true;
		const {data}: {data: UpdateResponse} = await api.put(`/users/${customer.id}`, {
			type: type.value,
			business_name: type.value==='commercial' ? business_name.value : null
		})
		if(data.success) notify.success('Information has been updated.');
		else notify.error('Failed to update the information.')
		loading.update = false;
	}
	else if(tab.value==='preference'){
		error.detergent = !detergent.value;
		error.dryer_temperature = !dryer_temperature.value;
		error.water_temperature = !water_temperature.value;
		if(error.detergent || error.dryer_temperature || error.water_temperature) return;
		loading.update = true;
		const {data}: {data: UpdateResponse} = await api.put(`/users/${customer.id}`, {
			addons: addons.value,
			detergent: detergent.value,
			dryer_temperature: dryer_temperature.value,
			water_temperature: water_temperature.value,
			comment: comment.value,
		})
		if(data.success) notify.success('Information has been updated.');
		else notify.error('Failed to update the information.')
		loading.update = false;
	}
	else if(tab.value==='info'){
		loading.update = true;
		if(error.email!=='exists') await verifyEmail();
		error.first_name = !first_name.value;
		error.last_name = !last_name.value;
		if(error.phone!=='exists') error.phone = phone.unmasked.length!==10;
		error.address = !address.value;
		error.city = !city.value;
		error.zip = !zips.includes(zip.value);
		loading.update = false;
		if(error.first_name || error.last_name || error.email || error.phone || error.address || error.city || error.zip) return;
		loading.update = true;
		const {data}: {data: UpdateResponse} = await api.put(`/users/${customer.id}`, {
			first_name: first_name.value,
			last_name: last_name.value,
			email: email.value,
			phone: `+1${phone.unmasked}`,
			address: address.value,
			unit_or_suite: unit_or_suite.value ? unit_or_suite.value : null,
			city: city.value,
			zip: zip.value
		})
		if(data.success){
			notify.success('Information has been updated.');
			await customer.getCustomers();
			await getCustomer();
		}
		else {
			if(data.error==='input') notify.error('Invalid data. Contact with Administration.')
			else {
				notify.error('Customer already exists.');
				if(data.error.includes('phone_exists')) error.phone = 'exists';
				if(data.error.includes('email_exists')) error.email = 'exists';
			}
		}
		loading.update = false;
	}
}

async function deleteCustomer(){
	await api.delete(`/users/account/${customer.id}`);
	customer.getCustomers();
	notify.info('Customer has been deleted.');
	customer.end_panel = undefined;
}

watch(first_name, n=>{ error.first_name = !n })
watch(last_name, n=>{ error.last_name = !n })
watch(email, ()=>{ error.email = !z.string().email().safeParse(email.value).success; })
watch(phone, n=>{ error.phone = n.unmasked.length!==10 })
watch(address, n=>{ error.address = !n })
watch(city, n=>{ error.city = !n })
watch(zip, n=>{ error.zip = !zips.includes(n); })
watch(detergent, ()=>{ error.detergent = false; })
watch(dryer_temperature, ()=>{ error.dryer_temperature = false; })
watch(water_temperature, ()=>{ error.dryer_temperature = false; })
watch(business_name, n=>{ error.business_name = !n })
</script>

<template>
<div>
	<button @click="customer.id=''" class="btn btn-sm btn-outline flex ms-auto gap-x-1 btn-primary mx-2 sm:hidden">
		<Icon name="material-symbols:arrow-back" class="text-lg" />
		<p>Go Back</p>
	</button>
	<div class="grid grid-cols-[auto_1fr] items-center justify-around text-sm h-10 mx-4">
		<div class="grid grid-cols-[auto_1fr] items-center gap-x-4">
			<p class="text-sm sm:text-lg font-bold whitespace-nowrap overflow-auto">{{ first_name }} {{ last_name }}</p>
			<h1 class="badge rounded-md capitalize text-xs" :class="type==='retail' ? 'badge-success' : 'badge-info'">{{ type }}</h1>
		</div>
		<div class="flex items-center justify-end gap-x-1">
			<button class="btn btn-sm btn-ghost btn-square hover:font-bold hover:bg-brand-orange hover:text-white"><Icon name="material-symbols:add-rounded" class="text-2xl" /></button>
			<div class="dropdown dropdown-end dropdown-hover">
				<button class="btn btn-sm btn-ghost btn-square hover:font-bold hover:bg-info"><Icon name="mdi:dots-horizontal" class="text-2xl" /></button>
				<ul tabindex="0" class="dropdown-content z-[1] menu shadow rounded-lg w-52 border p-0 bg-base-100">
					<li class="rounded-none hover:font-bold hover:bg-info active:bg-info"><button @click="deleteCustomer()" class="active:!bg-inherit active:!text-inherit">Delete</button></li>
					<li class="rounded-none hover:font-bold hover:bg-info active:bg-info"><button @click="tab='info';" class="active:!bg-inherit active:!text-inherit">Edit Info</button></li>
					<li class="rounded-none hover:font-bold hover:bg-info active:bg-info"><button @click="tab='preference';" class="active:!bg-inherit active:!text-inherit">Edit Preference</button></li>
					<li class="rounded-none hover:font-bold hover:bg-info active:bg-info"><button @click="tab='type';" class="active:!bg-inherit active:!text-inherit">Edit Type</button></li>
				</ul>
			</div>
		</div>
	</div>
	<hr>
	<div role="tablist" class="tabs tabs-bordered w-fit px-2">
		<button role="tab" class="tab" :class="tab==='details' ? 'tab-active !border-b-brand-orange' : '!border-b-0'" @click="tab='details'" >Details</button>
		<button role="tab" class="tab" :class="tab==='orders' ? 'tab-active !border-b-brand-orange' : '!border-b-0'" @click="tab='orders'" >Orders</button>
	</div>
	<div v-if="tab==='details'" class="mt-5">
		<div class="flex flex-col gap-y-3 px-2.5 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex items-center gap-x-2.5">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaDollar.svg" alt="icon" loading="lazy" class="w-8">
				<div>
					<p class="font-bold text-brand-orange">$2230.00</p>
					<p class="text-sm">Total Spend</p>
				</div>
			</div>
			<div class="flex items-center gap-x-2.5">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaBag.svg" alt="icon" loading="lazy" class="w-8">
				<div>
					<p class="font-bold text-brand-orange">$2230.00</p>
					<p class="text-sm">Total Spend</p>
				</div>
			</div>
			<div class="flex items-center gap-x-2.5">
				<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaCalendar.svg" alt="icon" loading="lazy" class="w-8">
				<div>
					<p class="font-bold text-brand-orange">23/03/24</p>
					<p class="text-sm">Last order date</p>
				</div>
			</div>
		</div>
		<hr class="mt-5">
		<div class="flex gap-x-2.5 m-2.5 items-start">
			<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaPeople.svg" alt="icon" loading="lazy" class="w-9 mt-1">
			<div>
				<p class="font-bold">Contact info</p>
				<div class="mt-2.5">
					<p class="text-sm leading-5">{{ first_name }} {{ last_name }}</p>
					<p class="text-sm leading-5">{{ email }}</p>
					<p class="text-sm leading-5">{{ phone.masked }}</p>
				</div>
			</div>
		</div>
		<hr>
		<div class="flex gap-x-2.5 m-2.5 items-start">
			<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaLocation2.svg" alt="icon" loading="lazy" class="w-8">
			<div>
				<p class="font-bold">Address</p>
				<div class="mt-2.5">
					<p class="text-sm leading-5">{{ address }}</p>
					<p class="text-sm leading-5">{{ unit_or_suite }}</p>
					<p class="text-sm leading-5">{{ city }} WA {{ zip }}</p>
				</div>
			</div>
		</div>
		<hr>
		<div class="flex gap-x-2.5 m-2.5 items-start">
			<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaDollar.svg" alt="icon" loading="lazy" class="w-8">
			<div>
				<p class="font-bold">Available Balance</p>
				<p class="mt-2.5 text-brand-orange underline text-sm">Available Credit : $22.54</p>
			</div>
		</div>
		<hr>
		<div class="flex gap-x-2.5 m-2.5 items-start">
			<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaReset.svg" alt="icon" loading="lazy" class="w-8">
			<div>
				<p class="font-bold">Recurring Orders</p>
				<p class="mt-2.5 text-brand-orange underline text-sm">0 Schedule</p>
			</div>
		</div>
		<hr>
		<div class="flex gap-x-2.5 m-2.5 items-start">
			<img src="https://ik.imagekit.io/choreless/v2/icons/FigmaBasket.svg" alt="icon" loading="lazy" class="w-8">
			<div>
				<p class="font-bold">Last order</p>
				<p class="mt-2.5 text-brand-orange underline text-sm"><span class="font-bold">CH-252</span> (Completed)</p>
			</div>
		</div>
	</div>
	<div v-else-if="tab==='orders'">
		<p class="alert alert-info mx-2 mt-4">Under construction</p>
	</div>
	<div v-else>
		<div v-if="tab==='info'" class="mx-2.5">
			<div class="flex flex-col xl:flex-row gap-5 mt-4">
				<div class="w-full">
					<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
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
				</div>
				<div class="w-full">
					<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
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
				</div>
			</div>
			<div class="flex flex-col xl:flex-row gap-5 mt-4">
				<div class="w-full">
					<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
						<label class="input-float">
							<input type="text" v-model="email" placeholder="" class="!border-0" />
							<p>Email</p>
						</label>
						<div class="w-6 h-6 me-4">
							<span v-if="loading.email_verifier" className="loading bg-primary"></span>
							<img v-else-if="error.email===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'Email is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
							<img v-else-if="error.email" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
							<img v-else-if="error.email===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
						</div>
					</div>
					<p v-if="error.email==='exists'" class="text-error">* Email already exists</p>
					<p v-else-if="error.email" class="text-error">* Email is required</p>
				</div>
				<div class="w-full">
					<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
						<label class="input-float">
							<input type="tel" class="!border-none" :value="phone.masked" :ref="phone_imask.el" placeholder="" >
							<p>Phone</p>
						</label>
						<div class="w-6 h-6 me-4">
							<img v-if="error.phone===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'Phone is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
							<img v-else-if="error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
							<img v-else-if="error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
						</div>
					</div>
					<p v-if="error.phone==='exists'" class="text-error">* Phone already exists</p>
					<p v-else-if="error.phone" class="text-error">* Phone is required</p>
				</div>
			</div>
			<div>
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full mt-4">
					<label class="input-float">
						<input type="text" v-model="address" placeholder="" class="!border-0" />
						<p>Address</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.address===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'Address is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
						<img v-else-if="error.address" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
						<img v-else-if="error.address===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
					</div>
				</div>
				<p v-if="error.address" class="text-error">* Address is required</p>
			</div>
			<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full mt-4">
				<label class="input-float">
					<input type="text" v-model="unit_or_suite" placeholder="" class="!border-0" />
					<p>Unit # / Suite</p>
				</label>
			</div>
			<div class="flex flex-col xl:flex-row gap-5 mt-4">
				<div class="w-full">
					<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
						<label class="input-float">
							<input type="text" v-model="city" placeholder="" class="!border-0" />
							<p>City</p>
						</label>
						<div class="w-6 h-6 me-4">
							<img v-if="error.city===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'City is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
							<img v-else-if="error.city" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
							<img v-else-if="error.city===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
						</div>
					</div>
					<p v-if="error.city" class="text-error">* City is required</p>
				</div>
				<div class="w-full">
					<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
						<label class="input-float">
							<input type="text" v-model="zip" placeholder="" class="!border-0" maxlength="5" />
							<p>Zip</p>
						</label>
						<div class="w-6 h-6 me-4">
							<img v-if="error.zip===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'Zip is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
							<img v-else-if="error.zip" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
							<img v-else-if="error.zip===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
						</div>
					</div>
					<p v-if="error.zip" class="text-error">* Please enter a valid zip code.</p>
				</div>
			</div>
		</div>
		<div v-else-if="tab==='preference'" class="mx-2 lg:mx-6">
			<p class="my-2.5 text-brand-black/50">Add-ons</p>
			<div class="flex flex-wrap gap-2.5">
				<label v-for="addon of addon_list" :key="addon" class="badge !p-4 bg-black/5 hover:scale-105 hover:bg-primary hover:text-white relative [&.active]:bg-primary [&.active]:text-white cursor-pointer" :class="addons.includes(addon) && 'active'">
					<input type="checkbox" v-model="addons" :value="addon" hidden>
					<p>{{ addon }}</p>
				</label>
			</div>
			<p class="my-2.5 text-brand-black/50">Choose a Detergent</p>
			<div>
				<div class="flex flex-wrap gap-2.5">
					<label v-for="v of detergents" :key="v" class="badge !p-4 cursor-pointer bg-black/5 hover:bg-primary hover:scale-105 hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="detergent===v && 'active'">
						<input type="radio" v-model="detergent" :value="v" class="radio" hidden>
						<p>{{ v }}</p>
					</label>
				</div>
				<p v-if="error.detergent" class="text-error">* Detergent is required</p>
			</div>
			<p class="my-2.5 text-brand-black/50">Dryer Temperature</p>
			<div>
				<div class="flex flex-wrap gap-2.5">
					<label v-for="v of dryer_temperatures" :key="v" class="badge !p-4 cursor-pointer bg-black/5 hover:bg-primary hover:scale-105 hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="dryer_temperature===v && 'active'">
						<input type="radio" v-model="dryer_temperature" :value="v" class="radio" hidden>
						<p>{{ v }}</p>
					</label>
				</div>
				<p v-if="error.dryer_temperature" class="text-error">* Dryer Temperature is required</p>
			</div>
			<p class="my-2.5 text-brand-black/50">Water Temperature</p>
			<div>
				<div class="flex flex-wrap gap-2.5">
					<label v-for="v of water_temperatures" :key="v" class="badge !p-4 cursor-pointer bg-black/5 hover:bg-primary hover:scale-105 hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="water_temperature===v && 'active'">
						<input type="radio" v-model="water_temperature" :value="v" class="radio" hidden>
						<p>{{ v }}</p>
					</label>
				</div>
				<p v-if="error.water_temperature" class="text-error">* Water Temperature is required</p>
			</div>
			<textarea v-model="comment" placeholder="Care Preferences" class="textarea textarea-bordered w-full mt-5" rows="3"></textarea>
		</div>
		<div v-else-if="tab==='type'" class="mx-2">
			<div class="flex flex-col items-center gap-4 lg:flex-row lg:justify-center pt-16">
				<button @click="type='retail'" class="flex items-center justify-center w-48 h-48 px-12 border rounded-[1.156rem] group border-brand-black hover:border-brand-orange" :class="type==='retail' && 'border-brand-orange'">
					<div class="mx-auto">
						<IconPerson class="w-12 mx-auto stroke-brand-black group-hover:stroke-brand-orange" :class="type==='retail' && 'stroke-brand-orange'" />
						<p class="text-2xl mt-3 group-hover:text-brand-orange" :class="type==='retail' && 'text-brand-orange'">Retail</p>
					</div>
				</button>
				<button @click="type='commercial'" class="flex items-center justify-center w-48 h-48 px-12 border rounded-[1.156rem] group border-brand-black hover:border-brand-orange" :class="type==='commercial' && 'border-brand-orange'">
					<div class="mx-auto">
						<IconPersons class="w-12 mx-auto stroke-brand-black group-hover:stroke-brand-orange" :class="type==='commercial' && 'stroke-brand-orange'" />
						<p class="text-2xl mt-3 group-hover:text-brand-orange" :class="type==='commercial' && 'text-brand-orange'">Commercial</p>
					</div>
				</button>
			</div>
			<div v-if="type==='commercial'" class="w-[25rem] mx-auto">
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] w-full border mt-4 border-base-content/20">
					<label class="input-float">
						<input type="text" v-model="business_name" placeholder="" class="!border-0" />
						<p>Business Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.business_name===undefined" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading='lazy' v-tooltip="{content: 'Business name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" />
						<img v-else-if="error.business_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading='lazy' />
						<img v-else-if="error.business_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading='lazy' />
					</div>
				</div>
				<p v-if="error.business_name" class="text-error">* Business name is required</p>
			</div>
		</div>
		<div class="mt-5 mx-auto">
			<hr>
			<button @click="update()" class="btn btn-sm gap-0 rounded-3xl mt-2.5 flex ms-auto bg-brand-orange text-white hover:bg-primary">
				<p>Update</p>
				<span v-if="loading.update" class="loading loading-sm loading-ball"></span>
			</button>
		</div>
	</div>
</div>
</template>
