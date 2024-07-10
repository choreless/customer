<script setup lang="ts">
import SwitchButton from '../buttons/SwitchBtn.vue';
import customer from '~/lib/customer';
import PickupDate from './PickupDate.vue';
import formatISO from 'date-fns/formatISO';
interface SubItem {
    name: string;
    is_selected: boolean;
}
// Defining Constants
const book = usePageBook();
const selected_pricing=ref('')
const selected_item=ref()
const collapsed= ref(false)
const edit_preferences=ref(false)
// Defining functions

function selectPreference(selected_item: object , index: number){
	book.preferences[index].items.forEach((sub_item: SubItem)=>{
		if(sub_item.name===selected_item.name){
			sub_item.is_selected=true
		}
		else{
			sub_item.is_selected=false
		}
	})
}

function addService(screen : string, id : number){

	book.current_Screen=screen
	const findSelectedItem = (heading:string) => book.preferences.find((preference) => preference.heading === heading)?.items.find((item) => item.is_selected);
	const selected_water_temp = findSelectedItem('Water Temp');
	const selected_wash_cycle = findSelectedItem('Wash cycle');
	const selected_dryer_temp = findSelectedItem('Dryer Temp');
	selected_item.value = {
		...selected_item.value,
		water_temp: selected_water_temp?.name || '',
		wash_cycle: selected_wash_cycle?.name || '',
		dryer_temp: selected_dryer_temp?.name || '',
	};
	const existingServiceIndex = book.selected_services.findIndex((service:any) => service?.id === selected_item.value.id);
    if (existingServiceIndex !== -1) {
        book.selected_services[existingServiceIndex] = selected_item.value;
    } else {
        book.selected_services.push(selected_item.value);
    }
	
	book.wash_services_data[book.selected_item_index] = selected_item.value
	book.wash_services_data[book.selected_item_index].is_selected=true
}
function removeService(screen : string, id : number){
	const initial_service_val=reactive({
	  		id: book.wash_services_data[book.selected_item_index].id,
	  		service_name: book.wash_services_data[book.selected_item_index].service_name,
	  		wash_type: 'Mixed wash',
	  		price: book.wash_services_data[book.selected_item_index].price,
	  		per_lb: book.wash_services_data[book.selected_item_index].per_lb,
	  		note: '',
	  		service_speed: false,
	  		bags_count: 1,
	  		tags: book.wash_services_data[book.selected_item_index].tags,
	  		is_selected: false,
	  		detergent: '',
	  		water_temp: 'Cold',
	  		dryer_temp: 'Medium',
	  		wash_cycle: 'Deep',
	  		on_hangers: false,
	  		mix_bags: false,
	  		preferences_note: '',
	  		scheduled_delivery: new Date()
	  	})
	book.current_Screen=screen
	const index = book.selected_services.findIndex(item => item.id==id)
	book.wash_services_data[book.selected_item_index].is_selected = false
	book.selected_services.splice(index,1)
	book.wash_services_data[book.selected_item_index] = initial_service_val
}
function updateScreen(screen:string, index:number) {
	book.selected_item_index = index
	book.current_Screen=screen;
	selected_item.value=book.wash_services_data[book.selected_item_index];
	edit_preferences.value=false;
	if(screen==='pricing' ) {
		selected_item.value=-1
		selected_pricing.value=''
	}
}

function nextStep(){
	book.step=1
	book.current_Screen='pickup_date'
}
const filtered_data:any = computed(() => {
	const updated_data=book.pricing_info.filter((item:any)=>item.heading.includes(selected_pricing.value))
	return updated_data;
})

watch(() => book.step, (val:number) => {
	if(val===0){
		book.current_Screen='select_services'
	}
})

</script>
<template>
<div :class="book.info_toggle ? 'hidden sm:block ' : 'block' " class="sm:px-[0.938rem] sm:py-[3.125rem] px-[0.469rem] py-5   ">
	<!-- Select service screen -->
	<div v-if="book.current_Screen==='select_services'" class=" max-w-[32.938rem] mx-auto flex flex-col items-start sm:gap-5 gap-2.5 sm:p-[1.875rem] p-2.5 sm:rounded-[1.25rem] rounded-[0.625rem] bg-white border-[#f2f2f2] ">
		<h1 class="sm:text-2xl font-bold sm:leading-7 text-base leading-5 text-brand-black sm:mb-0 mb-2.5">How can we help you? </h1>
		<div v-for="(item,index) of book.wash_services_data" :key="index" :class="item.is_selected && 'border-brand-black border-[0.063rem]'" class=" relative px-[0.938rem] py-2.5 rounded-[0.625rem] border-[0.032rem] border-[#f2f2f2] w-full flex flex-col gap-2.5">
			<div :class="item.is_selected && '!gap-2.5'" class="flex  items-center gap-5 self-stretch justify-between">
				<div class="flex gap-2.5 max-w-[21.75rem] w-full flex-col items-start">
					<div class="flex gap-[0.563rem] sm:items-center items-start">
						<img v-if="item.service_name==='Wash & Fold'" src="https://ik.imagekit.io/choreless/V3/icons/shirt.svg" alt="choreless icon">
						<img v-if="item.service_name==='Delicate Wash'" src="https://ik.imagekit.io/choreless/V3/icons/bucket.svg" alt="choreless icon">
						<img v-if="item.service_name==='Home & Bedding'" src="https://ik.imagekit.io/choreless/V3/icons/bedding.svg" alt="choreless icon">
						<div class="flex sm:gap-[0.563rem] gap-[0.313rem] items-center flex-wrap">
							<div class="sm:text-2xl text-xl leading-6 font-bold">{{ item.service_name }}</div>
							<div class="flex items-center gap-[0.313rem]">
								<img class="w-2.5 h-2.5" src="https://ik.imagekit.io/choreless/V3/icons/clock.svg" alt="choreless clock">
								<div class="text-brand-black text-xs font-medium leading-6">{{ !item.service_speed && item.service_name==='Home & Bedding' ? '72h service' : item.service_speed ? '48h service' : '24h service' }}</div>
							</div>
						</div>
					</div>
					<div v-if="item.service_name != 'Home & Bedding'" class="text-[0.625rem] text-brand-black leading-4">
						Starting at
						<span class="font-medium">
							${{ item.price }} minimum
						</span>
						<span class="text-[0.5rem]">
							(${{ item.per_lb?.toFixed(2) }}/lb)
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
						<div class="flex sm:justify-center justify-start items-center gap-2.5 flex-wrap">
							<div v-for="(tag,subIndex) in item.tags" :key="subIndex" class="px-2.5  rounded-[1.25rem] bg-[#f2f2f2] text-[0.5rem]  leading-[0.875rem] uppercase text-brand-black">{{ tag }}</div>
						</div>
						<div class="text-xs text-brand-black">Convenient wash & fold laundry service for individuals couples. </div>
					</div>
				</div>
				<div class="flex flex-col justify-between items-end self-stretch pt-5 cursor-pointer">
					<div :class="item.is_selected ? 'flex sm:px-2.5 px-2 py-[0.188rem] items-center  sm:gap-[0.438rem] gap-1 rounded-[1.25rem] border-[0.063rem] border-brand-black bg-black text-white' : 'flex py-[0.188rem] sm:px-[0.938rem] px-2 gap-2.5 rounded-[1.25rem] border-[0.063rem] border-brand-black' " class=" text-right sm:text-sm text-[0.813rem] leading-5 font-medium" @click="updateScreen('preferences', index)">
						<span v-if="item.is_selected">
							<img src="https://ik.imagekit.io/choreless/V3/icons/tick-mark.svg" alt="choreless tick">
						</span>
						<div class="whitespace-nowrap">
							{{ item.is_selected ? 'Added' : '+ Add' }}
						</div>
					</div>
					<div v-if="!item.is_selected" class="text-xs font-medium text-right whitespace-nowrap cursor-pointer " @click="updateScreen('pricing', index)">See pricing</div>
				</div>
			</div>
			<div v-if="item.is_selected">
				<div class="flex items-center justify-end w-full text-xs font-medium text-brand-black border-b-[0.063rem] pb-2.5 border-[#0000000d] cursor-pointer" @click="updateScreen('add_note', index)">Add Note</div>
				<div class="flex px-2.5 justify-between items-center self-stretch pt-2.5">
					<div :class="item.bags_count > 1 && '!text-black'" class="text-[1.563rem] sm:text-[2.188rem] leading-5 text-[#838383] select-none" @click=" item.bags_count >1 && item.bags_count--">-</div>
					<div class="text-sm font-medium leading-5 text-brand-black"> <span class="mr-1"> {{ item.bags_count }} </span> Bags</div>
					<div class="text-[1.563rem] sm:text-[2.188rem] leading-5 text-brand-black select-none" @click="item.bags_count++">+</div>
				</div>
			</div>
		</div>
		<div @click="book.info_toggle=true" class="flex items-center justify-between w-full cursor-pointer rounded-[0.625rem] border-[0.032rem] border-[#f2f2f2] sm:flex-nowrap flex-wrap sm:my-0 my-2.5 ">
			<img class="sm:block hidden" src="https://ik.imagekit.io/choreless/V3/label.svg" alt="choreless label">
			<img class="block sm:hidden w-full h-[5rem] object-cover object-top" src="https://ik.imagekit.io/choreless/V3/label-2.svg" alt="choreless label">
			<div class="p-[0.938rem] flex flex-col items-start gap-[0.375rem] max-w-[20.563rem] w-full self-stretch">
				<h1 class="text-sm leading-[1.125rem] font-bold">Label your laundry to avoid mix-ups.</h1>
				<p class="text-sm leading-[1.125rem]">Load label: Tillman + CF2A</p>
			</div>
		</div>
		<button :disabled="book.selected_services.length===0"  @click="nextStep()" class="disabled:bg-[#f8f8f8] disabled:text-brand-black hidden sm:flex bg-brand-black px-5 py-[1.125rem] w-full justify-center items-center rounded-[3.125rem] text-white font-bold " >Continue</button>
	</div>
	<!-- Pricing screen -->
	<div v-if="book.current_Screen==='pricing'" class=" sm:max-w-[32.938rem] w-full absolute top-0 left-0 sm:z-0 z-50 sm:relative mx-auto flex flex-col items-start gap-5 sm:p-[1.875rem] pb-2.5 sm:rounded-[1.25rem] bg-white border-[#f2f2f2] sm:min-h-full min-h-screen ">
		<div class="sm:text-2xl font-bold sm:leading-7 text-base leading-5 text-brand-black flex  items-center gap-2.5 sm:p-0 p-2.5"> 
			<div class="sm:w-[2.563rem] sm:h-[2.563rem] w-5 h-5 bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="updateScreen('select_services', selected_item)">
			<img class=" hidden sm:block w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow">
			<img class=" block sm:hidden " src="https://ik.imagekit.io/choreless/V3/icons/arrow-2.svg" alt="arrow">
		</div>
		<div> Pricing</div> 
	</div>
		<div class="flex sm:px-[1.875rem] px-5 justify-center items-start content-start gap-2.5 self-stretch flex-wrap ">
			<div :class="selected_item==-1 ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="w-fit px-2.5 py-[0.313rem] flex flex-wrap justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer sm:text-base text-sm leading-[1.125rem]" @click="selected_pricing='', selected_item=-1"><img v-if="selected_item==-1" src="https://ik.imagekit.io/choreless/V3/icons/right-tick.svg" alt="choreless tick" />All</div>
			<div v-for="(item,index) in book.pricing_info" :key="index">
				<div :class="selected_item==index ? 'bg-black text-white' :'bg-[#f2f2f2] text-black'" class="w-fit   px-2.5 py-[0.313rem] flex justify-center items-center rounded-[1.25rem] gap-[0.313rem] transition-all duration-150 ease-linear cursor-pointer sm:text-base text-sm leading-[1.125rem]" @click="selected_pricing=item.heading,selected_item=index"><img v-if="selected_item==index" src="https://ik.imagekit.io/choreless/V3/icons/right-tick.svg" alt="choreless tick" />{{ item.heading }}</div>
			</div>
		</div>
		<div class="w-full max-h-[25.313rem] overflow-y-scroll !custom-scroll sm:px-10 px-4">
			<div v-for="(item,index) in filtered_data" :key="index" class="flex flex-col gap-2.5 items-start self-stretch">
				<h1 class="sm:text-xl text-base sm:leading-6 leading-5 font-bold">{{ item.heading }}</h1>
				<div v-for="(sub_item,sub_index) in item.items" :key="sub_index" class="border-b-[0.063rem] border-brand-black/5 pb-2.5 flex justify-between w-full items-center text-xs sm:text-sm ">
					<div class="sm:text-sm sm:leading-5 text-xs leading-4 ">{{ sub_item.title }}</div>
					<div class="sm:text-sm sm:leading-5 text-xs leading-4 "> <span v-if="sub_item.from_price !== null"> ${{ sub_item.from_price }} - </span> ${{ sub_item.to_price }} / unit</div>
				</div>
			</div>
		</div>
		<div class="sm:px-[0.844rem] px-5 w-full mx-auto">
			<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold"  @click="updateScreen('select_services', -1)">Got it</button>
		</div>
	</div>
	<!-- Preferences screen -->
	<div v-if="book.current_Screen==='preferences'">
		<div class="sm:max-w-[32.938rem] w-full absolute top-0 left-0 sm:z-0 z-50 sm:relative mx-auto flex flex-col items-start gap-5  px-2.5 py-5 sm:p-[1.875rem] sm:rounded-[1.25rem] bg-white border-[#f2f2f2] sm:min-h-full min-h-screen ">
			<div class="sm:text-2xl font-bold sm:leading-7 text-base leading-5 text-brand-black flex  items-center gap-2.5 sm:p-0 p-2.5"> 
				<div class="sm:w-[2.563rem] sm:h-[2.563rem] w-5 h-5 bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="updateScreen('select_services', selected_item), edit_preferences=false">
					<img class=" hidden sm:block w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow">
					<img class=" block sm:hidden " src="https://ik.imagekit.io/choreless/V3/icons/arrow-2.svg" alt="arrow">
				</div>
				<div> {{ book.wash_services_data[book.selected_item_index]?.service_name }} Preferences </div> 
			</div>
			<div class="flex justify-between items-start w-full ">
				<div :class="book.wash_services_data[book.selected_item_index].wash_type === 'Mixed Wash' && 'border-brand-black'" class=" w-[8.75rem] relative cursor-pointer rounded-[0.313rem] border-[0.031rem] hover:border-[0.063rem] border-[#6f6e7433] bg-white flex sm:w-[13.438rem] sm:py-[0.938rem] py-[0.938rem] sm:px-2.5 px-0 flex-col justify-center gap-[0.313rem] text-brand-black items-center">
					<label class="absolute top-0 right-0 flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
						<input
							id="mixed-wash"
          					v-model="book.wash_services_data[book.selected_item_index].wash_type"
							name="service"
							type="radio"
							class="before:content[''] peer relative sm:h-5 sm:w-5 w-[1.063rem] h-[1.063rem] checked:bg-black cursor-pointer appearance-none rounded-full border border-brand-black/20  transition-all "
							checked
							value="Mixed Wash"
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
				<div :class="book.wash_services_data[book.selected_item_index].wash_type === 'Seperate Wash' && 'border-brand-black'" class="w-[8.75rem] relative cursor-pointer rounded-[0.313rem] border-[0.031rem] hover:border-[0.063rem] border-[#6f6e7433] bg-white flex sm:w-[13.438rem] sm:py-[0.938rem] py-[0.938rem] sm:px-2.5 px-0 flex-col justify-center gap-[0.313rem] text-brand-black items-center">
					<label class="absolute top-0 right-0 flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
						<input
							id="seperate-wash"
          					v-model="book.wash_services_data[book.selected_item_index].wash_type"
							name="service"
							type="radio"
							value="Seperate Wash"
							class="before:content[''] peer relative sm:h-5 sm:w-5 w-[1.063rem] h-[1.063rem] checked:bg-black cursor-pointer appearance-none rounded-full border border-brand-black/20  transition-all "
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
			<div v-if="book.wash_services_data[book.selected_item_index].service_name!='Home & Bedding'" class="rounded-[0.313rem] flex justify-between items-center bg-[#f2f1ec] px-5 py-2.5 w-full">
				<div class="flex flex-col gap-[0.188rem] text-brand-black w-[19.938rem]">
					<div class="leading-5 font-bold ">Next day delivery</div>
					<div class="text-sm leading-[1.125rem] ">
						Standard processing: 2 days. For next-day delivery, Toggle the button. <span class="text-[0.625rem] leading-[1.125rem]"> (additional fees apply).</span>
					</div>
				</div>
				<div>
					<SwitchButton v-model:service="book.wash_services_data[book.selected_item_index].service_speed" />
				</div>
			</div>
			<div class="collapse rounded-[0.313rem]  ">
				<input v-model="collapsed" type="checkbox">
				<div class="collapse-title text-sm sm:text-base flex justify-between items-center py-[0.75rem] px-5 font-medium border-[0.063rem] border-[#e5e5e5] bg-white rounded-[0.313rem]">
					{{ book.wash_services_data[book.selected_item_index].detergent ? book.wash_services_data[book.selected_item_index].detergent : 'Choose a detergent' }}
					<Icon class="text-[2rem] leading-6 !font-normal" :name="!collapsed ? 'material-symbols:add-rounded' : 'ic:sharp-minus'" />
				</div>
				<div :class="collapsed? ' mt-2.5 pt-2.5' : ''" class="collapse-content bg-white border !border-brand-black/15 rounded-md  px-5">
					<label v-for="v of customer.detergents" :key="v.value">
						<input v-model="book.wash_services_data[book.selected_item_index].detergent" type="radio" :value="v.value" class="hidden" @click="collapsed=!collapsed">
						<div class="flex  cursor-pointer ">
							<span :class="v.value == 'Customer Provided' ? 'border-0 pt-2.5': 'border-b-[0.032rem]  border-[#01163126] py-2.5' " class="  w-full "><p>{{ v.value }} <span v-if="v.isPopular" class="pl-5 text-xs text-[#01163180]/50 items-center">(Most popular choice)</span></p><p class=" text-[#01163180]/50">{{ v.description }}</p></span> </div>
					</label>
				</div>
			</div>
			<div v-if="!edit_preferences" class="flex px-5 py-2.5 justify-between items-start rounded-[0.313rem] border-[0.031rem] border-[#6f6e7433] w-full ">
				<div class="flex flex-col items-start gap-2.5">
					<div class="font-bold">Care Preferences</div>
					<div class="flex flex-col items-start gap-2.5">
						<div class="font-medium leading-5">
							Water Temp:
							<span class="text-sm font-normal">

								{{book.wash_services_data[book.selected_item_index].water_temp}}
							</span>
						</div>
						<div class="font-medium leading-5">
							Dryer Temp:
							<span class="text-sm font-normal">
								{{book.wash_services_data[book.selected_item_index].dryer_temp}}

							</span>
						</div>
						<div class="flex flex-col items-start gap-2.5 ">
							<div class="font-medium leading-5">
								On Hangers
								<span class="text-sm font-normal">
									{{ book.wash_services_data[book.selected_item_index].on_hangers? "Yes" : "No" }}
								</span>
							</div>
							<div class="font-medium leading-5">
								Mix Bags
								<span class="text-sm font-normal">
									{{ book.wash_services_data[book.selected_item_index].mix_bags? "Yes" : "No" }}
								</span>
							</div>
						</div>
						<div class="font-medium leading-5">
							Preference Note:

							<span class="text-sm font-normal">
								{{book.wash_services_data[book.selected_item_index].preferences_note !='' ? book.wash_services_data[book.selected_item_index].preferences_note : '--'}}

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
				<div v-for="(item,index) in book.preferences" :key="index" class="flex flex-col items-start self-stretch gap-2.5">
					<div class="capitalize leading-5 font-bold">{{ item.heading }}</div>
					<div class="flex items-start gap-2.5 w-full ">
						<div v-for="(sub_item,sub_index) in item.items" :key="sub_index" :class="sub_item.is_selected && '!bg-brand-black text-white' " class="px-5 py-[0.875rem] flex-1 text-center cursor-pointer bg-white rounded-[0.313rem]  font-medium text-brand-black border-[0.063rem] border-[#6f6e7433] " @click="selectPreference(sub_item,index)">{{ sub_item.name }}</div>
					</div>
				</div>
				<div class="  flex items-center w-full border-brand-black/20 border rounded-lg justify-between px-5 py-[0.875rem]">
					<p class=" text-sm sm:text-base font-medium ">On Hangers</p>
					<SwitchButton v-model:service="book.wash_services_data[book.selected_item_index].on_hangers" />
				</div>
				<div class="  flex items-center w-full border-brand-black/20 border rounded-lg justify-between px-5 py-[0.875rem]">
					<p class=" text-sm sm:text-base font-medium ">Mix Bags</p>
					<SwitchButton v-model:service="book.wash_services_data[book.selected_item_index].mix_bags" />
				</div>
				<div class="w-full">
					<div class="mb-2.5 flex justify-between items-center">
						<p class="text-brand-black  leading-5 font-bold ">Preferences Note</p>
						<p class=" leading-[0.938rem] font-medium cursor-pointer " @click="book.wash_services_data[book.selected_item_index].preferences_note=''">Clear</p>
					</div>
					<textarea v-model="book.wash_services_data[book.selected_item_index].preferences_note" rows="3" class=" w-full flex px-5 pt-2.5 pb-[0.938rem] items-start gap-2.5 self-stretch placeholder:text-[#e5e5e5] outline-none rounded-[0.313rem] border-[0.063rem] border-[#6f6e7433] " placeholder="Care preferences " />
				</div>
			</div>
			<button class=" bg-brand-black px-5 py-[1.125rem] flex w-full justify-center items-center rounded-[3.125rem] text-white font-bold  " @click="addService('select_services', selected_item?.id)">Add service</button>
			<button class=" bg-white px-5 py-[1.125rem] border-[0.063rem] border-black flex w-full justify-center items-center rounded-[3.125rem] text-brand-black font-bold  " @click="removeService('select_services', selected_item?.id)">Remove service</button>
		</div>
	</div>
	<!-- Add note screen -->
	<div v-if="book.current_Screen==='add_note'" class="sm:max-w-[32.938rem] w-full absolute top-0 left-0 sm:z-0 z-50 sm:relative mx-auto flex flex-col justify-between items-start gap-5  px-2.5 py-5 sm:p-[1.875rem] sm:rounded-[1.25rem] bg-white border-[#f2f2f2] sm:min-h-full min-h-screen">
		<div class="w-full flex flex-col sm:gap-5 gap-2.5 sm:px-0 px-2.5">
			<div class=" sm:text-2xl font-bold sm:leading-7 text-base leading-5 text-brand-black flex  items-center gap-2.5 sm:p-0 p-2.5"> 
				<div class="sm:w-[2.563rem] sm:h-[2.563rem] w-5 h-5 bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer" @click="updateScreen('select_services', selected_item), edit_preferences=false">
					<img class=" hidden sm:block w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow">
					<img class=" block sm:hidden " src="https://ik.imagekit.io/choreless/V3/icons/arrow-2.svg" alt="arrow">
				</div>
			<div>Add Note</div> 
		</div>
		<div class="flex justify-between w-full items-center self-center">
			<p class="text-brand-black sm:leading-6 leading-5 ">Add Special instructions</p>
			<p class=" sm:leading-[0.938rem] leading-[1.125rem] sm:text-base text-sm font-medium cursor-pointer" @click="selected_item.note=''">Clear</p>
		</div>
		<textarea v-model="selected_item.note" rows="3" class=" w-full flex px-5 pt-2.5 pb-[0.938rem] items-start gap-2.5 self-stretch placeholder:text-[#e5e5e5] outline-none rounded-[0.313rem] border-[0.063rem] border-[#6f6e7433] " placeholder="Add Note " />
	</div>
		<button class="flex max-w-[29.188rem] h-12 px-5 py-[1.125rem] justify-center items-center gap-2.5 rounded-[3.125rem] bg-[#f8f8f8] font-bold leading-6 w-full cursor-pointer " :class="selected_item.note && 'bg-brand-black text-white'" :disabled="!selected_item.note"   @click="updateScreen('select_services', selected_item)">Save</button>
	</div>
	<!-- Pickup date screen -->
	<PickupDate />
</div>
</template>
<style scoped>

</style>
