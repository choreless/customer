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
	detergent: string;
	water_temp:string;
	dryer_temp:string;
	on_hangers:boolean;
	mix_bags:boolean;
	preference_note:string
}
// Defining Constants
const current_Screen=ref('select_services')
// const is_toggle=ref(false)
const selected_services=reactive([])
const book = usePageBook();
const pricing_info=book.pricing_info
const selected_pricing=ref('')
const selected_item=ref()
const collapsed= ref(false)
const next_day_delivery=ref(false)
const edit_preferences=ref(false)
const clicked_service=reactive<Service>({
	id: 0,
	wash_type: '',
	price: 0,
	per_lb: 0,
	note: '',
	service_speed: '',
	bags_count: 1,
	detergent: '',
	water_temp: '',
	dryer_temp: '',
	on_hangers: false,
	mix_bags: false,
	preference_note: ''
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
		tags: ['Normal Cycle', 'Cold Water', 'Tumble-Med'],
		is_selected: false

	},
	{
		id: 2,
		wash_type: 'Delicate Wash',
		price: 35,
		per_lb: 1.80,
		note: '',
		service_speed: '24h Service',
		bags_count: 1,
		tags: ['Gentle Cycle', 'Tumble-low', 'In a bag'],
		is_selected: false

	},
	{
		id: 3,
		wash_type: 'Home & Bedding',
		price: 10,
		note: '',
		service_speed: '72h Service',
		bags_count: 1,
		tags: ['Custom Cleaning'],
		is_selected: false

	}
])
const preferences=reactive([
	{
		heading: 'Water Temp',
		items: [
			{
				name: 'Cold',
				is_selected: true
			},
			{
				name: 'Warm',
				is_selected: false
			},
			{
				name: 'Hot',
				is_selected: false
			}
		]
	},
	{
		heading: 'Wash cycle',
		items: [

			{
				name: 'Gentle',
				is_selected: false
			},
			{
				name: 'Normal',
				is_selected: false
			},
			{
				name: 'Deep',
				is_selected: true
			}
		]
	},
	{
		heading: 'Dryer Temp',
		items: [

			{
				name: 'Low',
				is_selected: false
			},
			{
				name: 'Medium',
				is_selected: true
			},
			{
				name: 'High',
				is_selected: false
			}
		]
	}
])
const selected_Wash=ref('Mixed Wash')

const big_item = book.optional_item

// Defining functions

function select_preference(selected_item, index){
	preferences[index].items.forEach(sub_item=>{
		if(sub_item.name===selected_item.name){
			sub_item.is_selected=true
		}
		else{
			sub_item.is_selected=false
		}
	})
}

function add_service(screen : string, id : number){
	wash_services_data.forEach(service=>{
		if(service.id===id){
			service.is_selected=true
		}
	})
	selected_services.push(selected_item.value)
	console.log('selected_services', selected_services)
	current_Screen.value=screen
}
// function select_service(service:Service){
// 	clicked_service.value=service
// 	book.wash_type=clicked_service.value.wash_type
// 	book.service_speed=clicked_service.value.service_speed
// 	book.wash_is_required=false
// }
// function update_toggle_val(e:boolean){
// 	is_toggle.value=e
// 	if(is_toggle.value===true){
// 		clicked_service.value.service_speed='2_day'
// 		is_toggle.value=true
// 	}else if(is_toggle.value===false){
// 		clicked_service.value.service_speed='next_day'
// 		is_toggle.value=false
// 	}
// }

// function open_add_note(service: Service){
// 	clicked_service.value=service
// 	book.add_note_modal=!book.add_note_modal
// 	book.note=service.note
// }

function get_selected_Wash(){
	clicked_service.wash_type=selected_Wash.value
	clicked_service.detergent=book.detergent.value
	if(next_day_delivery){
		clicked_service.service_speed='48h service'
	}else{
		clicked_service.service_speed='24h service'
	}
	console.log(clicked_service)
}
// function update_note({ note }:{ note: string }){
// 	clicked_service.note=note;
// 	if(clicked_service.value.id === big_item.id){
// 		book.extra_service=true
// 	}
// }
// function next_step(){
// 	if(book.wash_type ===undefined){
// 		book.wash_is_required=true
// 	}
// 	else{
// 		book.wash_is_required=false
// 		book.step++
// 	}
// }

function update_screen(screen:string, index:number){
	current_Screen.value=screen
	selected_item.value=wash_services_data[index]
	console.log('selected', selected_item.value)
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
		<div v-for="(item,index) of wash_services_data" :key="index" :class="item.is_selected && 'border-brand-black border-[0.063rem]'" class=" relative px-[0.938rem] py-2.5 cursor-pointer rounded-[0.625rem] border-[0.032rem] border-[#f2f2f2] w-full flex flex-col gap-2.5">
			<div :class="item.is_selected && '!gap-2.5'" class="flex  items-center gap-5 self-stretch">
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
					<div v-if="item.wash_type != 'Home & Bedding'" class="text-[0.625rem] text-brand-black leading-4">
						Starting at
						<span class="font-medium">
							${{ item.price }} minimum
						</span>
						<span class="text-[0.5rem]">
							(${{ item.per_lb.toFixed(2) }}/lb)
						</span>
					</div>
					<div v-else class="flex items-center gap-[0.213rem] text-[0.625rem] text-brand-black leading-4">
						From
						<span class="font-medium">
							${{ item.price.toFixed(2) }}
						</span>
						<span class="text-[0.5rem]">Price per item</span>
					</div>
					<div class=" flex flex-col items-start self-stretch gap-[0.313rem]">
						<div class="flex justify-center items-center gap-2.5">
							<div v-for="(tag,subIndex) in item.tags" :key="subIndex" class="px-2.5  rounded-[1.25rem] bg-[#f2f2f2] text-[0.5rem]  leading-[0.875rem] uppercase text-brand-black">{{ tag }}</div>
						</div>
						<div class="text-xs text-brand-black">Convenient wash & fold laundry service for individuals couples. </div>
					</div>
				</div>
				<div class="flex flex-col justify-between items-end self-stretch pt-5">
					<div :class="item.is_selected ? 'flex px-2.5 py-[0.188rem] items-center gap-[0.438rem] rounded-[1.25rem] border-[0.063rem] border-brand-black bg-black text-white' : 'flex py-[0.188rem] px-[0.938rem] gap-2.5 rounded-[1.25rem] border-[0.063rem] border-brand-black' " class=" text-right text-sm font-medium" @click="update_screen('preferences', index)">
						<span v-if="item.is_selected">
							<img src="https://ik.imagekit.io/choreless/V3/icons/tick-mark.svg" alt="choreless tick">
						</span>
						{{ item.is_selected ? 'Added' : '+ Add' }}
					</div>
					<div v-if="!item.is_selected" class="text-xs font-medium text-right " @click="update_screen('pricing', index)">See pricing</div>
				</div>
			</div>
			<div v-if="item.is_selected">
				<div class="flex items-center justify-end w-full text-xs font-medium text-brand-black border-b-[0.063rem] pb-2.5 border-[#0000000d] cursor-pointer" @click="update_screen('add_note', index)">Add Note</div>
				<div class="flex px-2.5 justify-between items-center self-stretch pt-2.5">
					<div :class="item.bags_count > 1 && '!text-black'" class="text-[2.188rem] leading-5 text-[#838383] select-none" @click=" item.bags_count >1 && item.bags_count--">-</div>
					<div class="text-sm font-medium leading-5 text-brand-black"> <span class="mr-1"> {{ item.bags_count }} </span> Bags</div>
					<div class="text-[2.188rem] leading-5 text-brand-black select-none" @click="item.bags_count++">+</div>
				</div>
			</div>
		</div>
		<div class="flex items-center justify-between w-full rounded-[0.625rem] border-[0.032rem] border-[#f2f2f2] ">
			<img src="https://ik.imagekit.io/choreless/V3/label.svg" alt="choreless label">
			<div class="p-[0.938rem] flex flex-col items-start gap-[0.375rem] max-w-[20.563rem] w-full self-stretch">
				<h1 class="text-sm leading-[1.125rem] font-bold">Label your laundry to avoid mix-ups.</h1>
				<p class="text-sm leading-[1.125rem]">Load label: Tillman + CF2A</p>
			</div>
		</div>
		<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold " @click="next_step">Continue</button>
	</div>

	<div v-if="current_Screen==='pricing'" class=" max-w-[32.938rem] mx-auto flex flex-col items-start gap-5 p-[1.875rem] rounded-[1.25rem] bg-white border-[#f2f2f2] ">
		<div class="text-2xl font-bold leading-7 text-brand-black flex  items-center gap-2.5"> <div class="w-[2.563rem] h-[2.563rem] bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="update_screen('select_services', selected_item)"><img class="w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow"></div><div> Pricing</div> </div>
		<div class="flex px-[1.875rem] justify-center items-start content-start gap-2.5 self-stretch flex-wrap">
			<div :class="selected_item==-1 ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="w-fit px-2.5 py-[0.313rem] flex flex-wrap justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer" @click="selected_pricing='', selected_item=-1"><IconTick v-if="selected_item==-1" /> All</div>
			<div v-for="(item,index) in pricing_info" :key="index">
				<div :class="selected_item==index ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="w-fit   px-2.5 py-[0.313rem] flex justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer" @click="selected_pricing=item.heading,selected_item=index"><IconTick v-if="selected_item==index" />{{ item.heading }}</div>
			</div>
		</div>
		<div class="w-full max-h-[25.313rem] overflow-y-scroll custom-scroll px-10">
			<div v-for="(item,index) in filtered_data" :key="index" class="flex flex-col gap-2.5 items-start self-stretch">
				<h1 class="text-xl leading-6 font-bold">{{ item.heading }}</h1>
				<div v-for="(sub_item,subIndex) in item.items" :key="subIndex" :class="item.legnth > 0 ? 'last:border-none':''" class="  border-b-[0.063rem] border-brand-black/5 pb-2.5 flex justify-between w-full items-center text-xs sm:text-sm ">
					<div class="text-sm leading-5 ">{{ sub_item.title }}</div>
					<div class="text-sm leading-5 "> <span v-if="sub_item.from_price !== null"> ${{ sub_item.from_price }} - </span> ${{ sub_item.to_price }} / unit</div>
				</div>
			</div>
		</div>
		<div class="px-[0.844rem] w-full mx-auto">
			<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold  " @click="next_step">Got it</button>
		</div>
	</div>
	<div v-if="current_Screen==='preferences'">
		<div class=" max-w-[32.938rem] mx-auto flex flex-col items-start gap-5 p-[1.875rem] rounded-[1.25rem] bg-white border-[#f2f2f2] ">
			<div class=" text-2xl font-bold leading-7 text-brand-black flex  items-center gap-2.5"> <div class="w-[2.563rem] h-[2.563rem] bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="update_screen('select_services', selected_item), edit_preferences=false"><img class="w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow"></div><div> {{ selected_item.wash_type }} Preferences </div> </div>
			<div class="flex justify-between items-start w-[27.938rem]">
				<div :class="selected_Wash === 'Mixed Wash' && 'border-brand-black'" class=" relative cursor-pointer rounded-[0.313rem] border-[0.031rem] hover:border-[0.063rem] border-[#6f6e7433] bg-white flex w-[13.438rem] py-[0.938rem] px-2.5 flex-col justify-center gap-[0.313rem] text-brand-black items-center">
					<label class="absolute top-0 right-0 flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
						<input
							id="html" v-model="selected_Wash"
							name="service"
							type="radio"
							class="before:content[''] peer relative h-5 w-5 checked:bg-black cursor-pointer appearance-none rounded-full border border-brand-black/20  transition-all "
							checked
							:value="'Mixed Wash'"
							@change="get_selected_Wash"
						>
						<span
							class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 "
						>
							<img src="https://ik.imagekit.io/choreless/V3/icons/tick.svg" alt="choreless tick">
						</span>
					</label>
					<img src="https://ik.imagekit.io/choreless/V3/icons/Mixed.svg" alt="choreless mixed wash">
					<h1 class="font-bold text-brand-black">Mixed Wash</h1>
					<div class="px-2.5 bg-[#d4e8e6] rounded-[0.688rem]  text-[0.625rem] leading-4 font-medium ">$1.80 / lb</div>
					<div class="text-[0.625rem] font-medium leading-4 text-brand-black ">$35.00 minimum</div>
				</div>
				<div :class="selected_Wash === 'Seperate Wash' && 'border-brand-black'" class=" relative cursor-pointer rounded-[0.313rem] border-[0.031rem] hover:border-[0.063rem] border-[#6f6e7433] bg-white flex w-[13.438rem] py-[0.938rem] px-2.5 flex-col justify-center gap-[0.313rem] text-brand-black items-center">
					<label class="absolute top-0 right-0 flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
						<input
							id="html" v-model="selected_Wash"
							name="service"
							type="radio"
							:value="'Seperate Wash'"
							class="before:content[''] peer relative h-5 w-5 checked:bg-black cursor-pointer appearance-none rounded-full border border-brand-black/20  transition-all "
							@change="get_selected_Wash"
						>
						<span
							class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 "
						>
							<img src="https://ik.imagekit.io/choreless/V3/icons/tick.svg" alt="choreless tick">
						</span>
					</label>
					<img src="https://ik.imagekit.io/choreless/V3/icons/Seperate.svg" alt="choreless mixed wash">
					<h1 class="font-bold text-brand-black">Seperate Wash</h1>
					<div class="px-2.5 bg-[#d4e8e6] rounded-[0.688rem]  text-[0.625rem] leading-4 font-medium ">$2.25 / lb</div>
					<div class="text-[0.625rem] font-medium leading-4 text-brand-black ">$45.00 minimum</div>
				</div>
			</div>
			<div class="rounded-[0.313rem] flex justify-between items-center bg-[#f2f1ec] px-5 py-2.5 w-full">
				<div class="flex flex-col gap-[0.188rem] text-brand-black w-[19.938rem]">
					<div class="leading-5 font-bold  ">Next day delivery</div>
					<div class="text-sm leading-[1.125rem] ">
						Standard processing: 2 days. For next-day delivery, Toggle the button. <span class="text-[0.625rem] leading-[1.125rem]"> (additional fees apply).</span>
					</div>
				</div>
				<div>
					<SwitchButton @update:is_toggle="(active)=>next_day_delivery=active" />
				</div>
			</div>

			<div class="collapse  rounded-[0.313rem]  ">
				<input v-model="collapsed" type="checkbox">
				<div class="collapse-title text-sm sm:text-base  flex justify-between items-center py-[0.75rem] px-5 font-medium border-[0.063rem] border-[#e5e5e5] bg-white rounded-[0.313rem]">
					{{ book.detergent.value ?? 'Choose a detergent' }}
					<Icon class="text-[2rem] leading-6 !font-normal" :name="!collapsed ? 'material-symbols:add-rounded' : 'ic:sharp-minus'" />
				</div>
				<div :class="collapsed? ' mt-2.5 pt-2.5' : ''" class="collapse-content bg-white border !border-brand-black/15 rounded-md  px-5">
					<label v-for="v of customer.detergents" :key="v.value">
						<input v-model="book.detergent.value" type="radio" :value="v.value" class="hidden" @click="collapsed=!collapsed">
						<div class="flex  cursor-pointer ">
							<span :class="v.value == 'Customer Provided' ? 'border-0 pt-2.5': 'border-b-[0.032rem]  border-[#01163126] py-2.5' " class="  w-full "><p>{{ v.value }} <span v-if="v.isPopular" class="pl-5 text-xs text-[#01163180]/50 items-center">(Most popular choice)</span></p><p class=" text-[#01163180]/50">{{ v.description }}</p></span> </div>
					</label>
				</div>
			</div>
			<div v-if="!edit_preferences" class="flex px-5 py-2.5 justify-between items-start rounded-[0.313rem] border-[0.031rem] border-[#6f6e7433] w-full ">
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
						<div v-for="(item,index) in book.care_services" :key="index" class="flex flex-col items-start gap-2.5 ">
							<div class="font-medium leading-5">
								{{ item.value }}:
								<span class="text-sm font-normal">
									{{ item.is_active ? "Yes" : "No" }}

								</span>
							</div>
						</div>
						<div class="font-medium leading-5">
							Preference Note:

							<span class="text-sm font-normal">
								--

							</span>
						</div>
					</div>
				</div>
				<div class="flex px-2.5 py-[0.125rem] cursor-pointer justify-center items-center bg-brand-black rounded-[1.25rem] text-white text-sm uppercase " @click="edit_preferences=!edit_preferences">
					Edit
				</div>
			</div>
			<div v-else class="flex w-full flex-col items-start gap-5">
				<div class="font-bold text-brand-black">Care Preferences</div>
				<div v-for="(item,index) in preferences" :key="index" class="flex flex-col items-start self-stretch gap-2.5">
					<div class="capitalize leading-5 font-bold">{{ item.heading }}</div>
					<div class="flex items-start gap-2.5 w-full ">
						<div v-for="(sub_item,sub_index) in item.items" :key="sub_index" :class="sub_item.is_selected && '!bg-brand-black text-white' " class="px-5 py-[0.875rem] flex-1 text-center cursor-pointer bg-white rounded-[0.313rem]  font-medium text-brand-black border-[0.063rem] border-[#6f6e7433] " @click="select_preference(sub_item,index)">{{ sub_item.name }}</div>
					</div>
				</div>
				<div v-for="(item,index) in book.care_services" :key="index" class="  flex items-center w-full border-brand-black/20 border rounded-lg justify-between px-5 py-[0.875rem]">
					<p class=" text-sm sm:text-base font-medium ">{{ item.value }}</p>
					<SwitchButton @update:is_toggle="(active)=>item.is_active=active " />
				</div>
				<div class="w-full">
					<div class="mb-2.5 flex justify-between items-center">
						<p class="text-brand-black  leading-5 font-bold ">Preferences Note</p>
						<p class=" leading-[0.938rem] font-medium cursor-pointer " @click="book.preference_note=''">Clear</p>
					</div>
					<textarea v-model="book.preference_note" rows="3" class=" w-full flex px-5 pt-2.5 pb-[0.938rem] items-start gap-2.5 self-stretch placeholder:text-[#e5e5e5] outline-none rounded-[0.313rem] border-[0.063rem] border-[#6f6e7433] " placeholder="Care preferences " />
				</div>
			</div>
			<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold  " @click="add_service('select_services', selected_item?.id)">Add service</button>
		</div>
	</div>
	<div v-if="current_Screen==='add_note'" class=" max-w-[32.938rem] mx-auto flex flex-col items-start gap-2.5 p-[1.875rem] rounded-[1.25rem] bg-white border-[#f2f2f2] ">
		<div class=" px-5 text-2xl font-bold leading-7 text-brand-black flex  items-center gap-2.5"> <div class="w-[2.563rem] h-[2.563rem] bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="update_screen('select_services', selected_item)"><img class="w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow"></div><div>Add Note</div> </div>
		<div class="flex justify-between w-full items-center self-center">
			<p class="text-brand-black  leading-6 ">Add Special instructions</p>
			<p class=" leading-[0.938rem] font-medium cursor-pointer" @click="selected_item.note=''">Clear</p>
		</div>
		<textarea v-model="selected_item.note" rows="3" class=" w-full flex px-5 pt-2.5 pb-[0.938rem] items-start gap-2.5 self-stretch placeholder:text-[#e5e5e5] outline-none rounded-[0.313rem] border-[0.063rem] border-[#6f6e7433] " placeholder="Add Note " />
		<div class="flex max-w-[467px] h-12 px-5 py-[18px] justify-center items-center gap-2.5 rounded-[50px] bg-[#f8f8f8] font-bold leading-6 w-full " :class="selected_item.note && 'bg-brand-black text-white'">Save</div>
	</div>
	<!-- <AddNoteModal :note="clicked_service.note" @update:note="update_note" /> -->
</div>
<!-- <PricingModal /> -->
</template>
<style scoped>

</style>
