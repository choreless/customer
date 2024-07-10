        
<script setup lang="ts">
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';
import type { CalendarDay } from 'v-calendar/dist/types/src/utils/page.js';
// Defining constants
const book =usePageBook()  
const app = useApp();
const show_calendar = ref(false);
// Defining functions
function selectDate({date, isDisabled}: CalendarDay){
	if(isDisabled) return;
	book.date = formatISO(date, {representation: 'date'});
	show_calendar.value=false;
}
watch(() => book.date, (newDate:Date) => {
    const scheduled_delivery_24h = new Date(newDate);
    const scheduled_delivery_48h = new Date(newDate);
    const scheduled_delivery_72h = new Date(newDate);

    scheduled_delivery_24h.setDate(scheduled_delivery_24h.getDate());
    scheduled_delivery_48h.setDate(scheduled_delivery_24h.getDate() + 1);
    scheduled_delivery_72h.setDate(scheduled_delivery_24h.getDate() + 2);

    book.selected_services.forEach((service:any) => {
        if (service.service_speed) {
            service.scheduled_delivery = formatISO(scheduled_delivery_48h, { representation: 'date' });
        } else if (!service.service_speed && service.service_name === 'Home & Bedding') {
            service.scheduled_delivery = formatISO(scheduled_delivery_72h, { representation: 'date' });
        } else {
            service.scheduled_delivery = formatISO(scheduled_delivery_24h, { representation: 'date' });
        }
    });
}, { immediate: true });

onMounted(()=>{
    if(!book.date) book.date = formatISO(book.now, {representation: 'date'});
})
    </script>
<template>
    <div v-if="book.step===1">
		<div class=" max-w-[32.938rem] mx-auto flex flex-col items-start sm:gap-5 gap-2.5 sm:p-[1.875rem] p-2.5 sm:rounded-[1.25rem] rounded-[0.625rem] bg-white border-[#f2f2f2] ">
			<div class="inline-flex sm:gap-[1.875rem] gap-2.5 flex-col items-start">
				<div class="flex flex-col items-start sm:gap-[1.875rem] gap-5">
					<div class="flex flex-col items-start sm:gap-5 gap-2.5">
						<div class="sm:text-2xl sm:leading-7 text-base leading-5 font-bold">Choose your pickup date:</div>
						<div class="flex gap-[0.813rem] items-start justify-between w-full">
						<button v-for="date of book.pinned_pickup_dates" :key="date.formatted">
								<div class="sm:w-[6.688rem] sm:h-[7.875rem] w-auto h-auto px-2.5 py-[0.188rem] rounded-[0.313rem] border-[0.031rem] border-[#6f6e7433] flex flex-col items-center [&:is(:hover,.active)]:border-brand-black" :class="book.date===date.formatted && 'active'" @click="book.date=date.formatted">
									<div class="text-base sm:leading-10 leading-5">{{ format(date.unformatted, 'MMM') }}</div>
									<div class="sm:text-[3rem] sm:leading-10 text-[2rem] leading-[2.375rem] font-bold">{{ format(date.unformatted, 'dd') }}</div>
									<div class="text-base sm:leading-10 leading-5">{{ format(date.unformatted, 'iii') }}</div>
								</div>
							</button>
							<button class="sm:w-[6.688rem] sm:h-[7.875rem] w-[3.938rem] h-auto px-2.5 py-[0.188rem] rounded-[0.313rem] border-[0.031rem] border-[#6f6e7433] flex flex-col justify-center items-center [&:is(:hover,.active)]:border-brand-black" :class="!book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) && 'active'"  @click="show_calendar=!show_calendar">
							<div class="flex flex-col justify-center items-center">
						<img class="sm:w-auto sm:h-auto h-5 w-[1.106rem]" src="https://ik.imagekit.io/choreless/V3/icons/calender-2.svg" alt="choreless calender">
					</div>
					<p :class="book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) ? 'my-2' : 'text-xs my-1 mt-2 '" class="  leading-3 pt-0 sm:pt-2.5 ">{{ book.pinned_pickup_dates.map(v=>v.formatted).includes(book.date) ? 'Other' : formatISO(parseISO(book.date), {representation: 'date'}) }}</p>
					<Icon name="material-symbols:keyboard-arrow-down-rounded" class="text-2xl" />
				</button>			
			</div>
			<div v-show="show_calendar">
				<ClientOnly>
					<VCalendar borderless expanded class="" title-position="left" :first-day-of-week="2" :columns="app.breakpoints.sm ? 2 : 1" :min-date="book.pinned_pickup_dates[0].unformatted" :attributes="[{highlight: true, dates: parseISO(book.date)}]" @dayclick="selectDate" />
				</ClientOnly>
			</div>
						<div class="flex sm:p-2.5 px-2.5 py-[0.438rem] flex-col items-start sm:gap-2.5 gap-[0.313rem] self-stretch rounded-[0.313rem] bg-brand-frost-light">
							<div class="sm:text-sm text-xs leading-4 sm:leading-[1.125rem]">All deliveries are between 6pm and 10pm. Standard turnaround on all orders is 1-2 days. </div>
							<div class="flex items-center gap-2.5 cursor-pointer" @click="book.learn_more_toggle=true">
								<img class="sm:w-4 sm:h-4 w-3 h-3" src="https://ik.imagekit.io/choreless/V3/icons/info.svg" alt="info">
								<div class="sm:text-base text-sm font-medium sm:leading-5 leading-4 text-brand-black">Learn More</div>
							</div>
						</div>
					</div>
					<div class="flex flex-col items-start sm:gap-5 gap-2.5 w-full">
						<div class="sm:text-2xl font-bold text-base leading-5 sm:leading-7 text-brand-black">Your delivery is schedule for</div>
						<div v-for="(service, index) in book.selected_services" :key="index" class="flex flex-col gap-5 w-full">
							<div class="flex w-full" >
								<div class="sm:w-[6.688rem] sm:h-[7.875rem] w-auto h-auto px-5 py-[0.188rem] rounded-[0.313rem] rounded-r-none border-[0.031rem] flex flex-col items-center">
									<div class="text-base sm:leading-10 leading-5">{{ format(service.scheduled_delivery, 'MMM') }}</div>
									<div class="sm:text-[3rem] sm:leading-10 text-[2rem] leading-[2.375rem] font-bold">{{ format(service.scheduled_delivery, 'dd') }}</div>
									<div class="text-base sm:leading-10 leading-5">{{ format(service.scheduled_delivery, 'iii') }}</div>
								</div>
								<div class="flex w-[calc(100%-3.875rem)] sm:px-[1.875rem] sm:h-[7.875rem] h-auto px-5 py-2.5 justify-between items-center border-[0.031rem] border-[#6f6e7433]">
									<div class="flex sm:py-[2.438rem] py-0 flex-col items-start">
										<div class="font-medium sm:text-base sm:leading-6 text-sm leading-[1.125rem] text-brand-black">{{service.service_name}}</div>
										<div class="sm:text-base text-sm leading-[1.125rem] sm:leading-6 text-[#00000080]">{{ !service.service_speed && service.service_name==='Home & Bedding' ? '72h service' : service.service_speed ? '48h service' : '24h service' }}</div>
									</div>
									<img class="w-9 h-9" v-if="service.service_name==='Wash & Fold'" src="https://ik.imagekit.io/choreless/V3/icons/wash-fold.svg" alt="choreless icon">
									<img class="w-9 h-9" v-if="service.service_name==='Delicate Wash'" src="https://ik.imagekit.io/choreless/V3/icons/bucket.svg" alt="choreless icon">
									<img class="w-9 h-9" v-if="service.service_name==='Home & Bedding'" src="https://ik.imagekit.io/choreless/V3/icons/bedding.svg" alt="choreless icon">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col items-start sm:gap-5 gap-2.5 w-full">
					<div class="sm:text-2xl sm:leading-7 text-base leading-5 font-bold">Frequency</div>
					<div  class="flex  w-full items-start content-start gap-5 flex-wrap">		
						<div v-for="frequency of book.frequencies" :key="frequency" class=" [&:is(:hover,.active)]:bg-brand-black [&:is(:hover,.active)]:border-brand-black [&:is(:hover,.active)]:text-white px-5 py-2.5 rounded-[0.313rem] border-[0.063rem] border-[#6F6E7433] text-black sm:font-medium font-normal whitespace-nowrap sm:leading-6 sm:max-w-[13.938rem] w-[45%] sm:h-12 h-10 flex items-center justify-center gap-2.5 flex-shrink-0 cursor-pointer sm:text-base text-sm leading-[1.125rem]" :class="frequency==book.frequency && 'active'" @click="book.frequency=frequency">{{frequency}}</div>
					</div>
					<button class=" bg-[#f8f8f8] px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-black font-bold " >Continue</button>
				</div>
			</div>
		</div>
		</div>
</template>

<style lang="scss" scoped>

</style>