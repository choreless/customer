<script setup lang="ts">
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import type { CalendarDay } from 'v-calendar/dist/types/src/utils/page.js';

const book = usePageBook();
const setting = useSetting();

const show_calendar = ref(false);

async function next(){
	const usp = new URLSearchParams();
	usp.append('no_redirect', 'okay');
	usp.append('form_id', book.wash_type==='mixed' ? '3' : '2');
	usp.append('zipcode', book.zip);
	usp.append('date', book.date);
	// addons
	if(book.addons.includes('Vinegar')) usp.append('extras[2]', '1');
	if(book.addons.includes('Baking Soda')) usp.append('extras[3]', '1');
	if(book.addons.includes('OxiClean')) usp.append('extras[4]', '1');
	if(book.addons.includes('Customer Supplied')) usp.append('extras[6]', '1');
	if(book.addons.includes('Bounce')) usp.append('extras[9]', '1');
	if(book.addons.includes('Tide')) usp.append('extras[8]', '1');
	if(book.addons.includes('Gain')) usp.append('extras[7]', '1');
	if(book.addons.includes('Softener Downy')) usp.append('extras[10]', '1');
	// water temperature
	if(book.water_temperature==='Cold') usp.append('extras[15]', '1');
	else if(book.water_temperature==='Hot') usp.append('extras[14]', '1');
	// dryer temperature
	if(book.dryer_temperature==='Low') usp.append('extras[13]', '1');
	else if(book.dryer_temperature==='Medium') usp.append('extras[12]', '1');
	else if(book.dryer_temperature==='High') usp.append('extras[11]', '1');
	// delivery speed
	usp.append('service_id', book.service_speed==='next_day' ? '9' : '10');
	// frequency
	if(book.frequency==='Just once') usp.append('frequency_id', '20');
	else if(book.frequency==='Weekly') usp.append('frequency_id', '21');
	else if(book.frequency==='Every two weeks') usp.append('frequency_id', '22');
	else usp.append('frequency_id', '23');
	await navigateTo(`https://chorelesslaundry.bookingkoala.com/booknow?${usp}`, {external: true})
}

function selectDate({date, isDisabled}: CalendarDay){
	if(isDisabled) return;
	book.date = formatISO(date, {representation: 'date'});
	show_calendar.value=false;
}
</script>

<template>
<div>
	<div class="max-w-xl mx-auto my-6 px-2">
		<div class="mt-2.5">
			<h1 class="text-xl sm:text-2xl font-bold leading-loose">Choose your pickup date:</h1>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2.5">
				<button v-for="v of book.pinned_pickup_dates" :key="v.formatted" class="text-center px-3 sm:px-6 py-2 border-2 rounded-md border-brand-black/20 [&:is(:hover,.active)]:border-brand-blue" :class="book.date===v.formatted && 'active'" @click="book.date=v.formatted">
					<p>{{ format(v.unformatted, 'MMM') }}</p>
					<p class="text-3xl sm:text-5xl font-bold my-1">{{ format(v.unformatted, 'dd') }}</p>
					<p>{{ format(v.unformatted, 'iii') }}</p>
				</button>
				<button class="text-center px-3 sm:px-6 py-2 border-2 rounded-md border-brand-black/20 [&:is(:hover,.active)]:border-brand-blue" :class="!book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) && 'active'" @click="show_calendar=!show_calendar">
					<IconCalendar class="w-9 mx-auto stroke-brand-orange" />
					<p class="my-2 whitespace-nowrap">{{ book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) ? 'Other' : formatISO(parseISO(book.date), {representation: 'date'}) }}</p>
					<Icon name="material-symbols:keyboard-arrow-down-rounded" class="text-2xl" />
				</button>
			</div>
			<div v-show="show_calendar">
				<ClientOnly>
					<VCalendar borderless expanded class="mt-8" title-position="left" :first-day-of-week="2" :columns="setting.breakpoints.sm ? 2 : 1" :min-date="book.pinned_pickup_dates[0].unformatted" :attributes="[{highlight: true, dates: parseISO(book.date)}]" @dayclick="selectDate" />
				</ClientOnly>
			</div>
			<p class="text-brand-black/50">All deliveries are between 5pm and 10pm. Standard turnaround on all orders is 2-3 days. Rush turnaround is available for a small fee.</p>
		</div>
		<h1 class="text-xl sm:text-2xl font-bold leading-loose mt-2.5">Service speed:</h1>
		<div class="grid sm:grid-cols-2 gap-2.5 mt-2.5">
			<button v-for="v of book.service_speeds" :key="v" class="text-center px-3 sm:px-6 py-5 border-2 rounded-md border-brand-black/20 [&:is(:hover,.active)]:border-brand-blue" :class="v===book.service_speed && 'active'" @click="book.service_speed=v">
				<img :src="`https://ik.imagekit.io/choreless/v2/icons/${v==='next_day' ? 'separate_wash%202' : 'mixed_wash%203'}.svg`" alt="icon" loading="lazy" class="w-12 mx-auto">
				<p class="text-lg sm:text-xl font-bold leading-loose mt-2.5 mb-1.5">{{ v==='next_day' ? 'Next day delivery' : '2 day delivery' }}</p>
				<p class="text-sm leading-4">{{ v==='next_day' ? 'Clothes will be separated & washed Differently but fold together.' : 'Clothes will washed and fold together.' }}</p>
				<p class="mt-3">{{ v==='next_day' ? '$1.80/lbs' : '$1.60/lbs' }}</p>
			</button>
		</div>
		<h1 class="text-xl sm:text-2xl font-bold leading-loose mt-2.5">Your delivery is schedule for:</h1>
		<div class="flex border-brand-black/20">
			<div class="px-3 sm:px-6 py-2 border-2 min-w-28 rounded-md rounded-e-none text-center border-inherit">
				<p>{{ format(book.scheduled_delivery, 'MMM') }}</p>
				<p class="text-3xl sm:text-5xl font-bold my-1">{{ format(book.scheduled_delivery, 'dd') }}</p>
				<p>{{ format(book.scheduled_delivery, 'iii') }}</p>
			</div>
			<div class="px-3 sm:px-6 py-2 border-2 border-s-0 rounded-md rounded-s-none grow flex flex-col justify-center border-inherit">
				<p class="capitalize text-brand-black/50">{{ book.wash_type }} Wash</p>
				<p>{{ book.service_speed==='next_day' ? 'Next day delivery' : '2 day delivery' }}</p>
			</div>
		</div>
		<h1 class="text-xl sm:text-2xl font-bold leading-loose mt-2.5">Frequency:</h1>
		<div class="flex flex-wrap sm:grid sm:grid-cols-2 gap-2.5 mt-2.5">
			<button v-for="f of book.frequencies" :key="f" class="btn btn-outline text-xl grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-blue [&:is(:hover,.active)]:border-brand-blue [&:is(:hover,.active)]:text-white" :class="f==book.frequency && 'active'" @click="book.frequency=f">{{ f }}</button>
		</div>
		<button class="btn w-full h-[3.75rem] mt-2.5 px-5 py-[0.9375rem] rounded-[0.3125rem] text-2xl text-white bg-brand-orange border-brand-orange hover:text-brand-orange hover:bg-transparent hover:border-brand-orange" @click="next()">Continue</button>
	</div>
</div>
</template>
