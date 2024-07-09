<script setup lang="ts">
const book = usePageBook();
    
</script>
<template>
    <div :class="book.current_Screen !='pickup_date' ? 'hidden' :book.learn_more_toggle ? 'right-0' : 'right-[-30rem]'" class="flex transition-all duration-200 ease-linear max-w-[30rem] h-screen pb-5 flex-col justify-between items-center fixed top-0  z-50 bg-white">
		<div class="flex flex-col items-center gap-5 sm:gap-[1.875rem] self-start relative">
			<img class="hidden sm:block" src="https://ik.imagekit.io/choreless/V3/info.png" alt="Learn more banner image">
			<img class="block sm:hidden object-cover w-full" src="https://ik.imagekit.io/choreless/V3/learn-more-2.png" alt="Learn more banner image">
			<div class=" absolute top-[0.875rem] left-[0.906rem] sm:top-[1.75rem] sm:left-[1.75rem] text-2xl font-bold leading-7 text-brand-black flex  items-center gap-2.5" @click="book.learn_more_toggle=false">
				<div class="sm:w-[2.563rem] sm:h-[2.563rem] w-5 h-5 bg-white  rounded-full shadow-md flex items-center justify-center cursor-pointer">
					<img class=" hidden sm:block w-2.5 h-5 mr-1" src="https://ik.imagekit.io/choreless/V3/icons/arrow.svg" alt="arrow">
					<img class=" block sm:hidden " src="https://ik.imagekit.io/choreless/V3/icons/arrow-2.svg" alt="arrow">
				</div>
			</div>
			<div class="flex px-5 sm:px-10 flex-col items-start gap-5 self-stretch">
				<div class="text-brand-black sm:text-[1.5rem] text-xl leading-6 font-bold sm:leading-8">What you can expect on your first pickup:</div>
				<div class="flex flex-col items-start gap-2.5 self-stretch">
					<div class="flex items-start gap-2.5 sm:gap-3 self-stretch">
						<div class="w-16 sm:w-10 h-10 flex justify-center items-center ">
							<img src="https://ik.imagekit.io/choreless/V3/icons/calender.svg" alt="choreless calender">
						</div>
						<div class="text-brand-black sm:text-base sm:leading-6 text-sm">On your scheduled pickup day, set your bags out by 6 PM.</div>
					</div>
					<div class="flex items-start gap-3 self-stretch">
						<img src="https://ik.imagekit.io/choreless/V3/icons/message.svg" alt="choreless message">
						<div class="text-brand-black sm:text-base sm:leading-6 text-sm">At 5:30pm on the evening of your pickup, we’ll text you a 30-minute window of when the delivery driver expects to arrive.</div>
					</div>
					<div class="flex items-start gap-3 self-stretch">
						<img src="https://ik.imagekit.io/choreless/V3/icons/door.svg" alt="choreless door">
						<div class="text-brand-black sm:text-base sm:leading-6 text-sm">You only need to have the clothes you want us to pick up ready by the door. That’s it!</div>
					</div>
					<div class="flex items-start gap-3 self-stretch">
						<img src="https://ik.imagekit.io/choreless/V3/icons/deliver.svg" alt="choreless deliver">
						<div class="text-brand-black sm:text-base sm:leading-6 text-sm">After that, Choreless will take care of the rest and deliver your clean clothes right back to your door. Like magic.</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex sm:px-[1.875rem] px-5 flex-col items-center gap-2.5 sm:gap-5 self-stretch mt-8 sm:mt-0">
			<div class="max-w-[50rem] w-full h-[0.031rem] bg-[#6f6e7433]" />
			<div class="flex sm:h-[5rem] h-auto sm:px-[1.875rem] sm:py-[1.125rem] py-4 px-5 items-center gap-5 self-stretch rounded-[0.625rem] bg-[#d4e8e6]">
				<img class="sm:w-auto sm:h-auto w-3 h-3" src="https://ik.imagekit.io/choreless/V3/icons/info.svg" alt="info">
				<div class="sm:text-lg sm:leading-6 text-xs leading-[0.875rem] text-brand-black">Please read carefully</div>
			</div>
			<div class="cursor-pointer px-5 py-[1.125rem] bg-brand-black flex h-[3rem] justify-center items-center self-stretch gap-2.5 rounded-[3.125rem] text-white font-bold leading-6  " @click="book.learn_more_toggle=false">Got it</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>

</style>