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

	if(book.usertype==='new'){
		usp.append('f_name', book.first_name);
		usp.append('l_name', book.last_name);
		usp.append('email', book.email);
		usp.append('phone', book.phone.unmasked);
		usp.append('coupon', book.promo_code);
	}

	usp.append('form_id', book.wash_type==='mixed' ? '3' : '2');
	usp.append('zipcode', book.zip);
	usp.append('date', book.date);

	if(book.wash_type==='mixed'){
		// number of bags
		usp.append('extras[44]', String(book.bags_count));
		// service speed
		usp.append('service_id', book.service_speed==='next_day' ? '9' : '10');
		// detergent
		if(book.detergent==='Premium Scented') usp.append('extras[39]', '1');
		else if(book.detergent==='Hypoallergenic') usp.append('extras[5]', '1');
		else usp.append('extras[6]', '1');
		// addons
		book.addons.forEach(v=>{
			if(v==='Vinegar') usp.append('extras[2]', '1');
			if(v==='Baking Soda') usp.append('extras[3]', '1');
			if(v==='OxiClean') usp.append('extras[4]', '1');
			if(v==='Bounce') usp.append('extras[9]', '1');
			if(v==='Tide') usp.append('extras[8]', '1');
			if(v==='Gain') usp.append('extras[7]', '1');
			if(v==='Softener Downy') usp.append('extras[10]', '1');
		})
		// extra services
		if(book.extra_service) usp.append('extras[18]', '1');
		// care services
		book.care_services.forEach(v=>{
			if(v==='Delicates') usp.append('extras[17]', '1');
			else if(v==='Hang-Dry') usp.append('extras[16]', '1');
			else if(v==='Hangers') usp.append('extras[37]', '1');
			else usp.append('extras[38]', '1');
		})
		// water temperature
		usp.append(`extras[${book.water_temperature==='Cold' ? '15' : '14'}]`, '1');
		// dryer temperature
		if(book.dryer_temperature==='Low') usp.append('extras[13]', '1');
		else if(book.dryer_temperature==='Medium') usp.append('extras[12]', '1');
		else if(book.dryer_temperature==='High') usp.append('extras[11]', '1');
		// frequency
		if(book.frequency==='Just once') usp.append('frequency_id', '20');
		else if(book.frequency==='Weekly') usp.append('frequency_id', '21');
		else if(book.frequency==='Every two weeks') usp.append('frequency_id', '22');
		else usp.append('frequency_id', '23');
	}
	else {
		// number of bags
		usp.append('extras[43]', String(book.bags_count));
		// service speed
		usp.append('service_id', book.service_speed==='next_day' ? '11' : '12');
		// detergent
		if(book.detergent==='Premium Scented') usp.append('extras[42]', '1');
		else if(book.detergent==='Hypoallergenic') usp.append('extras[22]', '1');
		else usp.append('extras[23]', '1');
		// addons
		book.addons.forEach(v=>{
			if(v==='Clorox') usp.append('extras[36]', '1');
			if(v==='Vinegar') usp.append('extras[19]', '1');
			if(v==='Baking Soda') usp.append('extras[20]', '1');
			if(v==='OxiClean') usp.append('extras[21]', '1');
			if(v==='Bounce') usp.append('extras[26]', '1');
			if(v==='Tide') usp.append('extras[25]', '1');
			if(v==='Gain') usp.append('extras[24]', '1');
			if(v==='Softener Downy') usp.append('extras[27]', '1');
		})
		// extra services
		if(book.extra_service) usp.append('extras[35]', '1');
		// care services
		book.care_services.forEach(v=>{
			if(v==='Delicates') usp.append('extras[34]', '1');
			else if(v==='Hang-Dry') usp.append('extras[33]', '1');
			else if(v==='Hangers') usp.append('extras[41]', '1');
			else usp.append('extras[40]', '1');
		})
		// water temperature
		usp.append(`extras[${book.water_temperature==='Cold' ? '32' : '31'}]`, '1');
		// dryer temperature
		if(book.dryer_temperature==='Low') usp.append('extras[30]', '1');
		else if(book.dryer_temperature==='Medium') usp.append('extras[29]', '1');
		else if(book.dryer_temperature==='High') usp.append('extras[28]', '1');
		// frequency
		if(book.frequency==='Just once') usp.append('frequency_id', '25');
		else if(book.frequency==='Weekly') usp.append('frequency_id', '26');
		else if(book.frequency==='Every two weeks') usp.append('frequency_id', '27');
		else usp.append('frequency_id', '28');
	}
	await navigateTo(`https://chorelesslaundry.bookingkoala.com/booknow?${usp}`, {external: true});
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
