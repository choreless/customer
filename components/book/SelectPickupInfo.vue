<script setup lang="ts">
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import learn_more_modal from '../modals/LearnMore.vue'
import type { CalendarDay } from 'v-calendar/dist/types/src/utils/page.js';

const book = usePageBook();
const app = useApp();

const show_calendar = ref(false);

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
<div>
	<div v-if="book.date" class="max-w-[467px] mx-auto my-[53px]">
		<div class="flex flex-col gap-5">
			<h1 class=" text-2xl leading-7 font-bold ">Choose your pickup date:</h1>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-[13px]">
				<button v-for="v of book.pinned_pickup_dates" :key="v.formatted" class=" w-[107px] h-[126px] text-center px-5 py-1 rounded-[5px] border-[1px] border-b-[5px] border-[#e5e5e5] [&:is(.active)]:border-[#f85a47]  transition-all duration-50 ease-linear" :class="book.date===v.formatted && 'active'" @click="book.date=v.formatted">
					<p class="leading-10">{{ format(v.unformatted, 'MMM') }}</p>
					<p class="text-5xl font-bold leading-10">{{ format(v.unformatted, 'dd') }}</p>
					<p class="leading-10">{{ format(v.unformatted, 'iii') }}</p>
				</button>
				<button class="text-center px-3 sm:px-6 py-2 rounded-[5px] border-[1px] border-b-[5px] border-[#e5e5e5] [&:is(:hover,.active)]:border-[#f85a47]  transition-all duration-50 ease-linear" :class="!book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) && 'active'" @click="show_calendar=!show_calendar">
					<div class="flex flex-col justify-center items-center">
						<IconMixed2 />
					</div>
					<p :class="book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) ? '' : 'text-xs'" class="my-2 leading-3 pt-2.5 ">{{ book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) ? 'Other' : formatISO(parseISO(book.date), {representation: 'date'}) }}</p>
					<Icon name="material-symbols:keyboard-arrow-down-rounded" class="text-2xl" />
				</button>
			</div>
			<div v-show="show_calendar">
				<ClientOnly>
					<VCalendar borderless expanded class="" title-position="left" :first-day-of-week="2" :columns="app.breakpoints.sm ? 2 : 1" :min-date="book.pinned_pickup_dates[0].unformatted" :attributes="[{highlight: true, dates: parseISO(book.date)}]" @dayclick="selectDate" />
				</ClientOnly>
			</div>
			<p class="text-brand-black/50 text-sm leading-[18px]  ">All deliveries are between 5pm and 10pm. Standard turnaround on all orders is 2-3 days. Rush turnaround is available for a small fee.</p>
			<div class="text-base leading-5 font-medium text-[#F85A47] flex items-center gap-2.5 cursor-pointer" @click="book.learn_more_modal=!book.learn_more_modal"> <IconInfo2 class="w-4 h-4" />Learn More</div>
		</div>
		<div class="flex flex-col gap-5 ">
			<h1 class="text-2xl font-bold  mt-[30px]">Your delivery is schedule for:</h1>
			<div class="rounded-[5px] w-full h-[126px] border-[1px] border-[#E5E5E5] border-b-[5px] flex ">

					<div class=" rounded-l-[5px] w-[107px] h-[126px] border-r-[1px] border-[#E5E5E5]  flex flex-col justify-center items-center">
					<p class="leading-10">{{ format(book.scheduled_delivery, 'MMM') }}</p>
					<p class="text-5xl font-bold leading-10">{{ format(book.scheduled_delivery, 'dd') }}</p>
					<p class="leading-10">{{ format(book.scheduled_delivery, 'iii') }}</p>
					</div>
					<div class="px-[30px] flex w-[calc(100%-107px)] justify-between items-center ">
						<div>

							<h1 class="font-medium">{{ book.wash_type }}</h1>
							<p class="text-[#00000080]">{{ book.service_speed==='next_day' ? 'Next day delivery' : '2 day delivery' }}</p>
						</div>

						<IconMixed />
					</div>
			</div>
			<div v-if="book.extra_service" class="rounded-[5px] w-full h-[126px] border-[1px] border-[#E5E5E5] border-b-[5px] flex ">

					<div class=" rounded-l-[5px] w-[107px] h-[126px] border-r-[1px] border-[#E5E5E5]  flex flex-col justify-center items-center">
					<p class="leading-10">{{ format(book.scheduled_delivery, 'MMM') }}</p>
					<p class="text-5xl font-bold leading-10">{{ format(book.scheduled_delivery, 'dd') }}</p>
					<p class="leading-10">{{ format(book.scheduled_delivery, 'iii') }}</p>
					</div>
					<div class="px-[30px] flex w-[calc(100%-107px)] justify-between items-center ">
						<div>

							<h1 class="font-medium">Seperate Wash</h1>
							<p class="text-[#00000080]">Next day delivery</p>
						</div>

						<IconOptional />
					</div>
			</div>
		</div>
		<h1 class=" text-2xl leading-7 font-bold mt-[30px]">Frequency:</h1>
		<div class="flex flex-wrap sm:grid sm:grid-cols-2 gap-5 mt-5">
			<button v-for="f of book.frequencies" :key="f" class="btn btn-outline text-base py-2.5 px-5 leading-6 font-medium grow border-brand-black/20 [&:is(:hover,.active)]:bg-[#F85A47] [&:is(:hover,.active)]:border-[#F85A47] [&:is(:hover,.active)]:text-white" :class="f==book.frequency && 'active'" @click="book.frequency=f">{{ f }}</button>
		</div>
		<button class="bg-[#F85A47] text-white w-full py-[18px] px-5  mt-5  rounded-[5px] text-2xl text-[16px] font-bold leading-6  cursor-pointer " @click="next()">Continue</button>
	</div>
	<learn_more_modal />

</div>

</template>
