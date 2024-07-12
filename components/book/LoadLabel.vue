<script setup lang="ts">
const book = usePageBook();
    
</script>
<template>
   <div :class="book.current_Screen !='select_services' ? 'hidden' : book.info_toggle ? 'right-0' : 'right-[-30rem]'" class="  flex transition-all duration-200 ease-linear max-w-[30rem] w-full h-screen  pb-5 flex-col justify-between items-center fixed top-0  z-50 bg-white">
		<div class="flex flex-col items-center sm:gap-[1.875rem] gap-2.5 self-stretch ">
			<div class="bg-[#F2d46e] flex sm:h-[9.375rem] h-[6.25rem] justify-center items-start gap-[0.5rem] self-stretch  relative">
				<div class=" absolute top-[1.75rem] left-[1.75rem] text-2xl font-bold leading-7 text-brand-black flex  items-center gap-2.5" @click="book.info_toggle=false">
					<div class="sm:w-[2.563rem] sm:h-[2.563rem] w-5 h-5 bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer">
						<img class=" hidden sm:block w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow">
						<img class=" block sm:hidden " src="https://ik.imagekit.io/choreless/V3/icons/arrow-2.svg" alt="arrow">
					</div>
				</div>
				<div class="flex pt-5 pb-2.5 sm:py-[1.875rem] flex-col justify-center items-center gap-[0.5rem] self-stretch">
					<div class="sm:text-xl sm:leading-9 leading-9 text-base font-medium tracking-[0.125rem] text-brand-black">Load label</div>
					<div class="sm:text-[1.5rem] font-bold sm:leading-9 text-2xl leading-[1.875rem] text-brand-black">Tillman + CF2A</div>
				</div>
			</div>
			<div class="flex sm:px-10 px-5 flex-col items-start sm:gap-2.5 gap-0 self-stretch">
				<div class="sm:text-[1.5rem] text-[1.25rem] font-bold leading-10 text-brand-black">Using Kitchen Bags?</div>
				<div class="sm:text-lg sm:leading-6 text-sm leading-5 text-brand-black">Label your bags as shown. Unlabeled bags will be washed on cold with Dropps detergent.</div>
			</div>
			<img class="px-5" src="https://ik.imagekit.io/choreless/V3/banner.png" alt="Label banner image">
		</div>
		<div class="flex px-[1.875rem] flex-col items-center gap-5 self-stretch mt-20 sm:mt-0">
			<div class="max-w-[50rem] w-full h-[0.031rem] bg-brand-stone" />
			<div class="flex sm:h-[5.625rem] h-auto sm:px-[1.875rem] sm:py-5 py-4 px-5 items-center gap-5 self-stretch rounded-[0.625rem] bg-[#d4e8e6]">
				<img class="sm:w-auto sm:h-auto w-3 h-3" src="https://ik.imagekit.io/choreless/V3/icons/info.svg" alt="info">
				<div class="sm:text-lg sm:leading-6 text-xs leading-[0.875rem] text-brand-black">This is a preview of how to add your Lad label. </div>
			</div>
			<div class="cursor-pointer px-5 py-5 bg-brand-black flex h-[3rem] justify-center items-center self-stretch gap-2.5 rounded-[3.125rem] text-white font-bold leading-6  " @click="book.info_toggle=false">Got it</div>
		</div>
	</div>
</template>
