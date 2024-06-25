<script setup lang="ts">
const book = usePageBook();

</script>

<template>
<dialog id="my_modal_2" :class="book.learn_more_modal ? 'modal-open !bg-white sm:!bg-black/50 ': ''" class="modal sm:py-3 overflow-scroll sm:overflow-hidden">
	<div class=" absolute top-0 sm:relative sm:modal-box sm:max-w-[31.875rem] w-full flex flex-col gap-[1.875rem] !p-0 !pb-5 !rounded-[0.313rem] no-scrollbar">
		<div class=" absolute bg-white w-[1.375rem] h-[1.375rem] right-3 top-3 flex justify-center items-center rounded-full" @click="book.learn_more_modal=false">
			<div class=" w-[0.469rem] h-[0.469rem] mr-1 cursor-pointer"><IconClose2 /></div>
		</div>
		<div class="!h-[12.5rem] sm:h-[15.063rem] w-full ">
			<img class="h-full w-full object-cover" src="https://ik.imagekit.io/choreless/V2S/learnMore.png" alt="Learn More Image">
		</div>
		<div class="px-4 sm:px-[1.875rem]">
			<h1 class="text-xl leading-6 sm:text-[2rem] sm:leading-10 font-bold">What you can expect on your first pickup:</h1>
			<div class="mt-[1.688rem] flex flex-col gap-[1.875rem]">
				<div class="flex items-center gap-3">
					<div class="w-[1.875rem] h-[1.875rem]  sm:w-10 sm:h-10 bg-[#f8f8f8] rounded-full flex justify-center items-center">
						<img class="w-4 h-4" src="https://ik.imagekit.io/choreless/V2S/icons/clock.svg" alt="choreless clock" />
					</div>
					<p class="text-sm sm:text-base">On your scheduled pickup day, set your bags out by 6 PM.</p>
				</div>
				<div class="flex items-center gap-3">
					<img  class="w-[1.875rem] h-[1.875rem]  sm:w-10 sm:h-10 "  src="https://ik.imagekit.io/choreless/V2S/icons/message.svg" alt="choreless message" />
					<p class="text-sm sm:text-base">At 5:30pm on the evening of your pickup, we’ll text you a 30-minute window of when the delivery driver expects to arrive.</p>
				</div>
				<div class="flex items-center gap-3">
					<img  class="w-[1.875rem] h-[1.875rem]  sm:w-10 sm:h-10 "  src="https://ik.imagekit.io/choreless/V2S/icons/door.svg" alt="choreless door" />
					<p class="text-sm sm:text-base">You only need to have the clothes you want us to pick up ready by the door. That’s it!</p>
				</div>
				<div class="flex items-center gap-3">
					<img  class="w-[1.875rem] h-[1.875rem]  sm:w-10 sm:h-10 "  src="https://ik.imagekit.io/choreless/V2S/icons/bus.svg" alt="choreless bus" />
					<p class="text-sm sm:text-base">After that, Choreless will take care of the rest and deliver your clean clothes right back to your door. Like magic.</p>
				</div>
			</div>
		</div>
	</div>
</dialog>
</template>
