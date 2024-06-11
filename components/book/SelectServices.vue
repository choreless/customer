<script setup lang="ts">
import InfoModal from '../modals/Info.vue';
import PricingModal from '../modals/Pricing.vue';
import AddNoteModal from '../modals/AddNote.vue';
import SwitchButton from '../buttons/SwitchBtn.vue';
import customer from '~/lib/customer';
// Defining Interfaces
interface Service {
	id:number;
    wash_type: string;
    price: number;
    per_lb: number;
	bags_count: number;
    service_speed: string;
    note: string;
}
// Defining Constants
const current_Screen=ref('select_services')
const is_toggle=ref(false)
const book = usePageBook();
const pricing_info=book.pricing_info
const selected_pricing=ref('')
const selected_item=ref(-1)
const collapsed= ref(false)

const clicked_service=ref<Service>({
	id: 0,
	wash_type: '',
	price: 0,
	per_lb: 0,
	note: '',
	service_speed: '',
	bags_count: 1

})
const wash_services_data=reactive([
	{
		id: 1,
		wash_type: 'Wash & Fold',
		price: 35,
		per_lb: 1.80,
		note: '',
		service_speed: '24h Service',
		bags_count: 1,
		tags: ['Normal Cycle', 'Cold Water', 'Tumble-Med']

	},
	{
		id: 2,
		wash_type: 'Delicate Wash',
		price: 35,
		per_lb: 1.80,
		note: '',
		service_speed: '24h Service',
		bags_count: 1,
		tags: ['Gentle Cycle', 'Tumble-low', 'In a bag']

	},
	{
		id: 2,
		wash_type: 'Home & Bedding',
		price: 35,
		per_lb: 10.00,
		note: '',
		service_speed: '72h Service',
		bags_count: 1,
		tags: ['Custom Cleaning']

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
function update_toggle_val(e:boolean){
	is_toggle.value=e
	if(is_toggle.value===true){
		clicked_service.value.service_speed='2_day'
		is_toggle.value=true
	}else if(is_toggle.value===false){
		clicked_service.value.service_speed='next_day'
		is_toggle.value=false
	}
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
	if(book.wash_type ===undefined){
		book.wash_is_required=true
	}
	else{
		book.wash_is_required=false
		book.step++
	}
}

function update_screen(screen:string){
	current_Screen.value=screen
}

const filtered_data:any = computed(() => {
	const updated_data=pricing_info.filter((item:any)=>item.heading.includes(selected_pricing.value))
	return updated_data;
})

</script>

<template>
<div class="px-[0.938rem] py-[3.125rem] sm:px-0">
	<div v-if="current_Screen==='select_services'" class=" max-w-[32.938rem] mx-auto flex flex-col items-start gap-5 p-[1.875rem] rounded-[1.25rem] bg-white border-[#f2f2f2] ">
		<h1 class="text-2xl font-bold leading-7 text-brand-black">How can we help you? </h1>
		<div v-for="(item,index) of wash_services_data" :key="index" class=" relative px-[0.938rem] py-2.5 cursor-pointer rounded-[0.625rem] border-[0.032rem] border-[#f2f2f2] w-full flex flex-col gap-2.5" :class="book.wash_type==item.wash_type ? 'active' : ''" @click="select_service(item)">
			<div class="flex  items-center gap-5 self-stretch">
				<div class="flex gap-2.5 max-w-[21.75rem] w-full flex-col items-start">
					<div class="flex gap-[0.563rem] items-center">
						<img v-if="item.wash_type==='Wash & Fold'" src="https://ik.imagekit.io/choreless/V3/icons/shirt.svg" alt="choreless icon">
						<img v-if="item.wash_type==='Delicate Wash'" src="https://ik.imagekit.io/choreless/V3/icons/bucket.svg" alt="choreless icon">
						<img v-if="item.wash_type==='Home & Bedding'" src="https://ik.imagekit.io/choreless/V3/icons/bedding.svg" alt="choreless icon">
						<div class="text-2xl leading-6 font-bold">{{ item.wash_type }}</div>
						<div class="flex items-center gap-[0.313rem]">
							<img class="w-2.5 h-2.5" src="https://ik.imagekit.io/choreless/V3/icons/clock.svg" alt="">
							<div class="text-brand-black text-xs font-medium leading-6">{{ item.service_speed }}</div>
						</div>
					</div>
					<div class="text-[0.625rem] text-brand-black leading-4">
						Starting at
						<span class="font-medium">
							${{ item.price }} minimum
						</span>
						<span class="text-[0.5rem]">
							(${{ item.per_lb.toFixed(2) }}/lb)
						</span>
					</div>
					<div class=" flex flex-col items-start self-stretch gap-[0.313rem]">
						<div class="flex justify-center items-center gap-2.5">
							<div v-for="(tag,subIndex) in item.tags" :key="subIndex" class="px-2.5  rounded-[1.25rem] bg-[#f2f2f2] text-[0.5rem]  leading-[0.875rem] uppercase text-brand-black">{{ tag }}</div>
						</div>
						<div class="text-xs text-brand-black">Convenient wash & fold laundry service for individuals couples. </div>
					</div>
				</div>
				<div class="flex flex-col justify-between items-end self-stretch pt-5">
					<div class="flex py-[0.188rem] px-[0.938rem] gap-2.5 rounded-[1.25rem] border-[0.063rem] border-brand-black text-right text-sm font-medium" @click="update_screen('preferences')">
						+ Add
					</div>
					<div class="text-xs font-medium text-right " @click="update_screen('pricing')">see pricing</div>
				</div>
			</div>
			<!-- <div class="flex items-start  sm:items-center self-stretch gap-5 justify-between">
				<div class="max-w-[22.375rem] w-full flex flex-col items-start gap-0 sm:gap-2.5">
					<h1 class=" text-xl leading-6 sm:text-2xl sm:leading-6  font-bold text-brand-orange capitalize">{{ item.wash_type }}</h1>
					<p v-if="item.service_speed==='next_day'" class="text-[0.625rem] leading-4 mt-2.5 sm:mt-0">From <span class=" font-medium">$ {{ item.from_price.toFixed(2) }}/lb</span></p>
					<p v-else class="text-[0.625rem] leading-4  mt-2.5 sm:mt-0">From <span class=" font-medium">${{ item.to_price.toFixed(2) }}/lb</span></p>
					<div class="flex items-center justify-start gap-[0.313rem] self-stretch flex-wrap  mt-2.5 sm:mt-0">
						<p class=" flex justify-center items-center px-2.5 text-[0.5rem] leading-[0.875rem] rounded-[1.25rem] bg-[#f2f2f2]">WASH</p>
						<p class="flex justify-center items-center px-2.5 text-[0.5rem] leading-[0.875rem] rounded-[1.25rem] bg-[#f2f2f2]">TUMBLE-DRY</p>
						<p class="flex justify-center items-center px-2.5 text-[0.5rem] leading-[0.875rem] rounded-[1.25rem] bg-[#f2f2f2]">IN A BAG</p>
						<div class="flex items-center gap-x-1">
							<img src="https://ik.imagekit.io/choreless/v2/icons/time.svg" alt="icon" loading="lazy" class="w-[0.625rem] h-[0.625rem]">

							<p class="text-xs  font-medium leading-6">{{ item.service_speed==='next_day' ? '24h Service' : '48h Service' }} </p>
						</div>
					</div>
					<div class="text-xs leading-4 ">Convenient wash & fold laundry service for individuals couples. </div>
				</div>
				<div class=" pt-5 sm:pt-0">
					<div v-if="item.wash_type==='Mixed Wash'"><IconMixed :isActive="book.wash_type===item.wash_type " /></div>
					<div v-else><IconSeperate :isActive="book.wash_type===item.wash_type " /></div>
				</div>
			</div> -->
			<!-- <div :class="book.wash_type===item.wash_type ? 'block' : 'hidden' " class="bg-white w-full ">
				<div class="flex justify-between items-center self-stretch mt-2.5 sm:mt-5">
					<div class="max-w-[12.5rem] sm:max-w-[13.969rem] w-full pr-5 flex items-start justify-between gap-2.5">
						<h1 class="text-xs sm:text-sm leading-5 font-medium">Next Day Delivary</h1>
						<SwitchButton @update:is_toggle="update_toggle_val" />
					</div>
					<div class="w-[0.063rem] h-5 bg-[#0000000d]" />
					<div class=" cursor-pointer text-right text-xs sm:text-sm font-medium " @click="open_add_note(item)">{{ item.note ? 'Edit Note' :'Add Note' }}</div>
				</div>
				<div class="my-2.5 h-[0.063rem] bg-[#0000000d] w-full" />
				<div class="flex h-5 justify-between items-center self-stretch px-2.5">
					<button class="text[1.563rem] leading-5 " :class="item.bags_count<2 ? ' text-[#838383]' : 'text-black'" :disabled="item.bags_count<2" @click="item.bags_count--"><Icon name="ic:outline-minus" class="text-2xl" /></button>
					<p class="text-xs sm:text-sm font-medium">{{ item.bags_count }} Bags</p>
					<button class="text[1.563rem] leading-5" @click="item.bags_count++"><Icon name="ic:outline-plus" class="text-2xl" /></button>
				</div>
			</div>
		</div>
		<p v-if="book.wash_is_required" class="text-error mt-1">* Wash type is required</p>

		<h1 class="text-base leading-5 sm:text-2xl sm:leading-7 font-bold">
			Do you have any Big Item ?
		</h1>
		<div :class="book.extra_service ? 'active' : ''" class=" shadow-card relative px-[0.938rem] py-2.5 cursor-pointer rounded-[0.625rem] border-[0.031rem] border-b-[0.313rem] border-[#e5e5e5] w-full [&:is(.active)]:border-brand-orange  transition-all duration-100 ease-linear">
			<div class="flex  self-stretch gap-5 justify-between " @click="book.extra_service=!book.extra_service">
				<div class="max-w-[21.75rem] w-full flex flex-col items-start gap-0 sm:gap-2.5">
					<h1 class="text-xl leading-6 sm:text-2xl sm:leading-6  font-bold text-brand-orange  capitalize">{{ big_item.wash_type }}</h1>
					<div class="flex items-center  gap-[0.313rem]">
						<p class="text-[0.625rem] leading-4 mt-2.5 sm:mt-0 ">From <span class=" font-medium">${{ big_item.from_price }}.00 <span class="text-[0.5rem] leading-4"> price per item</span></span></p>
						<button class="text-brand-orange text-[0.5rem] leading-3 mt-2 sm:mt-0 font-medium" @click="book.pricing_modal=!book.pricing_modal,book.extra_service=!book.extra_service">See pricing</button>
					</div>
					<div class="flex items-center justify-start gap-[0.313rem] self-stretch flex-wrap mt-2.5 sm:mt-0">
						<p class=" flex justify-center items-center px-2.5 text-[0.5rem] leading-[0.875rem] rounded-[1.25rem] bg-[#f2f2f2]">WASH</p>
						<p class="flex justify-center items-center px-2.5 text-[0.5rem] leading-[0.875rem] rounded-[1.25rem] bg-[#f2f2f2]">TUMBLE-DRY</p>
						<p class="flex justify-center items-center px-2.5 text-[0.5rem] leading-[0.875rem] rounded-[1.25rem] bg-[#f2f2f2]">IN A BAG</p>
						<div class="flex items-center gap-x-1">
							<img src="https://ik.imagekit.io/choreless/v2/icons/time.svg" alt="icon" loading="lazy" class="w-[0.625rem] h-[0.625rem]">
							<p class="text-[0.75rem] font-medium leading-6">{{ big_item.service_speed }} </p>
						</div>
					</div>

					<div class="text-[0.75rem] leading-4 ">Convenient wash & fold laundry service for individuals couples. </div>
				</div>
				<div class="flex flex-col justify-center items-center relative w-fit">
					<div><IconOptional :isActive="book.extra_service " /></div>
					<div :class="book.extra_service ? 'block' : 'hidden' " class=" cursor-pointer text-right text-xs sm:text-sm font-medium absolute bottom-0 right-0  text-nowrap " @click="open_add_note(big_item)">{{ big_item.note ? 'Edit Note' :'Add Note' }}</div>
				</div>
			</div>
			<div :class="book.extra_service ? 'block' : 'hidden' " class="bg-white w-full ">
				<div class="my-2.5 h-[0.063rem] bg-[#0000000d] w-full" />
				<div class="flex h-5 justify-between items-center self-stretch px-2.5">
					<button class="text[1.563rem] leading-5 " :class="big_item.bags_count<2 ? ' text-[#838383]' : 'text-black'" :disabled="big_item.bags_count<2" @click="big_item.bags_count--"><Icon name="ic:outline-minus" class="text-2xl" /></button>
					<p class="text-xs sm:text-sm font-medium">{{ big_item.bags_count }} Bags</p>
					<button class="text[1.563rem] leading-5" @click="big_item.bags_count++"><Icon name="ic:outline-plus" class="text-2xl" /></button>
				</div>
			</div>
		</div>

		<div class=" p-[0.625rem] sm:p-[0.938rem] w-full rounded-[0.313rem] bg-gradient-to-t from-[#ff7565] via-[#ff7565] to-[#ff4e38] ">
			<div class=" flex justify-between items-center">
				<div>
					<IconTag class="mr-[0.938rem] fill-white stroke-white" />
				</div>
				<div class="flex flex-col gap-[0.375rem] text-white max-w-[23.813rem] w-full">
					<p class=" text-[0.625rem] leading-4 sm:text-sm sm:leading-[1.125rem]">Write your name to avoid laundry mix-ups.</p>
					<h1 class="sm:text-lg leading-[1.125rem] font-bold">Load label: <span class="font-normal"> Tillman + CF2A</span></h1>
				</div>

				<div class="cursor-pointer">
					<IconInfo3 @click="book.info_modal=!book.info_modal" />
					<InfoModal />
				</div>
			</div>
		</div>
		<div class="w-full">
			<h1 class="text-base leading-5 sm:leading-6 font-bold mb-2.5">What happens next?</h1>
			<div class="flex items-start justify-start overflow-scroll no-scrollbar gap-[0.938rem]  text-black">
				<div class="p-2.5 rounded-[0.313rem] bg-[#f8f8f8] min-h-[5.125rem] h-full text-center min-w-[8.313rem] w-full">
					<div class="mb-[0.313rem] flex justify-center items-center"><IconBag /></div>
					<p class="text-xs font-bold">Prepare your bags</p>
					<h1 class="text-[0.625rem] leading-[0.875rem]">Pack 1 bag per service <br> type.</h1>
				</div>
				<div class="p-2.5 rounded-[0.313rem] bg-[#f8f8f8] min-h-[5.125rem] h-full text-center min-w-[10.938rem] w-full">
					<div class="mb-[0.313rem] flex justify-center items-center"><IconClean /></div>
					<p class="text-xs font-bold text-nowrap">We collect and clean items</p>
					<h1 class="text-[0.625rem] leading-[0.875rem]">After cleaning, you <br> will receive an </h1>
				</div>
				<div class=" block p-2.5 rounded-[0.313rem] bg-[#f8f8f8] min-h-[5.125rem] h-full text-center min-w-[8.313rem] w-full">
					<div class="mb-[0.313rem] flex justify-center items-center"><IconDeliver /></div>
					<p class="text-xs font-bold">We deliver</p>
					<h1 class="text-[0.625rem] leading-[0.875rem]">After cleaning, you will receive an </h1>
				</div>
			</div> -->
		</div>
		<div class="flex items-center justify-between w-full rounded-[0.625rem] border-[0.032rem] border-[#f2f2f2] ">
			<img src="https://ik.imagekit.io/choreless/V3/label.svg" alt="choreless label">
			<div class="p-[15px] flex flex-col items-start gap-[6px] max-w-[329px] w-full self-stretch">
				<h1 class="text-sm leading-[18px] font-bold">Label your laundry to avoid mix-ups.</h1>
				<p class="text-sm leading-[18px]">Load label: Tillman + CF2A</p>
			</div>
		</div>
		<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold " @click="next_step">Continue</button>
	</div>

	<div v-if="current_Screen==='pricing'" class=" max-w-[32.938rem] mx-auto flex flex-col items-start gap-5 p-[1.875rem] rounded-[1.25rem] bg-white border-[#f2f2f2] ">
		<div class="text-2xl font-bold leading-7 text-brand-black flex  items-center gap-2.5"> <div class="w-[2.563rem] h-[2.563rem] bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="update_screen('select_services')"><img class="w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow"></div><div> Pricing</div> </div>
		<div class="flex px-[30px] justify-center items-start content-start gap-2.5 self-stretch flex-wrap">
			<div :class="selected_item==-1 ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="w-fit px-2.5 py-[0.313rem] flex flex-wrap justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer" @click="selected_pricing='', selected_item=-1"><IconTick v-if="selected_item==-1" /> All</div>
			<div v-for="(item,index) in pricing_info" :key="index">
				<div :class="selected_item==index ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="w-fit   px-2.5 py-[0.313rem] flex justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer" @click="selected_pricing=item.heading,selected_item=index"><IconTick v-if="selected_item==index" />{{ item.heading }}</div>
			</div>
		</div>
		<div class="w-full max-h-[405px] overflow-y-scroll custom-scroll px-10">
			<div v-for="(item,index) in filtered_data" :key="index" class="flex flex-col gap-2.5 items-start self-stretch">
				<h1 class="text-xl leading-6 font-bold">{{ item.heading }}</h1>
				<div v-for="(sub_item,subIndex) in item.items" :key="subIndex" :class="item.legnth > 0 ? 'last:border-none':''" class="  border-b-[1px] border-brand-black/5 pb-2.5 flex justify-between w-full items-center text-xs sm:text-sm ">
					<div class="text-sm leading-5 ">{{ sub_item.title }}</div>
					<div class="text-sm leading-5 "> <span v-if="sub_item.from_price !== null"> ${{ sub_item.from_price }} - </span> ${{ sub_item.to_price }} / unit</div>
				</div>
			</div>
		</div>
		<div class="px-[13.5px] w-full mx-auto">
			<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold  " @click="next_step">Got it</button>
		</div>
	<!-- <div class=" text-center  absolute top-0 sm:relative sm:modal-box sm:max-w-[31.313rem] w-full flex flex-col gap-2.5 sm:gap-[1.875rem] !p-0 !pb-5  !rounded-[0.313rem] ">
			<div class="px-4 sm:px-5 pt-6 pb-1 flex justify-center relative ">
				<div class=" text-center text-base sm:text-xl leading-6 font-medium text-black">
					{{ book.optional_item.wash_type }} prices
				</div>
				<div class="absolute right-5 bg-white w-[1.375] h-[1.375] flex justify-center items-center rounded-full" @click="book.pricing_modal=false,book.extra_service=!book.extra_service">
					<div class=" w-[0.469rem] h-[0.469rem] mr-1 "><IconClose2 /></div>
				</div>
			</div>
			<div class=" min-h-[31.25rem] sm:min-h-max sm:h-[31.25rem] no-scrollbar flex flex-col gap-5 !p-0 !pb-5">
				<div class=" px-4 sm:px-[1.875rem] flex flex-wrap justify-center items-center gap-2.5 self-stretch">
					<div :class="selected_item==-1 ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="min-w-[3.438rem] text-sm sm:text-base w-fit px-2.5 py-[0.313rem] flex flex-wrap justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer" @click="selected_pricing='', selected_item=-1"><IconTick v-if="selected_item==-1" /> All</div>
					<div v-for="(item,index) in pricing_info" :key="index">
						<div :class="selected_item==index ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="w-fit text-sm sm:text-base  px-2.5 py-[0.313rem] flex justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer" @click="selected_pricing=item.heading,selected_item=index"><IconTick v-if="selected_item==index" />{{ item.heading }}</div>
					</div>
				</div>
				<div v-for="(item,index) in filtered_data" :key="index" class="px-4 sm:px-10 ">
					<div class="text-base sm:text-xl leading-6 font-bold mb-2.5 text-start sm:text-center">{{ item.heading }}</div>
					<div v-for="(sub_item,subIndex) in item.items" :key="subIndex" :class="item.legnth > 0 ? 'last:border-none':''" class=" py-2.5 border-b-[1px] border-[#0000000d] flex justify-between items-center text-xs sm:text-sm ">
						<div>{{ sub_item.title }}</div>
						<div> <span v-if="sub_item.from_price !== null"> ${{ sub_item.from_price }} - </span> ${{ sub_item.to_price }} / unit</div>
					</div>
				</div>
			</div>

			<div class=" cursor-pointer text-center px-5 py-[1.125rem] bg-brand-orange font-medium sm:font-bold text-white mx-[1.875rem] rounded-[0.313rem]" @click="book.pricing_modal=false,book.extra_service=!book.extra_service">Got it</div>
		</div> -->
	</div>
	<div v-if="current_Screen==='preferences'">
		<div class=" max-w-[32.938rem] mx-auto flex flex-col items-start gap-5 p-[1.875rem] rounded-[1.25rem] bg-white border-[#f2f2f2] ">
			<div class=" text-2xl font-bold leading-7 text-brand-black flex  items-center gap-2.5"> <div class="w-[2.563rem] h-[2.563rem] bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="update_screen('select_services')"><img class="w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow"></div><div> Wash & Fold Preferences </div> </div>
			<div class="flex justify-between items-start w-[447px]">
				<div class=" relative cursor-pointer rounded-[5px] border-[0.5px] hover:border-[1px] hover:border-brand-black border-[#6f6e7433] bg-white flex w-[215px] py-[15px] px-2.5 flex-col justify-center gap-[5px] text-brand-black items-center">
					<label class="absolute top-0 right-0 flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
						<input
							id="html" name="type"
							type="radio"
							class="before:content[''] peer relative h-5 w-5 checked:bg-black cursor-pointer appearance-none rounded-full border border-brand-black/20  transition-all "
							checked
						>
						<span
							class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 "
						>
							<img src="https://ik.imagekit.io/choreless/V3/icons/tick.svg" alt="choreless tick">
						</span>
					</label>
					<img src="https://ik.imagekit.io/choreless/V3/icons/Mixed.svg" alt="choreless mixed wash">
					<h1 class="font-bold text-brand-black">Mixed Wash</h1>
					<div class="px-2.5 bg-[#d4e8e6] rounded-[11px]  text-[10px] leading-4 font-medium ">$1.80 / lb</div>
					<div class="text-[10px] font-medium leading-4 text-brand-black ">$35.00 minimum</div>
				</div>
				<div class=" relative cursor-pointer rounded-[5px] border-[0.5px] hover:border-[1px] hover:border-brand-black border-[#6f6e7433] bg-white flex w-[215px] py-[15px] px-2.5 flex-col justify-center gap-[5px] text-brand-black items-center">
					<label class="absolute top-0 right-0 flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
						<input
							id="html" name="type"
							type="radio"
							class="before:content[''] peer relative h-5 w-5 checked:bg-black cursor-pointer appearance-none rounded-full border border-brand-black/20  transition-all "
						>
						<span
							class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 "
						>
							<img src="https://ik.imagekit.io/choreless/V3/icons/tick.svg" alt="choreless tick">
						</span>
					</label>
					<img src="https://ik.imagekit.io/choreless/V3/icons/Seperate.svg" alt="choreless mixed wash">
					<h1 class="font-bold text-brand-black">Seperate Wash</h1>
					<div class="px-2.5 bg-[#d4e8e6] rounded-[11px]  text-[10px] leading-4 font-medium ">$2.25 / lb</div>
					<div class="text-[10px] font-medium leading-4 text-brand-black ">$45.00 minimum</div>
				</div>
			</div>
			<div class="rounded-[5px] flex justify-between items-center bg-[#f2f1ec] px-5 py-2.5 w-full">
				<div class="flex flex-col gap-[3px] text-brand-black w-[319px]">
					<div class="leading-5 font-bold  ">Next day delivery</div>
					<div class="text-sm leading-[18px] ">
						Standard processing: 2 days. For next-day delivery, Toggle the button. <span class="text-[10px] leading-[18px]"> (additional fees apply).</span>
					</div>
				</div>
				<div>
					<SwitchButton />
				</div>
			</div>

			<div class="collapse  rounded-[5px]  ">
				<input v-model="collapsed" type="checkbox">
				<div class="collapse-title text-sm sm:text-base  flex justify-between items-center py-[0.75rem] px-5 font-medium border-[1px] border-[#e5e5e5] bg-white rounded-[5px]">
					{{ book.detergent.value ?? 'Choose a detergent' }}
					<Icon class="text-[32px] leading-6 !font-normal" :name="!collapsed ? 'material-symbols:add-rounded' : 'ic:sharp-minus'" />
				</div>
				<div :class="collapsed? ' mt-2.5 pt-2.5' : ''" class="collapse-content bg-white border !border-brand-black/15 rounded-md  px-5">
					<label v-for="v of customer.detergents" :key="v.value">
						<input v-model="book.detergent.value" type="radio" :value="v.value" class="hidden" @click="collapsed=!collapsed">
						<div class="flex  cursor-pointer ">
							<span :class="v.value == 'Customer Provided' ? 'border-0 pt-2.5': 'border-b-[0.032rem]  border-[#01163126] py-2.5' " class="  w-full "><p>{{ v.value }} <span v-if="v.isPopular" class="pl-5 text-xs text-[#01163180]/50 items-center">(Most popular choice)</span></p><p class=" text-[#01163180]/50">{{ v.description }}</p></span> </div>
					</label>
				</div>
			</div>
			<div class="flex px-5 py-2.5 justify-between items-start rounded-[5px] border-[0.5px] border-[#6f6e7433] w-full ">
				<div class="flex flex-col items-start gap-2.5">
					<div class="font-bold">Care Preferences</div>
					<div class="flex flex-col items-start gap-2.5 ">
						<div class="font-medium leading-5">
							Water Temp:
							<span class="text-sm font-normal">

								Cold
							</span>
						</div>
						<div class="font-medium leading-5">
							Dryer Temp:
							<span class="text-sm font-normal">
								Medium

							</span>
						</div>
						<div class="font-medium leading-5">
							On Hangers:
							<span class="text-sm font-normal">
								No

							</span>
						</div>
						<div class="font-medium leading-5">
							Mix Bags:

							<span class="text-sm font-normal">
								No

							</span>
						</div>
						<div class="font-medium leading-5">
							Preference Note:

							<span class="text-sm font-normal">
								--

							</span>
						</div>
					</div>
				</div>
				<div class="flex px-2.5 py-[2px] cursor-pointer justify-center items-center bg-brand-black rounded-[20px] text-white text-sm uppercase ">
					Edit
				</div>
			</div>
			<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold  " @click="next_step">Add service</button>
		</div>
	</div>
	<AddNoteModal :note="clicked_service.note" @update:note="update_note" />
</div>
<PricingModal />
</template>
<style scoped>

</style>
