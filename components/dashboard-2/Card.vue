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

// Defining Constants

const dashboard = usePageDashboard();
const is_expanded=ref(false)
const is_summary_expanded=ref(false)
const added_promo_code=ref('')
const add_card_payment=ref(false)
const is_card_expanded=ref(false)
const date_current_order=ref<DateFormat>(
	{
		day: 0,
		day_name: '',
		month: 0,
		month_name: ''
	}
)
const date_day= new Date().getDate()
const pickup_date=ref(date_day)
const indication_status=ref('Pickup Tomorrow')
const in_progress=ref(false)
const is_collected=ref(false)
const pickup_failed=ref(false)
const pickup_from=ref('10:30 am')
const collected_at=ref('11:30 pm')
const pickup_to=ref('11:30 pm')
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
function seperateAndLabelDate(order_data){
	const order_date = order_data.order_date
	const parts = order_date.split('/')
	const day=parseInt(parts[2])
	const month=parseInt(parts[1])-1
	const year=parseInt(parts[0])
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
	if(date_current_order.value.day===date_day){
		indication_status.value=dashboard.status[2]
	}else if(date_current_order.value.day===date_day + 1){
		indication_status.value=dashboard.status[1]
	}else if(date_current_order.value.day> date_day + 1){
		indication_status.value=dashboard.status[0]
	}
}
onMounted(() => {
	seperateAndLabelDate(props.order_data)
	status_change()
})

</script>
<template>
<div class="w-full shadow-md rounded-[0.625rem]">
	<div class=" p-5 flex justify-between items-center ">
		<div class="flex items-center gap-5">
			<div>Image</div>
			<div>
				<p class="text-xs">Pickup</p>
				<h2 class="capitalize font-medium text-base leading-normal">Wednesday,</h2>
				<h1 class="text-2xl leading-nromal font-medium">March 20th</h1>
				<p class="text-xs">Mixed Wash - 9FPN</p>
			</div>
		</div>
		<div class="flex justify-center items-center gap-[0.625rem]">
			<div :class="is_collected ? 'text-white bg-brand-orange' : pickup_failed ? 'bg-[#FFEBF7] text-[#A82975]' : '' " class="px-[0.813rem] py-2 text-xs font-medium text-brand-orange bg-[#ffefed] rounded-[1.875rem]">{{ in_progress ? 'In Progress' : is_collected ? 'Collected' : pickup_failed ? 'Pickup failed' : indication_status }}</div>
			<div :class="is_expanded ? 'rotate-180': 'rotate-0'" class="transition-all ease-linear duration-150 cursor-pointer" @click="is_expanded=!is_expanded"><IconDropdown /></div>
		</div>
	</div>
	<div v-if="is_expanded" class="w-[calc(100%-2.5rem)] mx-auto h-[0.063rem] bg-brand-black/20" />
	<div v-if="is_expanded" class="p-5">
		<div class="flex items-end gap-[0.624rem]">
			<h1 class="text-brand-black text-2xl font-medium leading-normal">{{ in_progress ? `${pickup_from} - ${pickup_to}` : is_collected ? 'Collected' : pickup_failed ? 'Pickup failed' : 'ETA Pending' }}</h1>
			<p class="text-brand-secondary text-sm leading-normal">{{ in_progress ? 'Estimate pickup window' : is_collected ? `Pickup complete at ${collected_at}` : pickup_failed ? `Pickup attempted at  at ${collected_at}` : 'We are working on it' }}</p>
		</div>
		<div class="my-[0.625rem] flex self-stretch gap-[1.063rem]">
			<IconProgressLine class="stroke-brand-orange" />
			<IconProgressLine :class="in_progress || is_collected || pickup_failed ? 'stroke-brand-orange' : 'stroke-[#cacaca]' " />
			<IconProgressLine :class=" is_collected ? 'stroke-brand-orange' : pickup_failed ? 'stroke-[#A82975]' :'stroke-[#cacaca]' " />
		</div>
		<div class="mt-[0.625rem] leading-normal text-sm text-brand-black">
			{{ in_progress ? 'Driver has been displaced ' : is_collected ? 'Your laundry has been collected, sit back and enjoy.' : pickup_failed ? 'Please re-schedule your pickup.' : 'We will update your drivers ETA Shortly' }}
		</div>
		<div class="my-[1.25rem] h-[0.063rem] bg-brand-black/20" />
		<div class="flex flex-col items-start gap-[0.313rem]">
			<div class="flex items-center gap-[0.313rem]">
				<IconNote class="fill-brand-secondary" />
				<p class=" text-sm text-brand-secondary leading-6">Order Details</p>
			</div>
			<div class="flex flex-col gap-[0.313rem]">
				<div class="text-brand-black text-base leading-5">Order Date: 02/29/2024</div>
				<div class="text-base leading-5 font-bold text-brand-black">Mixed Wash</div>
				<div class="text-base leading-5 text-brand-black font-medium">Next-day Delivery</div>
				<div class="text-xs leading-5 text-[#7f7f7f] ">$1.80 / lb </div>
			</div>
		</div>
		<div class="my-[1.25rem] h-[0.063rem] bg-brand-black/20 w-full" />
		<div class="flex flex-col gap-[1.25rem]">
			<div v-if="is_summary_expanded" class="flex flex-col items-start gap-[0.625rem]">
				<div class="px-[0.625rem] py-[0.313rem] rounded-[1.875rem] border-[0.063rem] border-brand-black leading-5 text-brand-black cursor-pointer" @click="dashboard.add_promo_modal=!dashboard.add_promo_modal">{{ added_promo_code ? 'Remove Promo' : 'Add Promo' }} </div>
				<div class="flex justify-between items-start text-sm text-brand-black/50 w-full">
					<p>Subtotal</p>
					<p> TBD</p>
				</div>
				<div class="flex justify-between items-start text-sm text-brand-black/50 w-full">
					<p>20% promo applied</p>
					<p> TBD</p>
				</div>
				<div class="flex justify-between items-start text-sm text-brand-black/50 w-full">
					<p>Credit applied</p>
					<p> TBD</p>
				</div>
				<div class="flex justify-between items-start text-sm text-brand-black/50 w-full">
					<p>Tip</p>
					<p> $20.00</p>
				</div>
				<div class="flex justify-between items-start text-sm text-brand-black/50 w-full font-bold">
					<p>Pickup & delivery</p>
					<p>Free</p>
				</div>
				<div class=" h-[0.063rem] bg-brand-black/20 w-full" />
				<div v-if="!add_card_payment" class="flex items-center w-full relative">
					<div class=" w-fit py-[0.625rem] text-sm text-brand-black">Payment</div>
					<div class="px-[0.625rem] py-[0.313rem] flex justify-between  items-center w-full">
						<div class="flex items-center gap-[0.625rem]">
							<img src="/images/visa.svg" alt="">
							<div class="text-[0.813rem] leading-8 text-brand-black">{{ selected_card.card_number }} </div>
						</div>
						<IconDropdownThin :class="is_card_expanded && 'rotate-180'" class="rotate-0 transition-all ease-linear duration-150 cursor-pointer" @click="is_card_expanded=!is_card_expanded" />
					</div>
					<div v-if="is_card_expanded" class="absolute top-9 w-full border-[0.063rem] border-brand-black/20 bg-white rounded-[0.313rem] py-[0.313rem] px-[0.625rem] shadow flex flex-col justify-center items-start">
						<div v-for="(item,index) in dashboard.card_details" :key="index" class="flex items-center gap-[0.625rem] px-[0.625rem] hover:bg-[#F7FAFC] w-full rounded transition-all duration-100 cursor-pointer " @click="selectCard(item)">
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
					<div class="flex cursor-pointer items-center gap-[0.625rem]" @click="add_card_payment=!add_card_payment">
						<IconAddCard class="w-[0.813rem] h-[0.813rem]" />
						<p class="text-xs leading-5 text-brand-secondary">Add New card</p>
					</div>
				</div>
				<div class="text-xs leading-5 text-brand-secondary">Your card will not be charged until your order is picked up</div>
				<div class="flex justify-between items-start text-2xl leading-[2.375rem] text-brand-black w-full font-bold">
					<p>Order Total</p>
					<p>TBD</p>
				</div>
			</div>
			<div class="flex  items-start gap-[0.625rem] w-full">
				<button class="py-[0.625rem] px-[1.875rem] flex w-1/2 h-[3rem] justify-center items-center gap-[0.625rem] border-[0.063rem] bg-white border-brand-black/20 rounded-[0.313rem]">
					<IconEdit class="fill-brand-orange" />
					<div class="text-base font-bold text-brand-orange ">Manage</div>
				</button>
				<button class="py-[0.625rem] px-[1.5rem] flex w-1/2 h-[3rem] justify-center items-center gap-[0.625rem] border-[0.063rem] bg-white border-brand-black/20 rounded-[0.313rem]">
					<IconInfoSummary />
					<div class="text-base font-bold text-brand-orange " @click="is_summary_expanded=!is_summary_expanded">View Summery</div>
				</button>
			</div>
		</div>
	</div>
	<AddPromoCodeModal @update:promo_code="update_promo_code" />
</div>
</template>

<style scoped>

</style>
