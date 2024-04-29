<script setup lang="ts">
import info_modal from '../modals/Info.vue';
import pricing_modal from '../modals/Pricing.vue';
import add_note_modal from '../modals/AddNote.vue';

const book = usePageBook();
const is_toggle=ref(false)
const is_selected=ref<number | null>(null)
const wash_is_required=ref(false)
const wash_services_data=reactive([
	{
		wash_type:'Mixed Wash',
		from_price:1.80,
		to_price:2.00,
		note:'',
		service_speed:'next_day',
		bags_count:1

	},
	{
		wash_type:'Seperate Wash',
		from_price:2.25,
		to_price:2.50,
		note:'das',
		service_speed:'next_day',
		bags_count:1

	},
])
const big_item = book.optional_item

function select_service(id: number){
	is_selected.value=id;
	wash_is_required.value=false
	
}
function update_service_speed(item:any){
	console.log(typeof item)
	console.log( item)
	is_toggle.value=!is_toggle.value
	if(is_toggle.value){
		item.service_speed='2_day'
	}else{
		item.service_speed='next_day'
	}
}

function next_step(){
	if(is_selected.value===null){
		wash_is_required.value=true
	}else{
		
		wash_is_required.value=false
		book.step++
	}
}

</script>

<template>
<div class="">
	<div class="my-8 max-w-[467px] mx-auto flex flex-col items-start gap-5">
		<h1 class="text-2xl leading-7 font-bold">How can we help you?</h1>
		<div v-for="(item,index) of wash_services_data" :key="index" class=" relative px-[15px] py-2.5 cursor-pointer rounded-[10px] border-[0.5px] border-b-[5px] border-[#e5e5e5] w-full [&:is(.active)]:border-[#f85a47]  transition-all duration-100 ease-linear" :class="is_selected===index ? 'active' : ''" @click="select_service(index)">
			<div class="flex  items-center self-stretch gap-5 justify-between">
				<div class="max-w-[348px] w-full flex flex-col items-start gap-2.5">
					<h1 class="text-2xl leading-6  font-bold text-[#f85a47]  capitalize">{{ item.wash_type }}</h1>
					<p v-if="item.service_speed==='next_day'" class="text-[10px] leading-4">From <span class=" font-medium">$ {{item.from_price.toFixed(2)}}/lb</span></p>
					<p v-else class="text-[10px] leading-4">From <span class=" font-medium">${{item.to_price.toFixed(2)}}/lb</span></p>
					<div class="flex items-center justify-start gap-[5px] self-stretch flex-wrap">
						<p class=" flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">WASH</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">TUMBLE-DRY</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">IN A BAG</p>
						<div class="flex items-center gap-x-1">
							<img src="https://ik.imagekit.io/choreless/v2/icons/time.svg" alt="icon" loading="lazy" class="w-[10px] h-[10px]">
						
							<p class="text-[12px] font-medium leading-6">{{ item.service_speed==='next_day' ? '24h Service' : '48h Service' }} </p>
						</div>
					</div>
					<div class="text-[12px] leading-4 ">Convenient wash & fold laundry service for individuals couples. </div>
				</div>
				<div>
					<div v-if="item.wash_type==='Mixed Wash'"><IconMixed :isActive="is_selected===index " /></div>
					<div v-else><IconSeperate :isActive="is_selected===index " /></div>
				</div>
			</div>
			<div :class="is_selected == index ? 'block' : 'hidden' " class="bg-white w-full ">
				<div class="flex justify-between items-center self-stretch mt-5">
					<div class="max-w-[223.5px] w-full pr-5 flex items-start justify-between gap-2.5">
						<h1 class="text-sm leading-5 font-medium">Next Day Delivary</h1>
						<label class="flex items-center cursor-pointer select-none text-dark ">
    <div class="relative">
      <input type="checkbox" class="sr-only" @click="update_service_speed(item)" />
      <div :class="is_toggle ? 'bg-[#F85A47]' : 'bg-[#D9D9D9]'" class="block h-5 rounded-full  w-[50px]"></div>
      <div
        :class="{ 'translate-x-full ': is_toggle }"
        class="absolute flex items-center justify-center w-7 h-7 transition drop-shadow-md bg-[#FFFFFF] rounded-full dot dark:bg-dark-5 left-0 -top-1"
      >
        <span>
			<p  v-if="is_toggle" class="text-[#F85A47]">
				&#x2713;
			</p>
        </span>
       
      </div>
    </div>
  </label>
						
					</div> 
					<div class="w-[1px] h-5 bg-[#0000000d]" />
					<div class=" cursor-pointer text-right text-sm font-medium " @click="book.add_note_modal=!book.add_note_modal">{{item.note ? 'Edit Note' :'Add Note'}}</div>
					<add_note_modal :note="item.note" />
				</div>
				<div class="my-2.5 h-[1px] bg-[#0000000d] w-full" />
				<div class="flex h-5 justify-between items-center self-stretch px-2.5">
					<button class="text[25px] leading-5 " :class="item.bags_count<2 ? ' text-[#838383]' : 'text-black'" :disabled="item.bags_count<2" @click="item.bags_count--"><Icon name="ic:outline-minus" class="text-2xl" /></button>
					<p class="text-sm font-medium">{{ item.bags_count }} Bags</p>
					<button class="text[25px] leading-5" @click="item.bags_count++"><Icon name="ic:outline-plus" class="text-2xl" /></button>
				</div>
			</div>
				</div>
				<p v-if="wash_is_required" class="text-error mt-1">* Wash type is required</p>

		
		<h1 class="text-2xl leading-7 font-bold">
			Do you have any Big Item ?
		</h1>
		<div  :class="big_item.is_active ? 'active' : ''" class=" relative px-[15px] py-2.5 cursor-pointer rounded-[10px] border-[0.5px] border-b-[5px] border-[#e5e5e5] w-full [&:is(.active)]:border-[#f85a47]  transition-all duration-100 ease-linear" >
			<div @click="big_item.is_active =!big_item.is_active"  class="flex  self-stretch gap-5 justify-between ">
				<div class="max-w-[348px] w-full flex flex-col items-start gap-2.5">
					<h1 class="text-2xl leading-6  font-bold text-[#f85a47]  capitalize">{{big_item.name}}</h1>
					<div class="flex items-center  gap-[5px]">
						<p class="text-[10px] leading-4 ">From <span class=" font-medium">${{ big_item.price }}.00 <span class="text-[8px] leading-4"> price per item</span></span></p>
						<button class="text-[#f85a47] text-[8px] leading-3 font-medium" @click="book.pricing_modal=!book.pricing_modal">See pricing</button>
						<pricing_modal />

					</div>
					<div class="flex items-center justify-start gap-[5px] self-stretch flex-wrap">
						<p class=" flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">WASH</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">TUMBLE-DRY</p>
						<p class="flex justify-center items-center px-2.5 text-[8px] leading-[14px] rounded-[20px] bg-[#f2f2f2]">IN A BAG</p>
						<div class="flex items-center gap-x-1">
							<img src="https://ik.imagekit.io/choreless/v2/icons/time.svg" alt="icon" loading="lazy" class="w-[10px] h-[10px]">
							<p class="text-[12px] font-medium leading-6">{{big_item.delivery_time }} </p>
						</div>
					</div>

						<div class="text-[12px] leading-4 ">Convenient wash & fold laundry service for individuals couples. </div>
					
					
				</div>
				<div class="flex flex-col justify-center items-center">
					<div><IconOptional :isActive="big_item.is_active " /></div>
					<!-- <div  :class="big_item.is_active ? 'block' : 'hidden' "   class=" mt-4 cursor-pointer text-right text-sm font-medium " @click="book.add_note_modal=!book.add_note_modal">Add Note</div> -->
				</div>
			</div>
			<div  :class="big_item.is_active ? 'block' : 'hidden' " class="bg-white w-full ">
				
				<div class="my-2.5 h-[1px] bg-[#0000000d] w-full" />
				<div class="flex h-5 justify-between items-center self-stretch px-2.5">
					<button class="text[25px] leading-5 " :class="big_item.quantity<2 ? ' text-[#838383]' : 'text-black'" :disabled="big_item.quantity<2" @click="big_item.quantity--"><Icon name="ic:outline-minus" class="text-2xl" /></button>
					<p class="text-sm font-medium">{{ big_item.quantity }} Bags</p>
					<button class="text[25px] leading-5" @click="big_item.quantity++"><Icon name="ic:outline-plus" class="text-2xl" /></button>
				</div>
			</div>
		</div>	
				
		<div class="p-[15px] w-full rounded-[5px] bg-gradient-to-t from-[#ff7565] via-[#ff7565] to-[#ff4e38] ">
		
			<div class=" flex justify-between items-center">
				<div>
					<IconTag class="mr-[15px]" />
				</div>
				<div class="flex flex-col gap-[6px] text-white max-w-[381px] w-full">
					<p class="text-sm leading-[18px]">Write your name to avoid laundry mix-ups.</p>
					<h1 class="text-lg leading-[18px] font-bold">Load label: <span class="font-normal"> Tillman + CF2A</span></h1>
				</div>
				
				<div class="cursor-pointer">
				<IconInfo3  @click="book.info_modal=!book.info_modal" />
				<info_modal />
				</div>
			</div>
		</div>
		<div >
			<h1 class="text-base leading-6 font-bold mb-2.5">What happens next?</h1>
			<div class="flex items-center gap-[15px] text-black">
				<div class="p-2.5 rounded-[5px] bg-[#f8f8f8] min-h-[82px] h-full text-center max-w-[133px] w-full">
					<div class="mb-[5px] flex justify-center items-center"><IconBag /></div>
					<p class="text-xs font-bold">Prepare your bags</p>
					<h1 class="text-[10px] leading-[14px]">Pack 1 bag per service type.</h1>
				</div>
				<div class="p-2.5 rounded-[5px] bg-[#f8f8f8] min-h-[82px] h-full text-center max-w-[175px] w-full">
					<div class="mb-[5px] flex justify-center items-center"><IconClean /></div>
					<p class="text-xs font-bold text-nowrap">We collect and clean items</p>
					<h1 class="text-[10px] leading-[14px]">After cleaning, you <br> will receive an </h1>
				</div>
				<div class="p-2.5 rounded-[5px] bg-[#f8f8f8] min-h-[82px] h-full text-center max-w-[133px] w-full">
					<div class="mb-[5px] flex justify-center items-center"><IconDeliver /></div>
					<p class="text-xs font-bold">We deliver</p>
					<h1 class="text-[10px] leading-[14px]">After cleaning, you will receive an </h1>
				</div>  
			</div>
			
		</div>
		<button @click="next_step" :class="is_selected !==null ? 'text-white bg-[#f85a47]' : 'text-black bg-[#f8f8f8]'"  class="font-bold    text-center w-full px-5 py-[18px] rounded-[5px] ">Continue</button>

	</div>



</div>
</template>
<style scoped>

</style>
