<script setup lang="ts">
import info_modal from '../modals/Info.vue';
import pricing_modal from '../modals/Pricing.vue';
import add_note_modal from '../modals/AddNote.vue';
import switch_button from '../buttons/switchBtn.vue';
// Defining Interfaces
interface Service {
	id:number;
    wash_type: string;
    from_price: number;
    to_price: number;
	bags_count: number;
    service_speed: string;
    note: string;
}
// Defining Constants

const is_toggle=ref(false)
const book = usePageBook();
const clicked_service=ref<Service>({
	id: 0,
	wash_type: '',
	from_price: 0,
	to_price: 0,
	note: '',
	service_speed: '',
	bags_count: 1

})
const wash_services_data=reactive([
	{
		id: 1,
		wash_type: 'Mixed Wash',
		from_price: 1.80,
		to_price: 2.00,
		note: '',
		service_speed: 'next_day',
		bags_count: 1

	},
	{
		id: 2,
		wash_type: 'Seperate Wash',
		from_price: 2.25,
		to_price: 2.50,
		note: 'Do not add any bleech on my clothes.',
		service_speed: 'next_day',
		bags_count: 1

	}
])
const big_item = book.optional_item

// Defining functions

function select_service(service:Service){
	clicked_service.value=service
	book.wash_type=clicked_service.value.wash_type
	book.service_speed=clicked_service.value.service_speed
	book.wash_is_required=false
}
function update_toggle_val(){
	is_toggle.value=!is_toggle.value
	if(is_toggle.value===true){
		clicked_service.value.service_speed='2_day'
		is_toggle.value=true
	}else if(is_toggle.value===false){
		clicked_service.value.service_speed='next_day'
		is_toggle.value=false
	}
}

function add_optional_item(){
	book.extra_service=!book.extra_service
}

function open_add_note(service: Service){
	clicked_service.value=service
	book.add_note_modal=!book.add_note_modal
	book.note=service.note
}

function update_note({ note }:{ note: string }){
	clicked_service.value.note=note;
	if(clicked_service.value.id === big_item.id){
		book.extra_service=true
	}
}
function next_step(){
	if(clicked_service.value.id===0){
		book.wash_is_required=true
	}
	else{
		book.wash_is_required=false
		book.step++
	}
}

</script>

<template>
<div class="px-[15px] sm:px-0">
	<div class="my-8 max-w-[467px] mx-auto flex flex-col items-start gap-3 sm:gap-5">
		<h1 class=" text-base leading-5 sm:text-2xl sm:leading-7 font-bold">How can we help you? </h1>
		<div v-for="(item,index) of wash_services_data" :key="index" class=" relative px-[15px] py-2.5 cursor-pointer rounded-[10px] border-[0.5px] border-b-[5px] border-[#e5e5e5] w-full [&:is(.active)]:border-[#f85a47]  transition-all duration-100 ease-linear shadow-card" :class="book.wash_type==item.wash_type ? 'active' : ''" @click="select_service(item)">
			<div class="flex items-start  sm:items-center self-stretch gap-5 justify-between">
				<div class="max-w-[348px] w-full flex flex-col items-start gap-0 sm:gap-2.5">
					<h1 class=" text-xl leading-6 sm:text-2xl sm:leading-6  font-bold text-[#f85a47] capitalize">{{ item.wash_type }}</h1>
					<p v-if="item.service_speed==='next_day'" class="text-[10px] leading-4 mt-2.5 sm:mt-0">From <span class=" font-medium">$ {{ item.from_price.toFixed(2) }}/lb</span></p>
					<p v-else class="text-[10px] leading-4  mt-2.5 sm:mt-0">From <span class=" font-medium">${{ item.to_price.toFixed(2) }}/lb</span></p>
					<div class="flex items-center justify-start gap-[5px] self-stretch flex-wrap  mt-2.5 sm:mt-0">
						<p class=" flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">WASH</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">TUMBLE-DRY</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">IN A BAG</p>
						<div class="flex items-center gap-x-1">
							<img src="https://ik.imagekit.io/choreless/v2/icons/time.svg" alt="icon" loading="lazy" class="w-[10px] h-[10px]">

							<p class="text-[12px]  font-medium leading-6">{{ item.service_speed==='next_day' ? '24h Service' : '48h Service' }} </p>
						</div>
					</div>
					<div class="text-[12px] leading-4 ">Convenient wash & fold laundry service for individuals couples. </div>
				</div>
				<div class=" pt-5 sm:pt-0">
					<div v-if="item.wash_type==='Mixed Wash'"><IconMixed :isActive="clicked_service.id===item.id " /></div>
					<div v-else><IconSeperate :isActive="clicked_service.id===item.id " /></div>
				</div>
			</div>
			<div :class="clicked_service.id===item.id ? 'block' : 'hidden' " class="bg-white w-full ">
				<div class="flex justify-between items-center self-stretch mt-2.5 sm:mt-5">
					<div class="max-w-[200px] sm:max-w-[223.5px] w-full pr-5 flex items-start justify-between gap-2.5">
						<h1 class="text-xs sm:text-sm leading-5 font-medium">Next Day Delivary</h1>
						<switch_button :is_toggle="is_toggle" @update:is_toggle="update_toggle_val" />
					</div>
					<div class="w-[1px] h-5 bg-[#0000000d]" />
					<div class=" cursor-pointer text-right text-xs sm:text-sm font-medium " @click="open_add_note(item)">{{ item.note ? 'Edit Note' :'Add Note' }}</div>
				</div>
				<div class="my-2.5 h-[1px] bg-[#0000000d] w-full" />
				<div class="flex h-5 justify-between items-center self-stretch px-2.5">
					<button class="text[25px] leading-5 " :class="item.bags_count<2 ? ' text-[#838383]' : 'text-black'" :disabled="item.bags_count<2" @click="item.bags_count--"><Icon name="ic:outline-minus" class="text-2xl" /></button>
					<p class="text-xs sm:text-sm font-medium">{{ item.bags_count }} Bags</p>
					<button class="text[25px] leading-5" @click="item.bags_count++"><Icon name="ic:outline-plus" class="text-2xl" /></button>
				</div>
			</div>
		</div>
		<p v-if="book.wash_is_required" class="text-error mt-1">* Wash type is required</p>

		<h1 class="text-base leading-5 sm:text-2xl sm:leading-7 font-bold">
			Do you have any Big Item ?
		</h1>
		<div :class="book.extra_service ? 'active' : ''" class=" shadow-card relative px-[15px] py-2.5 cursor-pointer rounded-[10px] border-[0.5px] border-b-[5px] border-[#e5e5e5] w-full [&:is(.active)]:border-[#f85a47]  transition-all duration-100 ease-linear">
			<div class="flex  self-stretch gap-5 justify-between " @click="add_optional_item">
				<div class="max-w-[348px] w-full flex flex-col items-start gap-0 sm:gap-2.5">
					<h1 class="text-xl leading-6 sm:text-2xl sm:leading-6  font-bold text-[#f85a47]  capitalize">{{ big_item.wash_type }}</h1>
					<div class="flex items-center  gap-[5px]">
						<p class="text-[10px] leading-4 mt-2.5 sm:mt-0 ">From <span class=" font-medium">${{ big_item.from_price }}.00 <span class="text-[8px] leading-4"> price per item</span></span></p>
						<button class="text-[#f85a47] text-[8px] leading-3 font-medium" @click="book.pricing_modal=!book.pricing_modal">See pricing</button>
						<pricing_modal />
					</div>
					<div class="flex items-center justify-start gap-[5px] self-stretch flex-wrap mt-2.5 sm:mt-0">
						<p class=" flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">WASH</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">TUMBLE-DRY</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">IN A BAG</p>
						<div class="flex items-center gap-x-1">
							<img src="https://ik.imagekit.io/choreless/v2/icons/time.svg" alt="icon" loading="lazy" class="w-[10px] h-[10px]">
							<p class="text-[12px] font-medium leading-6">{{ big_item.service_speed }} </p>
						</div>
					</div>

					<div class="text-[12px] leading-4 ">Convenient wash & fold laundry service for individuals couples. </div>
				</div>
				<div class="flex flex-col justify-center items-center relative w-fit">
					<div><IconOptional :isActive="book.extra_service " /></div>
					<div :class="book.extra_service ? 'block' : 'hidden' " class=" cursor-pointer text-right text-xs sm:text-sm font-medium absolute bottom-0 right-0  text-nowrap " @click="open_add_note(big_item)">{{ big_item.note ? 'Edit Note' :'Add Note' }}</div>
				</div>
			</div>
			<div :class="book.extra_service ? 'block' : 'hidden' " class="bg-white w-full ">
				<div class="my-2.5 h-[1px] bg-[#0000000d] w-full" />
				<div class="flex h-5 justify-between items-center self-stretch px-2.5">
					<button class="text[25px] leading-5 " :class="big_item.bags_count<2 ? ' text-[#838383]' : 'text-black'" :disabled="big_item.bags_count<2" @click="big_item.bags_count--"><Icon name="ic:outline-minus" class="text-2xl" /></button>
					<p class="text-xs sm:text-sm font-medium">{{ big_item.bags_count }} Bags</p>
					<button class="text[25px] leading-5" @click="big_item.bags_count++"><Icon name="ic:outline-plus" class="text-2xl" /></button>
				</div>
			</div>
		</div>

		<div class="p-[15px] w-full rounded-[5px] bg-gradient-to-t from-[#ff7565] via-[#ff7565] to-[#ff4e38] ">
			<div class=" flex justify-between items-center">
				<div>
					<IconTag color="white" class="mr-[15px]" />
				</div>
				<div class="flex flex-col gap-[6px] text-white max-w-[381px] w-full">
					<p class=" text-[10px] leading-4 sm:text-sm sm:leading-[18px]">Write your name to avoid laundry mix-ups.</p>
					<h1 class="sm:text-lg leading-[18px] font-bold">Load label: <span class="font-normal"> Tillman + CF2A</span></h1>
				</div>

				<div class="cursor-pointer">
					<IconInfo3 @click="book.info_modal=!book.info_modal" />
					<info_modal />
				</div>
			</div>
		</div>
		<div class="w-full">
			<h1 class="text-base leading-5 sm:leading-6 font-bold mb-2.5">What happens next?</h1>
			<div class="flex items-start justify-start overflow-scroll no-scrollbar gap-[15px]  text-black">
				<div class="p-2.5 rounded-[5px] bg-[#f8f8f8] min-h-[82px] h-full text-center min-w-[133px] w-full">
					<div class="mb-[5px] flex justify-center items-center"><IconBag /></div>
					<p class="text-xs font-bold">Prepare your bags</p>
					<h1 class="text-[10px] leading-[14px]">Pack 1 bag per service <br> type.</h1>
				</div>
				<div class="p-2.5 rounded-[5px] bg-[#f8f8f8] min-h-[82px] h-full text-center min-w-[175px] w-full">
					<div class="mb-[5px] flex justify-center items-center"><IconClean /></div>
					<p class="text-xs font-bold text-nowrap">We collect and clean items</p>
					<h1 class="text-[10px] leading-[14px]">After cleaning, you <br> will receive an </h1>
				</div>
				<div class=" block p-2.5 rounded-[5px] bg-[#f8f8f8] min-h-[82px] h-full text-center min-w-[133px] w-full">
					<div class="mb-[5px] flex justify-center items-center"><IconDeliver /></div>
					<p class="text-xs font-bold">We deliver</p>
					<h1 class="text-[10px] leading-[14px]">After cleaning, you will receive an </h1>
				</div>
			</div>
		</div>
		<button :class="clicked_service.id !==0 ? 'text-white bg-[#f85a47]' : 'text-black bg-[#f8f8f8]'" class=" hidden sm:block font-bold text-center w-full px-5 py-[18px] rounded-[5px] " @click="next_step">Continue</button>
	</div>
	<add_note_modal :note="clicked_service.note" @update:note="update_note" />
</div>
</template>
<style scoped>

</style>
