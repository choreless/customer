<script setup lang="ts">
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import HeaderAction from './HeaderAction.vue';
import type { CustomerInfo4Washer } from '~/types/user';
type DueTime = Date|null;

const props = defineProps<{
	total_bag: number
	total_weight: number
	customer?: CustomerInfo4Washer
	due_time: DueTime
}>();

const emit = defineEmits<{
	(e: 'update:due_time', due_time: DueTime): void
}>();

const now = useNow();
const computed_time = ref<DueTime>(props.due_time);
watch(computed_time, n=>{
	emit('update:due_time', n);
})
const date_difference = computed(()=>{
	if(computed_time.value) return computed_time.value.getDate()-now.value.getDate();
});

function setDate(addition: number){
	if(!computed_time.value){
		computed_time.value = new Date();
		computed_time.value.setMinutes(0, 0, 0);
	}
	computed_time.value.setDate(new Date().getDate()+addition);
	computed_time.value = new Date(computed_time.value);
}
</script>

<template>
<nav class="md:sticky md:top-0 flex flex-col lg:flex-row lg:items-center justify-between gap-y-3 lg:gap-y-8 px-4 lg:px-[3.75rem] py-5 border-b border-black/20 bg-white">
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
			<VDatePicker v-model="computed_time" :first-day-of-week="2" mode="datetime" hide-time-header class="pb-2" :time-accuracy="1">
				<template #default="{ togglePopover }">
					<button class="overflow-auto whitespace-nowrap" @click="togglePopover">Due: {{ computed_time ? format(computed_time, 'EEE M/dd, hh:mm aaa') : 'N/A' }} </button>
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
