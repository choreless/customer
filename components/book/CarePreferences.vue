<script setup lang="ts">
import SwitchButton from '../buttons/SwitchBtn.vue';
import customer from '~/lib/customer';

// Defining Constants

const book = usePageBook();
const collapsed= ref(false)

// Defining Functions

function next(){
	book.error.water_temperature = !book.water_temperature;
	book.error.dryer_temperature = !book.dryer_temperature;
	if(book.error.water_temperature || book.error.dryer_temperature) return;
	book.step++;
}

</script>

<template>
<div class="max-w-[29.18rem] mx-auto my-[1.87rem] sm:my-[3.12rem] flex flex-col gap-5 px-2.5 sm:px-2">
	<div>
		<h1 class=" leading-5 sm:text-[1.5rem] sm:leading-7 font-bold">Care Preferences</h1>
		<p class=" text-[#00000080]/50 text-xs sm:text-sm sm:leading-[1.12rem]">Preferences will be applied to all orders</p>
	</div>
	<div class="flex flex-col gap-2.5">
		<h2 class="font-bold text-brand-black">Water Temp</h2>
		<div class="">
			<div class="flex flex-wrap gap-2.5 ">
				<label v-for="v of customer.water_temperatures" :key="v" class="px-5 py-[0.87rem] btn btn-outline  grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-orange [&:is(:hover,.active)]:!border-[#e5e5e5] [&:is(:hover,.active)]:text-white" :class="book.water_temperature===v && 'active'">
					<input v-model="book.water_temperature" type="radio" :value="v" hidden>
					<p class="text-sm sm:text-[1rem] font-medium leading-5">{{ v }}</p>
				</label>
			</div>
			<p v-if="book.error.water_temperature" class="text-error">* Water Temperature is required</p>
		</div>
	</div>
	<div class="flex flex-col gap-2.5">
		<h2 class="font-bold  text-brand-black">Dryer Temp</h2>
		<div class="">
			<div class="flex flex-wrap gap-2.5">
				<label v-for="v of customer.dryer_temperatures" :key="v" class="px-5 py-2.5 btn btn-outline font-bold grow border-brand-black/20 [&:is(:hover,.active)]:bg-brand-orange [&:is(:hover,.active)]:!border-[#e5e5e5] [&:is(:hover,.active)]:text-white" :class="book.dryer_temperature===v && 'active'">
					<input v-model="book.dryer_temperature" type="radio" :value="v" hidden>
					<p class="text-sm sm:text-[1rem] font-medium leading-5">{{ v }}</p>
				</label>
			</div>
			<p v-if="book.error.dryer_temperature" class="text-error">* Dryer Temperature is required</p>
		</div>
	</div>

	<div class="collapse  rounded-[0.31rem]  ">
		<input v-model="collapsed" type="checkbox">
		<div class="collapse-title text-sm sm:text-base  flex justify-between items-center py-[0.75rem] px-5 font-medium border !border-gray-300 rounded-[0.31rem]">
			{{ book.detergent.value ?? 'Choose Detergent' }}
			<Icon class="text-[1.75rem] leading-6 !font-normal" :name="!collapsed ? 'material-symbols:add-rounded' : 'ic:sharp-minus'" />
		</div>
		<div :class="collapsed? 'mt-2.5 pt-2.5' : ''" class="collapse-content bg-white border !border-gray-300 rounded-md  px-5">
			<label v-for="v of customer.detergents" :key="v.value">
				<input v-model="book.detergent.value" type="radio" :value="v.value" class="hidden" @click="collapsed=!collapsed">
				<div class="flex  cursor-pointer ">
					<span :class="v.value == 'Customer Provided' ? 'border-0 pt-2.5': 'border-b-[0.032rem]  border-[#01163126] py-2.5' " class="  w-full "><p>{{ v.value }} <span v-if="v.isPopular" class="pl-5 text-xs text-[#01163180]/50 items-center">(Most popular choice)</span></p><p class=" text-[#01163180]/50">{{ v.description }}</p></span> </div>
			</label>
		</div>
	</div>
	<div v-for="(item,index) in book.care_services" :key="index" class=" cursor-pointer flex items-center w-full border-brand-black/20 border rounded-lg justify-between px-5 py-[14px]" @click="item.is_active=!item.is_active">
		<p class=" text-sm sm:text-base font-medium ">{{ item.value }}</p>
		<SwitchButton :toggle="item.is_active" @update:is_toggle="(active)=>item.is_active=active " />
	</div>
	<div>
		<div class="mb-2.5 flex justify-between items-center">
			<p class="text-black text-base leading-5 sm:leading-7 sm:text-[1.5rem] font-bold ">Preferences Note</p>
			<p class=" text-[0.625rem] leading-[0.938rem] font-medium sm:text-base cursor-pointer " @click="book.preference_note=''">Clear</p>
		</div>
		<textarea v-model="book.preference_note" rows="3" :class="book.preference_note ? 'active border-b-[0.313rem]':''" class=" outline-none border-[0.032rem]  border-[#e5e5e5] [&:is(.active)]:border-brand-orange relative px-[0.938rem] py-2.5 cursor-pointer rounded-[0.625rem]  w-full transition-all duration-100 ease-linear placeholder:text-[#e5e5e5] " placeholder="Care preferences " />
	</div>
	<div>
		<label class="flex cursor-pointer gap-2.5">
			<input
				v-model="book.do_not_show_page"
				type="checkbox"
				name="customer_type"
				value="retail"
				class="checkbox w-5 h-5 rounded-sm [--chkbg:#f85a47]"
			>
			<div class="flex flex-col gap-[0.313rem]">

				<h2 class="leading-4 font-medium">Don't show me this page again</h2>
				<p class="text-xs">
					We’ll remember your preferences. You can always access the
					via Account Settings and when checking out
				</p>
			</div>
		</label>
	</div>
	<button :class="!book.water_temperature || !book.dryer_temperature? 'bg-[#f3f3f6] text-black' : 'bg-brand-orange  text-white' " class=" hidden sm:block  w-full py-[1.124rem] px-5  rounded-[0.313rem] text-2xl text-[1rem] font-bold leading-6  cursor-pointer   " @click="next()">Continue</button>
</div>
</template>
