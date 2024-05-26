<script setup lang="ts">
import AddPromoCodeModal from '~/components/dashboard-2/PromoModal'
const props = defineProps({
	order_data: {
		type: Object,
		required: true
	}
})

// Defining Interfaces

interface CardNumber{
    card_number: string;
    expiry_date: string;
    csv: string;
    zip: string;
}

interface DateFormat{
    day: number;
    day_name: string;
    month: number;
    month_name: string;
}

interface OrderData{
			type: string;
			price: number | string;
			status:string;
			order_id: number;
			order_date: string;
			order_time: string;
			pickup_date: string;
			wash_type: string;
			service_speed: string;
			pickup_from: string;
			pickup_to: string;
			promo_code: string;
}

// Defining Constants

const dashboard = usePageDashboard();
const is_expanded=ref(false)
const is_summary_expanded=ref(false)
const added_promo_code=ref('')
const add_card_payment=ref(false)
const is_card_expanded=ref(false)
const prefix=ref('')
const date_current_order=ref<DateFormat>(
	{
		day: 0,
		day_name: '',
		month: 0,
		month_name: ''
	}
)
const date_day= new Date().getDate()
const indication_status=ref('')
const selected_card=ref<CardNumber>({
	card_number: '****5468',
	expiry_date: '08/25',
	csv: '3421',
	zip: '12213'
})

// Defining Functions

const update_promo_code=(e: { promo_code: string; })=>{
	added_promo_code.value=e.promo_code
}

function selectCard(card:CardNumber){
	selected_card.value=card
	is_card_expanded.value=false
}
function seperateAndLabelDate(order_data: OrderData){
	const order_date = order_data.order_date
	const parts = order_date.split('/')
	const day=parseInt(parts[1])
	const month=parseInt(parts[0])-1
	const year=parseInt(parts[2])
	const date=new Date(year, month, day)
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const day_label=weekdays[date.getDay()];
	const month_label=months[date.getMonth()]
	date_current_order.value={
		day,
		day_name: day_label,
		month,
		month_name: month_label
	}
}
function status_change(){
	if(date_current_order.value.day===date_day && props.order_data.status ===''){
		indication_status.value=dashboard.status[2]
	}else if(date_current_order.value.day===date_day + 1 && props.order_data.status ===''){
		indication_status.value=dashboard.status[1]
	}else if(date_current_order.value.day> date_day + 1 && props.order_data.status ===''){
		indication_status.value=dashboard.status[0]
	}else{
		indication_status.value=dashboard.status[1]
	}
}

function date_prefix(date_day:number){
	if(date_day===1 || date_day===21 || date_day===31){
		prefix.value = 'st'
	}else if(date_day===2 || date_day===22){
		prefix.value = 'nd'
	}else if(date_day===3 || date_day===23){
		prefix.value = 'rd'
	}else{
		prefix.value = 'th'
	}
}
onMounted(() => {
	seperateAndLabelDate(props.order_data)
	date_prefix(date_current_order.value.day)
	status_change()
})

</script>
<template>
<div class=" sm:w-full shadow-orderCard rounded-[0.625rem]">
	<div class=" px-2.5 py-[0.313rem] sm:p-5 flex justify-between items-center ">
		<div class="flex items-center gap-2.5 sm:gap-5">
			<div>Image</div>
			<div>
				<p class=" text-[0.625rem] leading-4 sm:text-xs ">{{ order_data.type }}</p>
				<h2 class="capitalize font-medium text-sm sm:text-base leading-normal">{{ date_current_order.day_name }},</h2>
				<h1 class=" text-xl sm:text-2xl leading-nromal font-medium">{{ date_current_order.month_name }} {{ date_current_order.day }}{{ prefix }} </h1>
				<p class="text-[0.625rem] leading-4 sm:text-xs">{{ order_data.wash_type }}- 9FPN</p>
			</div>
		</div>
		<div class="flex justify-center items-center gap-2.5">
			<div :class="order_data.status.toLocaleLowerCase()==='collected' ? '!text-white bg-brand-orange' : order_data.status.toLocaleLowerCase()==='failed' ? '!bg-[#ffebf7] !text-[#a82975]' : '' " class="px-[0.438rem] sm:px-[0.813rem] py-[0.313rem] sm:py-2 text-[0.625rem] leading-[0.625rem] sm:text-xs font-medium text-brand-orange bg-[#ffefed] rounded-[1.875rem]">{{ order_data.status.toLocaleLowerCase()==='in progress' ? 'In Progress' : order_data.status.toLocaleLowerCase()==='collected' ? 'Collected' : order_data.status.toLocaleLowerCase()==='failed' ? 'Pickup failed' : indication_status }}</div>
			<div :class="is_expanded ? 'rotate-180': 'rotate-0'" class="transition-all ease-linear duration-150 cursor-pointer  " @click="is_expanded=!is_expanded"><IconDropdown class="w-[0.625rem] h-[0.313rem] sm:w-full sm:h-full " /></div>
		</div>
	</div>
	<div v-if="is_expanded" class="w-[calc(100%-0.625rem)] sm:w-[calc(100%-2.5rem)] mx-auto h-[0.063rem] bg-brand-black/20" />
	<div v-if="is_expanded" class=" px-2.5 py-5 sm:p-5">
		<div class="flex items-end gap-[0.625rem]">
			<h1 class="text-brand-black text-xl sm:text-2xl font-medium leading-normal">{{ order_data.status.toLocaleLowerCase()==='in progress' ? `${order_data.pickup_from} - ${order_data.pickup_to}` : order_data.status.toLocaleLowerCase()==='collected' ? 'Collected' : order_data.status.toLocaleLowerCase()==='failed' ? 'Pickup failed' : 'ETA Pending' }}</h1>
			<p class="text-brand-secondary text-xs sm:text-sm leading-normal">{{ order_data.status.toLocaleLowerCase()==='in progress' ? 'Estimate pickup window' : order_data.status.toLocaleLowerCase()==='collected' ? `Pickup complete at ${order_data.pickup_to}` : order_data.status.toLocaleLowerCase()==='failed' ? `Pickup attempted at  at ${order_data.pickup_to}` : 'We are working on it' }}</p>
		</div>
		<div class="my-[0.625rem] flex self-stretch gap-[1.063rem]">
			<IconProgressLine class="stroke-brand-orange" />
			<IconProgressLine :class="order_data.status !==''? 'stroke-brand-orange' : 'stroke-[#cacaca]' " />
			<IconProgressLine :class=" order_data.status.toLocaleLowerCase()==='collected' ? 'stroke-brand-orange' : order_data.status.toLocaleLowerCase()==='failed' ? 'stroke-[#a82975]' :'stroke-[#cacaca]' " />
		</div>
		<div class="leading-normal text-xs sm:text-sm text-brand-black">
			{{ order_data.status.toLocaleLowerCase()==='in progress' ? 'Driver has been displaced ' : order_data.status.toLocaleLowerCase()==='collected' ? 'Your laundry has been collected, sit back and enjoy.' : order_data.status.toLocaleLowerCase()==='failed' ? 'Please re-schedule your pickup.' : 'We will update your drivers ETA Shortly' }}
		</div>
		<div class=" my-2.5 sm:my-[1.25rem] h-[0.063rem] bg-brand-black/20" />
		<div class="flex flex-col items-start gap-[0.313rem]">
			<div class="flex items-center gap-[0.313rem]">
				<IconNote class="fill-brand-secondary" />
				<p class=" text-sm text-brand-secondary sm:leading-6">Order Details</p>
			</div>
			<div class="flex flex-col gap-[0.313rem]">
				<div class="text-brand-black text-sm sm:text-base leading-5">Order Date: {{ order_data.order_date }}</div>
				<div class="text-base leading-5 font-bold text-brand-black">{{ order_data.wash_type }}</div>
				<div class="text-sm sm:text-base leading-5 text-brand-black font-medium">Next-day Delivery</div>
				<div class="text-xs sm:leading-5 text-[#7f7f7f] ">{{ order_data.price ==='TBD' ? 'TBD' : `$${order_data.price.toFixed(2)} / lb` }}  </div>
			</div>
		</div>
		<div class="my-[1.25rem] h-[0.063rem] bg-brand-black/20 w-full" />
		<div class="flex flex-col gap-[1.25rem]">
			<div v-if="is_summary_expanded" class="flex flex-col items-start gap-[0.625rem]">
				<div class=" text-xs sm:text-base px-[0.375rem] sm:px-[0.625rem] sm:py-[0.313rem] rounded-[1.875rem] border-[0.063rem] border-brand-black leading-5 text-brand-black cursor-pointer" @click="dashboard.add_promo_modal=!dashboard.add_promo_modal">{{ order_data.promo_code !='' ? 'Remove Promo' : 'Add Promo' }} </div>
				<div class="flex justify-between items-start text-xs sm:text-sm text-brand-black/50 w-full">
					<p>Subtotal</p>
					<p> TBD</p>
				</div>
				<div class="flex justify-between items-start text-xs sm:text-sm text-brand-black/50 w-full">
					<p>20% promo applied</p>
					<p> TBD</p>
				</div>
				<div class="flex justify-between items-start text-xs sm:text-sm text-brand-black/50 w-full">
					<p>Credit applied</p>
					<p> TBD</p>
				</div>
				<div class="flex justify-between items-start text-xs sm:text-sm text-brand-black/50 w-full">
					<p>Tip</p>
					<p> $20.00</p>
				</div>
				<div class="flex justify-between items-start text-xs sm:text-sm text-brand-black/50 w-full font-bold">
					<p>Pickup & delivery</p>
					<p>Free</p>
				</div>
				<div class=" h-[0.063rem] bg-brand-black/20 w-full" />
				<div class=" py-[0.625rem] flex flex-col gap-2.5 sm:hidden w-full">
					<div class="text-brand-secondary text-sm">Payment method</div>
					<div v-for="(card, index) in dashboard.add_card_details" :key="index" class="px-2.5 py-[0.313rem] flex items-center justify-between w-full border-[0.063rem] border-[#e5e5e5] rounded-[0.313rem]">
						<div>
							<input v-model="card.card_number" type="text" class="text-[0.813rem] leading-8 text-brand-black placeholder:text-[#0116314d] outline-none w-20" placeholder="Card Number">
						</div>
						<div class="flex items-center gap-2">
							<input v-model="card.expiry_date" type="text" class="text-[0.75rem] leading-8 text-brand-black placeholder:text-[#011631]/30 outline-none w-10 " placeholder="MM/YY">
							<input v-model="card.csv" type="text" class="text-[0.813rem] leading-8 text-brand-black placeholder:text-[#0116314d] outline-none w-8" placeholder="CSV">
							<input v-model="card.zip" type="text" class="text-[0.813rem] leading-8 text-brand-black placeholder:text-[#0116314d] outline-none w-8" placeholder="ZIP">
						</div>
					</div>
				</div>
				<div v-if="!add_card_payment" class="hidden sm:flex items-center w-full relative">
					<div class=" w-fit py-[0.625rem] text-sm text-brand-black">Payment</div>
					<div class="px-[0.625rem] py-[0.313rem] flex justify-between  items-center w-full">
						<div class="flex items-center gap-[0.625rem]">
							<img src="/images/visa.svg" alt="">
							<div class="text-[0.813rem] leading-8 text-brand-black">{{ selected_card.card_number }} </div>
						</div>
						<IconDropdownThin :class="is_card_expanded && 'rotate-180'" class="rotate-0 transition-all ease-linear duration-150 cursor-pointer" @click="is_card_expanded=!is_card_expanded" />
					</div>
					<div v-if="is_card_expanded" class="absolute top-9 w-full border-[0.063rem] border-brand-black/20 bg-white rounded-[0.313rem] py-[0.313rem] px-[0.625rem] shadow flex flex-col justify-center items-start">
						<div v-for="(item,index) in dashboard.card_details" :key="index" class="flex items-center gap-[0.625rem] px-[0.625rem] hover:bg-[#f7fafc] w-full rounded transition-all duration-100 cursor-pointer " @click="selectCard(item)">
							<img src="/images/visa.svg" alt="">
							<div class="text-[0.813rem] leading-8 text-brand-black">{{ item.card_number }} </div>
						</div>
					</div>
				</div>
				<div v-else class="flex items-center w-full">
					<div class=" w-fit py-[0.625rem] text-sm text-brand-black">Payment</div>
					<div v-for="(card, index) in dashboard.add_card_details" :key="index" class="px-[0.625rem] py-[0.313rem] flex justify-between  items-center w-full max-w-[19.625rem] overflow-hidden">
						<div class="flex items-center gap-[0.624rem]">
							<img src="/images/visa.svg" alt="">
							<input v-model="card.card_number" type="text" class="text-[0.813rem] leading-8 text-brand-black placeholder:text-[#0116314d] outline-none w-24" placeholder="Card Number">
						</div>
						<div class="flex gap-5 text-[0.813rem] leading-8 text-[#0116314d] ">
							<input v-model="card.expiry_date" type="text" class="text-[0.813rem] leading-8 text-brand-black placeholder:text-[#0116314d] outline-none w-12 " placeholder="MM/YY">
							<input v-model="card.csv" type="text" class="text-[0.813rem] leading-8 text-brand-black placeholder:text-[#0116314d] outline-none w-9" placeholder="CSV">
							<input v-model="card.zip" type="text" class="text-[0.813rem] leading-8 text-brand-black placeholder:text-[#0116314d] outline-none w-9" placeholder="ZIP">
						</div>
					</div>
				</div>
				<div class="flex justify-between items-start text-sm text-brand-black/50 w-full">
					<div class=" hidden sm:flex cursor-pointer items-center gap-[0.625rem]" @click="add_card_payment=!add_card_payment">
						<IconAddCard class="w-[0.813rem] h-[0.813rem]" />
						<p class="text-xs leading-5 text-brand-secondary">Add New card</p>
					</div>
				</div>
				<div class="text-xs leading-5 text-brand-secondary">Your card will not be charged until your order is picked up</div>
				<div class="flex justify-between items-start text-xl sm:text-2xl leading-[2.375rem] text-brand-black w-full font-bold">
					<p>Order Total</p>
					<p>TBD</p>
				</div>
			</div>
			<div class="flex  items-start gap-[0.625rem] w-full">
				<button class=" w-1/2 py-[0.625rem] px-[0.938rem] sm:px-[1.875rem] rounded-[0.313rem] border-[0.063rem] border-brand-black/20 flex gap-2 sm:gap-2.5 items-center justify-center ">
					<IconEdit class="fill-brand-orange w-[0.75rem] h-[0.75rem] sm:w-[0.938rem] sm:h-[0.938rem]" />
					<div class="text-sm leading-6 font-medium sm:text-base sm:font-bold text-brand-orange ">Manage</div>
				</button>
				<button class=" w-1/2 py-[0.625rem] px-2 sm:px-5 rounded-[0.313rem] border-[0.063rem] border-brand-black/20 flex items-center sm:gap-2 justify-center " @click="is_summary_expanded=!is_summary_expanded">
					<IconInfoSummary class=" w-[0.75rem] h-[0.75rem] sm:w-[0.938rem] sm:h-[0.938rem] mr-1 sm:mr-0 " />
					<div class="text-sm leading-6 font-medium sm:text-base sm:font-bold text-brand-orange ">View Summery</div>
				</button>
			</div>
		</div>
	</div>
	<AddPromoCodeModal @update:promo_code="update_promo_code" />
</div>
</template>

<style scoped>

</style>
