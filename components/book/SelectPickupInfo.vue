<script setup lang="ts">
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import type { CalendarDay } from 'v-calendar/dist/types/src/utils/page.js';
import LearnMoreModal from '../modals/LearnMore.vue'

// Defining Constants
const book = usePageBook();
const app = useApp();
const show_calendar = ref(false);
// Defining functions
async function next(){
	const usp = new URLSearchParams();
	usp.append('redirect', 'none');

	usp.append('form_id', book.wash_type==='Mixed Wash' ? '3' : '2');
	usp.append('zipcode', book.zip);
	usp.append('date', book.date);

	if(book.wash_type==='Mixed Wash'){
		// number of bags
		usp.append('extras[44]', String(book.bags_count));
		// service speed
		usp.append('service_id', book.service_speed==='next_day' ? '9' : '10');
		// detergent
		if(book.detergent.value==='Premium Scented') usp.append('extras[39]', '1');
		else if(book.detergent.value==='Hypoallergenic') usp.append('extras[5]', '1');
		else usp.append('extras[6]', '1');
		// addons
		book.addons.forEach((v: string)=>{
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
		book.care_services.forEach((v: { value: string; })=>{
			if(v.value==='Delictes') usp.append('extras[17]', '1');
			else if(v.value==='Hang Dry') usp.append('extras[16]', '1');
			else if(v.value==='On Hangers') usp.append('extras[37]', '1');
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
		if(book.detergent.value==='Premium Scented') usp.append('extras[42]', '1');
		else if(book.detergent.value==='Hypoallergenic') usp.append('extras[22]', '1');
		else usp.append('extras[23]', '1');
		// addons
		book.addons.forEach((v: string)=>{
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
		book.care_services.forEach((v: { value: string; })=>{
			if(v.value==='Delictes') usp.append('extras[34]', '1');
			else if(v.value==='Hang Dry') usp.append('extras[33]', '1');
			else if(v.value==='On Hangers') usp.append('extras[41]', '1');
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

onMounted(()=>{
	if(!book.date) book.date = formatISO(book.now, {representation: 'date'});
})
</script>

<template>
<div class="">
	<div v-if="book.date" class="max-w-[29.188rem] mx-auto my-[1.875rem] sm:my-[3.313rem] !px-5 sm:px-0">
		<div class="flex flex-col gap-5">
			<h1 class=" leading-5 sm:text-2xl sm:leading-7 font-bold ">Choose your pickup date:</h1>
			<div class="grid grid-cols-4 gap-2 sm:gap-[0.813rem]">
				<button v-for="v of book.pinned_pickup_dates" :key="v.formatted" class="w-full shadow-card  h-[6.25rem]  sm:w-[6.388rem] sm:h-[7.875rem] text-center px-2.5 sm:px-5 sm:py-1 rounded-[0.313rem] border-[0.063rem] border-b-[0.313rem] border-[#e5e5e5] [&:is(.active)]:border-brand-orange  transition-all duration-50 ease-linear" :class="book.date===v.formatted && 'active'" @click="book.date=v.formatted">
					<p class="  leading-5 sm:leading-10">{{ format(v.unformatted, 'MMM') }}</p>
					<p class=" text-[2rem] sm:text-5xl font-bold sm:leading-10">{{ format(v.unformatted, 'dd') }}</p>
					<p class="leading-5 sm:leading-10">{{ format(v.unformatted, 'iii') }}</p>
				</button>
				<button class="h-[6.25rem] sm:h-full text-center [&:is(:hover,.active)]:px-0 px-3 sm:px-6 py-2 w-full sm:w-[6.388rem] shadow-card  rounded-[0.313rem] border-[0.063rem] border-b-[0.313rem] border-[#e5e5e5] [&:is(:hover,.active)]:border-brand-orange  transition-all duration-50 ease-linear" :class="!book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) && 'active'" @click="show_calendar=!show_calendar">
					<div class="flex flex-col justify-center items-center">
						<img src="https://ik.imagekit.io/choreless/V2S/icons/calender.svg" alt="choreless calender" />
					</div>
					<p :class="book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) ? 'my-2' : 'text-sm my-1 '" class="  leading-3 pt-0 sm:pt-2.5 ">{{ book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) ? 'Other' : formatISO(parseISO(book.date), {representation: 'date'}) }}</p>
					<Icon name="material-symbols:keyboard-arrow-down-rounded" class="text-2xl" />
				</button>
			</div>
			<div v-show="show_calendar">
				<ClientOnly>
					<VCalendar borderless expanded class="" title-position="left" :first-day-of-week="2" :columns="app.breakpoints.sm ? 2 : 1" :min-date="book.pinned_pickup_dates[0].unformatted" :attributes="[{highlight: true, dates: parseISO(book.date)}]" @dayclick="selectDate" />
				</ClientOnly>
			</div>
			<p class="text-brand-black/50 text-xs sm:text-sm leading-[1.125rem]  ">All deliveries are between 5pm and 10pm. Standard turnaround on all orders is 2-3 days. Rush turnaround is available for a small fee.</p>
			<div class="text-base leading-5 font-medium text-brand-orange flex items-center gap-2.5 cursor-pointer" @click="book.learn_more_modal=!book.learn_more_modal"> <img class="w-4 h-4" src="https://ik.imagekit.io/choreless/V2S/icons/info-orange.svg" alt="info orange"> Learn More</div>
		</div>
		<div class="flex flex-col gap-5 ">
			<h1 class="sm:text-2xl font-bold mt-5 sm:mt-[1.875rem]">Your delivery is schedule for:</h1>
			<div class="rounded-[0.313rem] w-full h-[6.875rem] sm:h-[7.875rem] border-[0.063rem] border-[#e5e5e5] border-b-[0.313rem] flex ">
				<div class=" rounded-l-[0.313rem] w-[6.688rem] h-[6.875rem] sm:h-[7.875rem] border-r-[0.063rem] border-[#e5e5e5]  flex flex-col justify-center items-center">
					<p class="leading-5 sm:leading-10">{{ format(book.scheduled_delivery, 'MMM') }}</p>
					<p class=" text-[2rem] sm:text-5xl font-bold leading-10">{{ format(book.scheduled_delivery, 'dd') }}</p>
					<p class="leading-5 sm:leading-10">{{ format(book.scheduled_delivery, 'iii') }}</p>
				</div>
				<div class="px-2.5 sm:px-[1.875rem] flex w-[calc(100%-6.688rem)] justify-between items-center ">
					<div>
						<h1 class=" text-sm sm:text-base font-medium">{{ book.wash_type }}</h1>
						<p class=" text-sm sm:text-base text-[#00000080]">{{ book.service_speed==='next_day' ? 'Next day delivery' : '2 day delivery' }}</p>
					</div>
					<img src="https://ik.imagekit.io/choreless/V2S/icons/mixed.svg" alt="choreless mixed" />
				</div>
			</div>
			<div v-if="book.extra_service" class="rounded-[0.313rem] w-full h-[6.875rem] sm:h-[7.875rem] border-[0.063rem] border-[#e5e5e5] border-b-[0.313rem] flex">
				<div class="  rounded-l-[0.313rem] w-[6.688rem] h-[6.875rem] sm:h-[7.875rem] border-r-[0.063rem] border-[#e5e5e5]  flex flex-col justify-center items-center">
					<p class="leading-5 sm:leading-10">{{ format(book.extra_service_scheduled_delivery, 'MMM') }}</p>
					<p class=" text-[2rem] sm:text-5xl font-bold leading-10">{{ format(book.extra_service_scheduled_delivery, 'dd') }}</p>
					<p class="leading-5 sm:leading-10">{{ format(book.extra_service_scheduled_delivery, 'iii') }}</p>
				</div>
				<div class="px-2.5 sm:px-[1.875rem] flex w-[calc(100%-6.688rem)] justify-between items-center ">
					<div>
						<h1 class="text-sm sm:text-base font-medium">{{ book.optional_item.wash_type }}</h1>
						<p class=" text-sm sm:text-base text-[#00000080]">{{ book.optional_item.service_speed }}</p>
					</div>
					<img src="https://ik.imagekit.io/choreless/V2S/icons/optional.svg" alt="choreless optional" />
				</div>
			</div>
		</div>
		<h1 class="  sm:text-2xl sm:leading-7 font-bold mt-[1.875rem]">Frequency:</h1>
		<div class="grid grid-cols-2 gap-2.5 sm:gap-5 mt-2.5 sm:mt-5">
			<button v-for="f of book.frequencies" :key="f" class="btn btn-outline text-sm sm:text-base py-2.5 px-1 sm:px-5 sm:leading-6 font-medium grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-orange [&:is(:hover,.active)]:border-brand-orange [&:is(:hover,.active)]:text-white" :class="f==book.frequency && 'active'" @click="book.frequency=f">{{ f }}</button>
		</div>
		<button class="hidden sm:block bg-brand-orange text-white w-full py-[1.125rem] px-5  mt-5  rounded-[0.313rem]  text-base font-bold leading-6  cursor-pointer " @click="next()">Continue</button>
	</div>
	<LearnMoreModal />
</div>
</template>
