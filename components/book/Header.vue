<script setup lang="ts">
// Defining Constants
const book = usePageBook();
const step_names = ['Select Services', 'Care preferences', 'Select pickup info'];
async function next(){
	if(book.step <book.totalStep){
		book.wash_is_required = true;
		if(book.wash_type){
			book.wash_is_required = false;
			book.step++
		}
	}else{
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
}

</script>

<template>
<div class="sticky top-[-0.063rem]  mx-auto shadow-md sm:shadow-none bg-white z-50 max-w-[120rem]  ">
	<!-- <NuxtLink class="block w-fit mx-auto md:hidden" to="https://chorelesslaundry.bookingkoala.com/dashboard"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:350px)]:h-9 [@media(min-width:450px)]:h-12 xl:h-[3.75rem]"></NuxtLink> -->
	<section class="py-2.5 px-2.5  sm:px-[3.125rem] mx-auto mt-1.5 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr] items-center">
		<div class="flex items-center gap-2.5">
			<button v-if="book.step>0" class="btn btn-sm btn-ghost hover:bg-transparent hover:fill-brand-orange" @click="--book.step">
				<IconArrow />
			</button>
			<p class="w-7 h-7 rounded-full font-bold leading-[0.875rem] flex items-center justify-center bg-red-500 text-white">{{ book.step+1 }}</p>
			<p class="font-bold leading-[0.938rem] ms-2.5">{{ step_names[book.step] }}</p>
		</div>
		<NuxtLink class="  justify-self-center hidden md:block" to="https://chorelesslaundry.bookingkoala.com/dashboard"><img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" alt="Choreless" loading="lazy" class="h-[1.95rem] [@media(min-width:21.875rem)]:h-9 [@media(min-width:28.125rem)]:h-12 xl:h-[3.75rem]"></NuxtLink>
		<NuxtLink to="https://chorelesslaundry.bookingkoala.com/dashboard" class=" hidden sm:block btn btn-sm btn-ghost justify-self-end w-8 p-1.5 stroke-2 stroke-brand-orange hover:stroke-white hover:bg-transparent">
			<IconClose class="stroke-inherit" />
		</NuxtLink>
		<button :class="book.wash_type ? 'text-white bg-brand-orange' : 'text-black bg-[#f8f8f8]'" class="px-6 py-3 rounded-[0.313rem] bg-[#f8f8f8] font-medium block sm:hidden" @click="next">Next</button>
	</section>
	<div class="w-full hidden sm:block border-gray-100 h-[0.5rem] bg-[#dbdbdb]">
		<div class="  h-[0.5rem] bg-brand-orange transition-width duration-500" :style="{width: `${book.bookProgress}%`}" />
	</div>
</div>
</template>
