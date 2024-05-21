<script setup lang="ts">
import AddPromoCodeModal from './PromoModal'

interface CardNumber{
    card_number: string;
    expiry_date: string;
    csv: string;
    zip: string;
}

const dashboard = usePageDashboard();
const is_expanded=ref(false)
const is_summary_expanded=ref(false)
const added_promo_code=ref('')
const add_card_payment=ref(false)
const is_card_expanded=ref(false)
const selected_card=ref<CardNumber>({
	card_number: '****5468',
	expiry_date: '08/25',
	csv: '3421',
	zip: '12213'
})
const update_promo_code=(e: { promo_code: any; })=>{
	added_promo_code.value=e.promo_code
}

function selectCard(card:CardNumber){
	selected_card.value=card
	is_card_expanded.value=false
}

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
			<div class="px-[0.813rem] py-2 text-xs font-medium text-brand-orange bg-[#ffefed] rounded-[1.875rem]">Pickup tomorrow</div>
			<div :class="is_expanded ? 'rotate-180': 'rotate-0'" class="transition-all ease-linear duration-150 cursor-pointer" @click="is_expanded=!is_expanded"><IconDropdown /></div>
		</div>
	</div>
	<div v-if="is_expanded" class="w-[calc(100%-2.5rem)] mx-auto h-[0.063rem] bg-brand-black/20" />
	<div v-if="is_expanded" class="p-5">
		<div class="flex items-end gap-[0.624rem]">
			<h1 class="text-brand-black text-2xl font-medium leading-normal">ETA Pending</h1>
			<p class="text-brand-secondary text-sm leading-normal">We are working on it</p>
		</div>
		<div class="my-[0.625rem] flex self-stretch gap-[1.063rem]">
			<IconProgressLine class="stroke-brand-orange" />
			<IconProgressLine class="stroke-[#cacaca]" />
			<IconProgressLine class="stroke-[#cacaca]" />
		</div>
		<div class="mt-[0.625rem] leading-normal text-sm text-brand-black">
			We will update your drivers ETA Shortly
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
