<script setup lang="ts">
import { useIMask } from 'vue-imask';
import { z } from 'zod';
import zips from '~/assets/data/zip_services.json';
import { detergents, dryer_temperatures, water_temperatures } from '~/lib/customer';
import type { CustomerType } from '~/types/user';

const api = useApi();
const customer = useAdminCustomer();

const step = ref<'type'|'info'|'preference'>('type');
const type = ref<CustomerType>();
const business_name = ref('');
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const phone = reactive({masked: '', unmasked: ''});
const address = ref('');
const unit_or_suite = ref('');
const city = ref('');
const zip = ref('');
const detergent = ref<typeof detergents[number]>();
const water_temperature = ref<typeof water_temperatures[number]>();
const dryer_temperature = ref<typeof dryer_temperatures[number]>()
const comment = ref('');

const loading = reactive({
	email_verifier: false,
	save: false
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
	water_temperature: false,
	dryer_temperature: false
})

const phone_imask = useIMask({
	mask: [{mask: '000'}, {mask: '(000) 000-0000'}],
	unmask: true
}, {
	onAccept(){
		phone.masked=phone_imask.masked.value;
		phone.unmasked=phone_imask.unmasked.value.trim();
	}
})

function cancel(){
	if(globalThis.innerWidth<640) customer.id = '';
	customer.end_panel = customer.id ? 'show' : undefined;
}

function back(){
	if(step.value==='type') cancel();
	else if(step.value==='info') step.value = 'type';
	else if(step.value==='preference') step.value = 'info';
}

async function verifyEmail(){
	if(z.string().email().safeParse(email.value).success){
		loading.email_verifier = true;
		const {data} = await api.get('/users/email_verifier?email='+email.value);
		error.email = !data;
		loading.email_verifier = false;
	}
	else error.email = true;
}

async function save(){
	if(step.value==='info'){
		loading.save = true;
		if(error.email!=='exists') await verifyEmail();
		if(type.value==='commercial') error.business_name = !business_name.value;
		error.first_name = !first_name.value;
		error.last_name = !last_name.value;
		if(error.phone!=='exists') error.phone = phone.unmasked.length!==10;
		error.address = !address.value;
		error.city = !city.value;
		error.zip = !zips.includes(zip.value);
		loading.save = false;
		if(error.first_name || error.last_name || error.email || error.phone || error.address || error.city || error.zip || (type.value==='commercial' && error.business_name)) return;
		step.value = 'preference';
	}
	else if(step.value==='preference'){
		error.detergent = !detergent.value;
		error.dryer_temperature = !dryer_temperature.value;
		error.water_temperature = !water_temperature.value;
		if(error.detergent || error.dryer_temperature || error.water_temperature) return;
		loading.save = true;
		const data = {
			roles: ['customer'],
			first_name: first_name.value,
			last_name: last_name.value,
			email: email.value,
			phone: `+1${phone.unmasked}`,
			customer_extra: {
				type: type.value,
				address: address.value,
				unit_or_suite: unit_or_suite.value,
				city: city.value,
				zip: zip.value,
				detergent: detergent.value,
				water_temperature: water_temperature.value,
				dryer_temperature: dryer_temperature.value,
				comment: comment.value,
				business_name: business_name.value
			}
		};

		type CreateResponse =
		{ success: false, error: 'input'|('phone_exists'|'email_exists')[] } |
		{ success: true, data: string }
		const {data: response}: {data: CreateResponse} = await api.post('/users', data);
		if(response.success){
			notify.success('Customer has been created successfully');
			await customer.getCustomers();
			customer.id = response.data;
			customer.end_panel = 'show';
		}
		else if(response.error==='input') notify.error('Invalid data. Contact with Administration.')
		else {
			notify.error('Customer already exists.');
			if(response.error.includes('phone_exists')) error.phone = 'exists';
			if(response.error.includes('email_exists')) error.email = 'exists';
			step.value = 'info';
		}
		loading.save = false;
	}
}

watch(business_name, n=>{ error.business_name = !n })
watch(first_name, n=>{ error.first_name = !n })
watch(last_name, n=>{ error.last_name = !n })
watch(email, ()=>{ error.email = !z.string().email().safeParse(email.value).success; })
watch(phone, n=>{ error.phone = n.unmasked.length!==10 })
watch(address, n=>{ error.address = !n })
watch(city, n=>{ error.city = !n })
watch(zip, n=>{ error.zip = !zips.includes(n); })
watch(detergent, ()=>{ error.detergent = false; })
watch(water_temperature, ()=>{ error.dryer_temperature = false; })
watch(dryer_temperature, ()=>{ error.dryer_temperature = false; })
</script>

<template>
<div>
	<div class="grid grid-cols-[auto_1fr] items-center text-sm h-10">
		<button class="btn btn-sm btn-ghost gap-0 px-1 w-fit hover:bg-brand-orange hover:text-white" @click="back()">
			<Icon name="material-symbols:chevron-left" class="text-2xl" />
			<p>Back</p>
		</button>
		<h1 class="text-center font-bold">Customer Type</h1>
	</div>
	<hr>
	<div v-if="step==='type'" class="flex flex-col items-center gap-4 lg:flex-row lg:justify-center py-16">
		<button class="flex items-center justify-center w-48 h-48 px-12 border rounded-[1.156rem] group border-brand-black hover:border-brand-orange" :class="type==='retail' && 'border-brand-orange'" @click="type='retail'; step='info';">
			<div class="mx-auto">
				<IconPerson class="w-12 mx-auto stroke-brand-black group-hover:stroke-brand-orange" :class="type==='retail' && 'stroke-brand-orange'" />
				<p class="text-2xl mt-3 group-hover:text-brand-orange" :class="type==='retail' && 'text-brand-orange'">Retail</p>
			</div>
		</button>
		<button class="flex items-center justify-center w-48 h-48 px-12 border rounded-[1.156rem] group border-brand-black hover:border-brand-orange" :class="type==='commercial' && 'border-brand-orange'" @click="type='commercial'; step='info';">
			<div class="mx-auto">
				<IconPersons class="w-12 mx-auto stroke-brand-black group-hover:stroke-brand-orange" :class="type==='commercial' && 'stroke-brand-orange'" />
				<p class="text-2xl mt-3 group-hover:text-brand-orange" :class="type==='commercial' && 'text-brand-orange'">Commercial</p>
			</div>
		</button>
	</div>
	<div v-else-if="step==='info'" class="mx-2 lg:mx-11">
		<div v-if="type==='commercial'">
			<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] w-full border mt-4 border-base-content/20">
				<label class="input-float">
					<input v-model="business_name" type="text" placeholder="" class="!border-0">
					<p>Business Name</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="error.business_name===undefined" v-tooltip="{content: 'Business name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
					<img v-else-if="error.business_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					<img v-else-if="error.business_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
				</div>
			</div>
			<p v-if="error.business_name" class="text-error">* Business name is required</p>
		</div>
		<div class="flex flex-col xl:flex-row gap-5 mt-4">
			<div class="w-full">
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
					<label class="input-float">
						<input v-model="first_name" type="text" placeholder="" class="!border-0">
						<p>First Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.first_name===undefined" v-tooltip="{content: 'First name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="error.first_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.first_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.first_name" class="text-error">* First name is required</p>
			</div>
			<div class="w-full">
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
					<label class="input-float">
						<input v-model="last_name" type="text" placeholder="" class="!border-0">
						<p>Last Name</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.last_name===undefined" v-tooltip="{content: 'Last name is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="error.last_name" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.last_name===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.last_name" class="text-error">* Last name is required</p>
			</div>
		</div>
		<div class="flex flex-col xl:flex-row gap-5 mt-4">
			<div class="w-full">
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
					<label class="input-float">
						<input v-model="email" type="text" placeholder="" class="!border-0">
						<p>Email</p>
					</label>
					<div class="w-6 h-6 me-4">
						<span v-if="loading.email_verifier" className="loading bg-primary" />
						<img v-else-if="error.email===undefined" v-tooltip="{content: 'Email is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="error.email" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.email===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.email==='exists'" class="text-error">* Email already exists</p>
				<p v-else-if="error.email" class="text-error">* Email is required</p>
			</div>
			<div class="w-full">
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
					<label class="input-float">
						<input :ref="phone_imask.el" type="tel" class="!border-none" :value="phone.masked" placeholder="">
						<p>Phone</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.phone===undefined" v-tooltip="{content: 'Phone is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="error.phone" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.phone===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.phone==='exists'" class="text-error">* Phone already exists</p>
				<p v-else-if="error.phone" class="text-error">* Phone is required</p>
			</div>
		</div>
		<div>
			<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full mt-4">
				<label class="input-float">
					<input v-model="address" type="text" placeholder="" class="!border-0">
					<p>Address</p>
				</label>
				<div class="w-6 h-6 me-4">
					<img v-if="error.address===undefined" v-tooltip="{content: 'Address is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
					<img v-else-if="error.address" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
					<img v-else-if="error.address===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
				</div>
			</div>
			<p v-if="error.address" class="text-error">* Address is required</p>
		</div>
		<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full mt-4">
			<label class="input-float">
				<input v-model="unit_or_suite" type="text" placeholder="" class="!border-0">
				<p>Unit # / Suite</p>
			</label>
		</div>
		<div class="flex flex-col xl:flex-row gap-5 mt-4">
			<div class="w-full">
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
					<label class="input-float">
						<input v-model="city" type="text" placeholder="" class="!border-0">
						<p>City</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.city===undefined" v-tooltip="{content: 'City is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="error.city" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.city===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.city" class="text-error">* City is required</p>
			</div>
			<div class="w-full">
				<div class="grid grid-cols-[1fr_auto] items-center justify-around gap-x-2 rounded-[0.3125rem] border border-base-content/20 w-full">
					<label class="input-float">
						<input v-model="zip" type="text" placeholder="" class="!border-0" maxlength="5">
						<p>Zip</p>
					</label>
					<div class="w-6 h-6 me-4">
						<img v-if="error.zip===undefined" v-tooltip="{content: 'Zip is required', theme: 'tooltip-primary', triggers: ['hover', 'click']}" src="https://ik.imagekit.io/choreless/v2/icons/FigmaInfo.svg" alt="icon" loading="lazy">
						<img v-else-if="error.zip" src="https://ik.imagekit.io/choreless/v2/icons/MaterialSymbolsCancelRounded.svg" alt="icon" loading="lazy">
						<img v-else-if="error.zip===false" src="https://ik.imagekit.io/choreless/v2/icons/FigmaSuccess.svg" alt="icon" loading="lazy">
					</div>
				</div>
				<p v-if="error.zip" class="text-error">* Please enter a valid zip code.</p>
			</div>
		</div>
	</div>
	<div v-else-if="step==='preference'">
		<div class="mx-2 lg:mx-11">
			<p class="my-2.5 text-brand-black/50">Choose a Detergent</p>
			<div>
				<div class="flex flex-wrap gap-2.5">
					<label v-for="v of detergents" :key="v" class="badge !p-4 cursor-pointer bg-black/5 hover:bg-primary hover:scale-105 hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="detergent===v && 'active'">
						<input v-model="detergent" type="radio" :value="v" class="radio" hidden>
						<p>{{ v }}</p>
					</label>
				</div>
				<p v-if="error.detergent" class="text-error">* Detergent is required</p>
			</div>
			<p class="my-2.5 text-brand-black/50">Water Temperature</p>
			<div>
				<div class="flex flex-wrap gap-2.5">
					<label v-for="v of water_temperatures" :key="v" class="badge !p-4 cursor-pointer bg-black/5 hover:bg-primary hover:scale-105 hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="water_temperature===v && 'active'">
						<input v-model="water_temperature" type="radio" :value="v" class="radio" hidden>
						<p>{{ v }}</p>
					</label>
				</div>
				<p v-if="error.water_temperature" class="text-error">* Water Temperature is required</p>
			</div>
			<p class="my-2.5 text-brand-black/50">Dryer Temperature</p>
			<div>
				<div class="flex flex-wrap gap-2.5">
					<label v-for="v of dryer_temperatures" :key="v" class="badge !p-4 cursor-pointer bg-black/5 hover:bg-primary hover:scale-105 hover:text-white [&.active]:bg-primary [&.active]:text-white" :class="dryer_temperature===v && 'active'">
						<input v-model="dryer_temperature" type="radio" :value="v" class="radio" hidden>
						<p>{{ v }}</p>
					</label>
				</div>
				<p v-if="error.dryer_temperature" class="text-error">* Dryer Temperature is required</p>
			</div>
			<textarea v-model="comment" placeholder="Care Preferences" class="textarea textarea-bordered w-full mt-5" rows="3" />
		</div>
	</div>
	<div v-if="['info', 'preference'].includes(step)" class="mt-5">
		<hr>
		<div class="flex justify-end gap-x-5 pe-11">
			<button class="btn btn-sm gap-0 mt-2.5 px-1 border-0 shadow-none underline rounded-none border-brand-black bg-transparent hover:bg-error hover:text-white hover:rounded-3xl hover:px-2.5 hover:no-underline" @click="cancel()">Cancel</button>
			<button class="btn btn-sm gap-0 rounded-3xl mt-2.5 bg-brand-orange text-white hover:bg-primary" @click="save()">
				<p>{{ step==='info' ? 'Next' : 'Save' }}</p>
				<span v-if="loading.save" class="loading loading-sm loading-ball" />
			</button>
		</div>
	</div>
</div>
</template>
