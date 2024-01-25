<script setup lang="ts">
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import HeaderAction from './HeaderAction.vue';
import type { Customer } from '~/pages/orders/create.vue';

defineProps<{
	total_bag: number
	total_weight: number
	customer?: Customer
}>();

const emit = defineEmits<{
	(e: 'dueTime', due_time: number): void
}>();

const now = useNow();
const date = ref(new Date());
date.value.setMinutes(0, 0, 0);
const date_difference = computed(()=>date.value.getDate()-now.value.getDate());

function setDate(addition: number){
	date.value.setDate(new Date().getDate()+addition);
	date.value = new Date(date.value);
}

watch(date, n=>{ emit('dueTime', new Date(n).valueOf()) }, { immediate: true })
</script>

<template>
<nav class="lg:sticky lg:top-0 flex flex-col lg:flex-row lg:items-center justify-between gap-y-3 lg:gap-y-8 px-4 lg:px-[3.75rem] py-5 border-b border-black/20">
	<div class="flex justify-between">
		<img src="https://ik.imagekit.io/choreless/v2/icons/busket.svg" alt="icon" loading="lazy" class="w-8 lg:w-16">
		<HeaderAction class="block lg:hidden" />
	</div>
	<div class="grid grid-cols-2 sm:flex lg:grid flex-wrap gap-x-[1.875rem] gap-y-3">
		<div class="flex items-center gap-x-5">
			<img src="https://ik.imagekit.io/choreless/v2/icons/profile_or_person.svg?updatedAt=1704934744699" alt="icon" loading="lazy" class="w-4">
			<p class="overflow-auto whitespace-nowrap">{{ customer?.customer_name }}</p>
		</div>
		<div class="flex items-center gap-x-5">
			<img src="https://ik.imagekit.io/choreless/v2/icons/calendar.svg" alt="icon" loading="lazy" class="w-5">
			<VDatePicker v-model="date" :first-day-of-week="2" mode="datetime" hide-time-header class="pb-2" :time-accuracy="1">
				<template #default="{ togglePopover }">
					<button class="overflow-auto whitespace-nowrap" @click="togglePopover">Due: {{ format(date, 'EEE M/dd, hh:mm aaa') }} </button>
				</template>
				<template #footer>
					<div class="w-full px-3 grid grid-cols-2 gap-1.5">
						<button class="btn btn-sm btn-primary" :class="date_difference===0 || 'btn-outline'" @click="setDate(0)">Today</button>
						<button class="btn btn-sm btn-primary" :class="date_difference===1 || 'btn-outline'" @click="setDate(1)">Tomorrow</button>
						<button class="btn btn-sm btn-primary" :class="date_difference===2 || 'btn-outline'" @click="setDate(2)">{{ format(addDays(now, 2), 'EEEE') }}</button>
						<button class="btn btn-sm btn-primary" :class="date_difference===3 || 'btn-outline'" @click="setDate(3)">{{ format(addDays(now, 3), 'EEEE') }}</button>
					</div>
				</template>
			</VDatePicker>
		</div>
		<div class="flex gap-x-5 w-fit px-2 py-1 rounded-full bg-brand-orange/20 text-brand-orange">
			<img src="https://ik.imagekit.io/choreless/v2/icons/bag.svg" alt="icon" loading="lazy" class="w-5">
			<p>Bag: {{ total_bag || '--' }}</p>
		</div>
		<div class="flex items-center gap-x-5">
			<img src="https://ik.imagekit.io/choreless/v2/icons/weight.svg" alt="icon" loading="lazy" class="w-5">
			<p>Weight: {{ total_weight }} lb<template v-if="total_weight>1">s</template></p>
		</div>
	</div>
	<hr class="w-[1px] h-full hidden lg:block bg-black/20">
	<HeaderAction class="hidden lg:block" />
</nav>
</template>
