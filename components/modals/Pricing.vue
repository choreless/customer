<script setup lang="ts">
const book = usePageBook();
const pricing_info=book.pricing_info
const selected_pricing=ref('')
const selected_item=ref(-1)
const filtered_data:any = computed(() => {
	const updated_data=pricing_info.filter((item:any)=>item.heading.includes(selected_pricing.value))
	return updated_data;
})
</script>

<template>
<dialog id="my_modal_3" :class="book.pricing_modal ? 'modal-open  !bg-white sm:!bg-black/50': ''" class="modal  py-0 sm:py-3  overflow-scroll sm:overflow-hidden">
	<div class=" text-center  absolute top-0 sm:relative sm:modal-box sm:max-w-[31.313rem] w-full flex flex-col gap-2.5 sm:gap-[1.875rem] !p-0 !pb-5  !rounded-[0.313rem] ">
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

		<div class=" cursor-pointer text-center px-5 py-5 bg-brand-orange font-medium sm:font-bold text-white mx-[1.875rem] rounded-[0.313rem]" @click="book.pricing_modal=false,book.extra_service=!book.extra_service">Got it</div>
	</div>
</dialog>
</template>
