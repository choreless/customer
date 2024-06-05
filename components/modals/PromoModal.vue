<script setup lang="ts">
const dashboard = usePageDashboard();
// Defining Constants
const route = useRoute()
const props = defineProps<{
}>();
const emit=defineEmits(['update:promo_code']);
const update_promo_code = () => {
	emit('update:promo_code', { promo_code: route.name ==='dropoff' ? dashboard.order_data_dropoff[dashboard.selected_order_id].promo_code : dashboard.order_data_pickup[dashboard.selected_order_id].promo_code });
	dashboard.add_promo_modal = false
}
// Defining Functions
function clear_promo() {
	if(route.name ==='dropoff'){
		dashboard.order_data_dropoff[dashboard.selected_order_id].promo_code=''
	}else{
		dashboard.order_data_pickup[dashboard.selected_order_id].promo_code=''
	}
}

function close_modal(){
	dashboard.add_promo_modal = false
}

</script>

<template>
<dialog
	id="my_modal_1"
	:class="dashboard.add_promo_modal ? 'modal-open  !bg-white sm:!bg-black/50' : ' '"
	class="modal  sm:py-3 overflow-scroll sm:overflow-hidden"
>
	<div
		class=" text-center  absolute top-0  sm:relative sm:modal-box sm:max-w-[31.313rem] w-full flex flex-col gap-2.5  !px-5 !p-0 sm:!px-5 !py-[0.75rem]  !rounded-[0.313rem] no-scrollbar"
	>
		<div
			class=" py-2.5 flex justify-between items-center relative text-black"
		>
			<h1
				class="self-stretch text-xl leading-6 font-bold sm:font-medium text-center w-full px-10"
			>
				Apply promo
			</h1>
			<div
				class="absolute w-[0.438rem] h-[0.438rem] right-0 top-3 cursor-pointer"
				@click="close_modal"
			>
				<IconClose2 />
			</div>
		</div>
		<div class="flex justify-between items-center self-stretch">
			<h1 class="text-base text-black">Apply promo code</h1>
			<h1
				class="text-base leading-[0.938rem] font-normal sm:font-medium text-black cursor-pointer"
				@click="clear_promo"
			>
				Clear
			</h1>
		</div>
		<textarea
			v-if="route.name ==='dropoff'"
			v-model="dashboard.order_data_dropoff[dashboard.selected_order_id].promo_code"
			class="focus:outline-none focus:border-[0.063rem] focus:border-b-[0.313rem] focus:border-brand-orange px-5 pt-2.5 pb-[0.938rem] placeholder:opacity-50 text-base placeholder:text-[#e5e5e5] !rounded-[0.313rem] border-[0.063rem] border-[#e5e5e5] w-full h-[3rem] text-black overflow-hidden"
			placeholder="Apply promo code"
		/>
		<textarea
			v-if=" route.name ==='pickup'"
			v-model="dashboard.order_data_pickup[dashboard.selected_order_id].promo_code"
			class="focus:outline-none focus:border-[0.063rem] focus:border-b-[0.313rem] focus:border-brand-orange px-5 pt-2.5 pb-[0.938rem] placeholder:opacity-50 text-base placeholder:text-[#e5e5e5] !rounded-[0.313rem] border-[0.063rem] border-[#e5e5e5] w-full h-[3rem] text-black overflow-hidden"
			placeholder="Apply promo code"
		/>
		<button
			class="  mt-0 hidden sm:flex justify-center items-center px-5 py-[1.125rem] rounded-[0.313rem] bg-brand-orange disabled:bg-[#f8f8f8] h-[3rem] text-base font-bold disabled:text-[#011631] text-white"
			@click="update_promo_code()"
		>
			Apply
		</button>
	</div>
	<div class=" absolute bottom-2.5 w-full px-5">
		<button
			class=" w-full  mt-3 flex sm:hidden justify-center items-center px-5 py-[1.125rem] rounded-[0.313rem] bg-brand-orange disabled:bg-[#f8f8f8] h-[3rem] text-base font-medium disabled:text-[#011631] text-white"
			@click="update_promo_code()"
		>
			Apply
		</button>
	</div>
</dialog>
</template>
