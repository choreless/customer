<script setup lang="ts">
import format from 'date-fns/format';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { calculateBagsWeight } from '~/lib/order';
import { formatSeconds } from '~/lib/time';
import type { Orders4Washer, OrderStatus, UpdateResponseApi4Washer } from '~/types/order';

useHead({ title: 'Orders - Active' })
definePageMeta({ middleware: 'washer' })
const api = useApi();

const orders = ref<Orders4Washer[]>([]);
const search = ref('');
const sort = ref<'latest'|'oldest'>();
const status = ref<OrderStatus>('in_progress');
const active_orders_count = ref(0);
const now = useNow();

async function getActiveOrders(){
	const { data } = await api.get('/stats/orders');
	active_orders_count.value = data;
}

async function getOrders(){
	getActiveOrders();
	const usp = new URLSearchParams();
	usp.append('status', status.value);
	if(search.value) usp.append('search', search.value);
	if(sort.value) usp.append('sort', sort.value);
	const {data}: {data: Orders4Washer[]} = await api.get(`/orders?${usp}`);
	orders.value = data;
}
getOrders();

function toggleStatus(){
	if(status.value) status.value = status.value==='in_progress' ? 'complete' : 'in_progress';
	else status.value = 'complete';
}

async function completeOrder(order: Orders4Washer){
	if(!order.bags_initial) await navigateTo(`/orders/edit/${order.id}`);
	else if(order.is_wet) await navigateTo(`/orders/wet_weight/${order.id}`);
	else {
		const {data}: {data: UpdateResponseApi4Washer} = await api.post(`/orders/${order.id}`, {action: 'complete'});
		if(data.success){
			getOrders();
			notify.success('Order has been completed');
		}
		else notify.error('Failed to complete the order');
	}
}

function calculateEfficiency(bags_initial: number[], bags_final: null|number[], created_at: string, completed_at: string){
	return formatSeconds(differenceInSeconds(new Date(completed_at), new Date(created_at))/calculateBagsWeight(bags_final ?? bags_initial)).value;
}

watch([search, sort, status], ()=>{getOrders();})
</script>

<template>
<div class="mx-auto mt-6 sm:mt-12 px-2 sm:px-5">
	<div>
		<NuxtLink to="/dashboard" class="flex items-center justify-center rounded-t-[0.625rem] h-[1.875rem] bg-brand-orange">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="2" viewBox="0 0 24 2" fill="none">
				<path d="M1.95865 1H22.0414" stroke="white" strokeWidth="2" strokeLinecap="round" />
			</svg>
		</NuxtLink>
		<div class="grid sm:grid-cols-[auto_auto_auto_1fr] items-center gap-x-4 gap-y-1 py-7">
			<div class="flex items-center gap-x-5 ps-7 border border-t-0 rounded-b-[inherit] border-transparent">
				<span class="w-4 h-4 rounded-full bg-brand-orange" />
				<p class="text-2xl">{{ active_orders_count }} Active orders</p>
			</div>
			<span class="hidden sm:block">|</span>
			<button class="hover:text-brand-orange" @click="toggleStatus()">See {{ status==='complete' ? 'in progress' : 'completed' }} orders>></button>
			<div class="mx-auto sm:me-0">
				<button class="btn text-base rounded-full px-6 bg-brand-orange text-white hover:scale-105 hover:bg-transparent hover:text-brand-orange hover:border-brand-orange" @click="notify.underDevelopment()">
					<p>Machines</p>
					<Icon name="material-symbols:arrow-forward-ios-rounded" class="text-lg" />
				</button>
			</div>
		</div>
	</div>
	<div class="grid grid-cols-[1fr_auto] items-center gap-x-2.5">
		<label class="flex items-center join">
			<input v-model="search" type="search" placeholder="Search by id" class="join-item input w-full focus:border-none focus:outline-none focus-within:border-none focus-within:outline-none focus-within:bg-transparent">
			<img src="https://ik.imagekit.io/choreless/v2/icons/search.svg" alt="icon" loading="lazy" class="join-item w-5 sm:w-7 me-2">
		</label>
		<Multiselect v-model="sort" :options="['latest', 'oldest']" placeholder="Sort By" :can-clear="false" class="input-sm sm:input-md capitalize min-w-28 sm:min-w-36" />
	</div>
	<div v-if="orders.length" class="overflow-x-auto text-base">
		<table class="table border-separate border-spacing-y-4">
			<tbody>
				<tr v-for="order of orders" :key="order.id" class="bg-neutral-200/60 [&_td]:border-black/5 hover:border-none hover:-translate-y-0.5 duration-500 shadow-[0px_0px_4px_0px_rgba(0,_0,_0,_0.05)] group" :class="status==='in_progress' && 'cursor-pointer'" @click="status==='in_progress' && navigateTo(`/orders/edit/${order.id}`)">
					<td class="border border-e-0 text-lg font-medium uppercase group-hover:rounded-s-xl group-hover:border-info">{{ order.id }}</td>
					<td class="border-y group-hover:border-info text-base whitespace-nowrap">{{ order.customer_name }}</td>
					<td class="border-y group-hover:border-info font-medium whitespace-nowrap" :class="order.due_time && differenceInSeconds(new Date(order.due_time), now)<0 && 'text-[#c46040]'">Due: {{ order.due_time ? format(order.due_time as any as Date, 'EEE M/dd, hh:mm aaa') : 'N/A' }}</td>
					<td class="border-y group-hover:border-info">
						<div v-if="order.bags_initial" class="flex items-center gap-x-1.5">
							<img src="https://ik.imagekit.io/choreless/v2/icons/bag2.svg" alt="icon" loading="lazy" class="w-4">
							<p>{{ order.bags_initial.length }}</p>
						</div>
						<p v-if="status==='in_progress' && order.is_wet">Wet Order</p>
						<div v-if="order.bags_final" class="flex items-center gap-x-1.5">
							<img src="https://ik.imagekit.io/choreless/v2/icons/bag2.svg" alt="icon" loading="lazy" class="w-4">
							<p>{{ order.bags_final.length }}</p>
						</div>
					</td>
					<td class="border-y group-hover:border-info" :class="order.status==='complete' ? (((order.bags_initial && calculateBagsWeight(order.bags_initial)>30) || (order.bags_final && calculateBagsWeight(order.bags_final)>30)) ? 'text-success stroke-success' : 'text-error stroke-error') : 'stroke-black'">
						<div v-if="order.bags_initial" class="flex items-center gap-x-1.5">
							<IconWeight class="stroke-inherit" />
							<p>{{ calculateBagsWeight(order.bags_initial) }}</p>
						</div>
						<div v-if="order.bags_final" class="flex items-center gap-x-1.5">
							<IconWeight class="stroke-inherit" />
							<p>{{ calculateBagsWeight(order.bags_final) }}</p>
						</div>
					</td>
					<td class="border-y group-hover:border-info font-medium whitespace-nowrap" :class="status==='complete' && 'border-e group-hover:rounded-e-xl'">
						<template v-if="order.status==='in_progress'">Processing</template>
						<template v-else>Completed ({{ calculateEfficiency(order.bags_initial, order.bags_final, order.created_at, order.completed_at) }} per lb)</template>
					</td>
					<td v-if="status==='in_progress'" class="border border-s-0 group-hover:rounded-e-xl group-hover:border-info">
						<button class="btn btn-sm btn-square btn-outline border-none btn-info hover:!text-white" @click="completeOrder(order)">
							<Icon name="lets-icons:flag-finish-alt" class="text-2xl" />
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div v-else class="alert alert-info mt-4">No orders found</div>
</div>
</template>
