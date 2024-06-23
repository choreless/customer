<script setup lang="ts">
import AddPromoCodeModal from '~/components/modals/PromoModal.vue'
const props = defineProps({
	order_data: {
		type: Object,
		required: true
	},
	index: {
		type: Number,
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
	year: number;
}

// Defining Constants

const dashboard = usePageDashboard();
const is_expanded=ref(false)
const is_summary_expanded=ref(false)
const add_card_payment=ref(false)
const is_card_expanded=ref(false)
const status_main_line=ref('ETA Pending')
const status_sub_line=ref('We are working on it')
const status_details=ref('We will update your drivers ETA Shortly')
const prefix=ref('')
const custom_class=ref('')
const date_current_order=ref<DateFormat>(
	{
		day: 0,
		day_name: '',
		month: 0,
		month_name: '',
		year: 0
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
	dashboard.order_data_pickup[dashboard.selected_order_id].promo_code=e.promo_code
}

function open_promo_modal(){
	dashboard.add_promo_modal=!dashboard.add_promo_modal
	dashboard.selected_order_id=props.index
}
function selectCard(card:CardNumber){
	selected_card.value=card
	is_card_expanded.value=false
}
function seperateAndLabelDate(order_data:object){
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
		month_name: month_label,
		year
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
function set_order_status(status:string) {
	switch(status) {
	case 'Ready for intake':
		indication_status.value='Ready for intake'
		custom_class.value=''
		status_main_line.value='Ready for intake'
		status_sub_line.value='We are working on it.'
		status_details.value='Handling your laundry with care'
		break;
	case 'Processing':
		indication_status.value='Processing'
		custom_class.value=''
		status_main_line.value='Processing'
		status_sub_line.value='Your order is being processed '
		status_details.value='Handling your laundry with care'
		break;
	case 'Ready for delivery':
		indication_status.value='Ready for delivery'
		custom_class.value='!text-white bg-brand-orange'
		status_main_line.value='Ready for delivery'
		status_sub_line.value='Your order is ready to deliver'
		status_details.value=`Estimated delivery date ${date_current_order.value.day_name} ${date_current_order.value.day} ${date_current_order.value.month_name} ${date_current_order.value.year}  `
		break;
	case 'Order cancelled':
		indication_status.value='Order Cancelled'
		custom_class.value='!bg-[#ffebf7] !text-[#a82975]'
		status_main_line.value='Order Canceled'
		status_sub_line.value='Your order was canceled'
		status_details.value='Sorry about the cancel!  Need help? We are here.'
		break;
	case 'Failed':
		indication_status.value='Pickup Failed'
		custom_class.value='!bg-[#ffebf7] !text-[#a82975]'
		status_main_line.value='Pickup failed'
		status_sub_line.value=`Pickup attempted at  at ${props.order_data.pickup_to}`
		status_details.value='Please re-schedule your pickup.'
		break;
	case 'Collected':
		indication_status.value='Collected'
		custom_class.value='!text-white bg-brand-orange'
		status_main_line.value='Collected'
		status_sub_line.value=`Pickup complete at ${props.order_data.pickup_to}`
		status_details.value='Your laundry has been collected, sit back and enjoy.'
		break;
	case 'In Progress':
		indication_status.value='In Progress'
		custom_class.value=''
		status_main_line.value=`${props.order_data.pickup_from} - ${props.order_data.pickup_to}`
		status_sub_line.value='Estimate pickup window'
		status_details.value='Driver has been displaced'
		break;
	}
}
onMounted(() => {
	seperateAndLabelDate(props.order_data)
	date_prefix(date_current_order.value.day)
	status_change()
	set_order_status(props.order_data.status)
})

</script>
<template>
<div class=" sm:w-full shadow-order-card rounded-[0.625rem]">
	<div class=" px-2.5 py-[0.313rem] sm:p-5 flex justify-between items-center ">
		<div class="flex items-center gap-2.5 sm:gap-5">
			<div>
				<img src="https://ik.imagekit.io/choreless/V2S/icons/mixed.svg" alt="choreless note" v-if="order_data.wash_type==='Mixed Wash' " />
				<img src="https://ik.imagekit.io/choreless/V2S/icons/optional.svg" alt="choreless note" v-if="order_data.wash_type==='Home & Bedding' " />
				<img src="https://ik.imagekit.io/choreless/V2S/icons/steam.svg" alt="choreless note" v-if="order_data.wash_type==='Wash & Steam' " />
			</div>
			<div>
				<p class=" text-[0.625rem] leading-4 sm:text-xs ">{{ order_data.type }}</p>
				<h2 class="capitalize font-medium text-sm sm:text-base leading-normal">{{ date_current_order.day_name }},</h2>
				<h1 class=" text-xl sm:text-2xl leading-nromal font-medium">{{ date_current_order.month_name }} {{ date_current_order.day }}{{ prefix }} </h1>
				<p class="text-[0.625rem] leading-4 sm:text-xs">{{ order_data.wash_type }}- 9FPN</p>
			</div>
		</div>
		<div class="flex justify-center items-center gap-2.5">
			<div :class="custom_class" class="px-[0.438rem] sm:px-[0.813rem] py-[0.313rem] sm:py-2 text-[0.625rem] leading-[0.625rem] sm:text-xs font-medium text-brand-orange bg-[#ffefed] rounded-[1.875rem]">{{ indication_status }}</div>
			<div :class="is_expanded ? 'rotate-180': 'rotate-0'" class="transition-all ease-linear duration-150 cursor-pointer  " @click="is_expanded=!is_expanded"><img src="https://ik.imagekit.io/choreless/V2S/icons/dropdown.svg" alt="choreless note" /></div>
		</div>
	</div>
	<div v-if="is_expanded" class="w-[calc(100%-0.625rem)] sm:w-[calc(100%-2.5rem)] mx-auto h-[0.063rem] bg-brand-black/20" />
	<div v-if="is_expanded" class=" px-2.5 py-5 sm:p-5">
		<div class="flex items-end gap-[0.6325rem]">
			<h1 class="text-brand-black text-xl sm:text-[1.375rem] font-medium leading-normal">{{ status_main_line }}</h1>
			<p class="text-[#838383] text-[0.635rem] sm:text-sm leading-normal">{{ status_sub_line }}</p>
		</div>
		<div class="my-[0.625rem] flex self-stretch gap-[1.063rem]">
			<IconProgressLine class="stroke-brand-orange" />
			<IconProgressLine :class="order_data.status !=='' && order_data.status!=='Ready for intake' ? 'stroke-brand-orange' : 'stroke-[#cacaca]' " />
			<IconProgressLine :class=" order_data.status==='Collected' || order_data.status==='Ready for delivery' ? 'stroke-brand-orange' : order_data.status==='Failed' || order_data.status ==='Order cancelled' ? 'stroke-[#a82975]' :'stroke-[#cacaca]' " />
		</div>
		<div class="leading-normal text-xs sm:text-sm text-brand-black">
			{{ status_details }}
		</div>
		<div class=" my-2.5 sm:my-[1.25rem] h-[0.063rem] bg-brand-black/20" />
		<div class="flex flex-col items-start gap-[0.313rem]">
			<div class="flex items-center gap-[0.313rem]">
				<img src="https://ik.imagekit.io/choreless/V2S/icons/note.svg" alt="choreless note" />
				<p class=" text-sm text-[#838383] sm:leading-6">Order Details</p>
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
				<div class=" text-xs sm:text-base px-[0.375rem] sm:px-[0.625rem] sm:py-[0.313rem] rounded-[1.875rem] border-[0.063rem] border-brand-black leading-5 text-brand-black cursor-pointer" @click="open_promo_modal">{{ order_data.promo_code !='' ? 'Remove Promo' : 'Add Promo' }} </div>
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
					<div class="text-[#838383] text-sm">Payment method</div>
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
							<img src="https://ik.imagekit.io/choreless/V2S/icons/visa.svg" alt="Visa icon">
							<div class="text-[0.813rem] leading-8 text-brand-black">{{ selected_card.card_number }} </div>
						</div>
						<img :class="is_card_expanded && 'rotate-180'" class="rotate-0 transition-all ease-linear duration-150 cursor-pointer" @click="is_card_expanded=!is_card_expanded" src="https://ik.imagekit.io/choreless/V2S/icons/thin-dropdown.svg" alt="Visa icon">
					</div>
					<div v-if="is_card_expanded" class="absolute top-9 w-full border-[0.063rem] border-brand-black/20 bg-white rounded-[0.313rem] py-[0.313rem] px-[0.625rem] shadow flex flex-col justify-center items-start">
						<div v-for="(item,index) in dashboard.card_details" :key="index" class="flex items-center gap-[0.625rem] px-[0.625rem] hover:bg-[#f7fafc] w-full rounded transition-all duration-100 cursor-pointer " @click="selectCard(item)">
							<img src="https://ik.imagekit.io/choreless/V2S/icons/visa.svg" alt="Visa icon">
							<div class="text-[0.813rem] leading-8 text-brand-black">{{ item.card_number }} </div>
						</div>
					</div>
				</div>
				<div v-else class="flex items-center w-full">
					<div class=" w-fit py-[0.625rem] text-sm text-brand-black">Payment</div>
					<div v-for="(card, index) in dashboard.add_card_details" :key="index" class="px-[0.625rem] py-[0.313rem] flex justify-between  items-center w-full max-w-[19.625rem] overflow-hidden">
						<div class="flex items-center gap-[0.624rem]">
							<img src="https://ik.imagekit.io/choreless/V2S/icons/visa.svg" alt="Visa icon">
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
						<img class="w-[0.813rem] h-[0.813rem]" src="https://ik.imagekit.io/choreless/V2S/icons/add.svg" alt="choreless add">
						<p class="text-xs leading-5 text-[#838383]">Add New card</p>
					</div>
				</div>
				<div class="text-xs leading-5 text-[#838383]">Your card will not be charged until your order is picked up</div>
				<div class="flex justify-between items-start text-xl sm:text-2xl leading-[2.375rem] text-brand-black w-full font-bold">
					<p>Order Total</p>
					<p>TBD</p>
				</div>
			</div>
			<div class="flex  items-start gap-[0.625rem] w-full">
				<button class=" w-1/2 py-[0.625rem] px-[0.938rem] sm:px-[1.875rem] rounded-[0.313rem] border-[0.063rem] border-brand-black/20 flex gap-2 sm:gap-2.5 items-center justify-center ">
					<img class="w-[0.75rem] h-[0.75rem] sm:w-[0.938rem] sm:h-[0.938rem]" src="https://ik.imagekit.io/choreless/V2S/icons/edit.svg" alt="choreless edit" />
					<div class="text-sm leading-6 font-medium sm:text-base sm:font-bold text-brand-orange ">Manage</div>
				</button>
				<button class=" w-1/2 py-[0.625rem] px-2 sm:px-5 rounded-[0.313rem] border-[0.063rem] border-brand-black/20 flex items-center sm:gap-2 justify-center " @click="is_summary_expanded=!is_summary_expanded">
					<img class=" w-[0.75rem] h-[0.75rem] sm:w-[0.938rem] sm:h-[0.938rem] mr-1 sm:mr-0 " src="https://ik.imagekit.io/choreless/V2S/icons/info-orange.svg" alt="choreless info" />
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
