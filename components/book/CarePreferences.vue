<script setup lang="ts">
import switch_button from '../buttons/switchBtn.vue';
import customer from '~/lib/customer';

// Defining Interfaces

interface Item {
		is_active: boolean;
		value: string;
	}

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

const update_button_status = (item:Item) => {
	item.is_active=!item.is_active
};
</script>

<template>
<div class="max-w-[467px] mx-auto my-[50px] px-2 flex flex-col gap-5">
	<div>
		<h1 class="text-[24px] leading-7 font-bold">Care Preferences</h1>
		<p class=" text-[#00000080]/50 text-sm leadin-[18px]">Preferences will be applied to all orders</p>
	</div>
	<div class="flex flex-col gap-2.5">
		<h2 class="font-bold text-brand-black">Water Temp</h2>
		<div class="">
			<div class="flex flex-wrap gap-2.5 ">
				<label v-for="v of customer.water_temperatures" :key="v" class="px-5 py-[14px] btn btn-outline  grow border-brand-black/20 [&:is(:hover,.active)]:bg-[#F85A47] [&:is(:hover,.active)]:!border-[#e5e5e5] [&:is(:hover,.active)]:text-white" :class="book.water_temperature===v && 'active'">
					<input v-model="book.water_temperature" type="radio" :value="v" hidden>
					<p class="text-[16px] font-medium leading-5">{{ v }}</p>
				</label>
			</div>
			<p v-if="book.error.water_temperature" class="text-error">* Water Temperature is required</p>
		</div>
	</div>
	<div class="flex flex-col gap-2.5">
		<h2 class="font-bold  text-brand-black">Dryer Temp</h2>
		<div class="">
			<div class="flex flex-wrap gap-2.5">
				<label v-for="v of customer.dryer_temperatures" :key="v" class="px-5 py-2.5 btn btn-outline font-bold grow border-brand-black/20 [&:is(:hover,.active)]:bg-[#F85A47] [&:is(:hover,.active)]:!border-[#e5e5e5] [&:is(:hover,.active)]:text-white" :class="book.dryer_temperature===v && 'active'">
					<input v-model="book.dryer_temperature" type="radio" :value="v" hidden>
					<p class="text-[16px] font-medium leading-5">{{ v }}</p>
				</label>
			</div>
			<p v-if="book.error.dryer_temperature" class="text-error">* Dryer Temperature is required</p>
		</div>
	</div>

	<div class="collapse  rounded-[5px]  ">
		<input v-model="collapsed" type="checkbox">
		<div class="collapse-title text-base  flex justify-between items-center py-[12px] px-5 font-medium border !border-gray-300 rounded-[5px]">
			{{ book.detergent.value ?? 'Choose Detergent' }}
			<Icon class="text-[28px] leading-6 !font-normal" :name="!collapsed ? 'material-symbols:add-rounded' : 'ic:sharp-minus'" />
		</div>
		<div :class="collapsed? 'mt-2.5 pt-2.5' : ''" class="collapse-content bg-white border !border-gray-300 rounded-md  px-5">
			<label v-for="v of customer.detergents" :key="v.value">
				<input v-model="book.detergent.value" type="radio" :value="v.value" class="detergent-input" @click="collapsed=!collapsed">
				<div class="flex  cursor-pointer ">
					<span :class="v.value == 'Customer Provided' ? 'border-0 pt-2.5': 'border-b-[0.5px]  border-[#01163126] py-2.5' " class="  w-full "><p>{{ v.value }} <span v-if="v.isPopular" class="pl-5 text-xs text-[#01163180]/50 items-center">(Most popular choice)</span></p><p class=" text-[#01163180]/50">{{ v.description }}</p></span> </div>
			</label>
		</div>
	</div>
	<div v-for="(item,index) in book.care_services" :key="index" class="  flex items-center w-full border-brand-black/20 border rounded-lg justify-between px-5 py-[14px]">
		<p class="font-medium ">{{ item.value }}</p>

		<switch_button :is_toggle="item.is_active" @update:is_toggle="update_button_status(item)" />
	</div>
	<div>
		<div class="mb-2.5 flex justify-between items-center">
			<p class="text-black leading-7 text-[24px] font-bold ">Preferences Note</p>
			<p class="leading-[15px] font-medium text-base cursor-pointer " @click="book.preference_note=''">Clear</p>
		</div>
		<textarea v-model="book.preference_note" rows="3" class=" relative px-[15px] py-2.5 cursor-pointer rounded-[10px] border-[0.5px] focus:border-b-[5px]  w-full focus:border-[#f85a47] focus:outline-none transition-all duration-100 ease-linear placeholder:text-[#e5e5e5] " placeholder="Care preferences " />
	</div>
	<div>
		<label class="flex cursor-pointer gap-2.5">
			<input
				v-model="book.do_not_show_page"
				type="checkbox"
				name="customer_type"
				value="retail"
				class="checkbox w-5 h-5 rounded-sm [--chkbg:#F85A47]"
			>
			<div class="flex flex-col gap-[5px]">

				<h2 class="leading-4 font-medium">Don't show me this page again</h2>
				<p class="text-xs">
					We’ll remember your preferences. You can always access the
					via Account Settings and when checking out
				</p>
			</div>
		</label>
	</div>
	<button :class="!book.water_temperature || !book.dryer_temperature? 'bg-[#F3F3F6] text-black' : 'bg-[#F85A47]  text-white' " class="  w-full py-[18px] px-5  rounded-[5px] text-2xl text-[16px] font-bold leading-6  cursor-pointer   " @click="next()">Continue</button>
</div>
</template>
<style scoped>
.detergent-input {
  display: none;
}

</style>
