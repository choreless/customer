<script setup lang="ts">
const book = usePageBook();

</script>

<template>
<dialog id="my_modal_2" :class="book.learn_more_modal ? 'modal-open': ''" class="modal py-3">
	<div class="modal-box max-w-[501px] w-full flex flex-col gap-[30px] !p-0 !pb-5 rounded-none no-scrollbar">
        <div @click="book.learn_more_modal=false" class="absolute bg-white w-[22px] h-[22px] right-3 top-3 flex justify-center items-center rounded-full">

            <div class=" w-[7.5px] h-[7.5px] mr-1 cursor-pointer" ><IconClose2 /></div>
        </div>
        <div class="h-[242px] w-full ">
            <img class="h-full w-full object-cover" src="/learnMore.png" alt="Learn More Image">
        </div>
        <div class="px-[30px]">
            <h1 class="text-[32px] leading-10 font-bold">What you can expect on your first pickup:</h1>
            <div class="mt-[27px] flex flex-col gap-[30px]">
                <div  class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#F8F8F8] rounded-full flex justify-center items-center">

                        <IconClock  />
                    </div>
                    <p>On your scheduled pickup day, set your bags out by 6 PM.</p>
                </div>
                <div  class="flex items-center gap-3">
                    <div class="w-10 h-10 ">
                        <IconMessage/>
                    </div>
                    <p>At 5:30pm on the evening of your pickup, we’ll text you a 30-minute window of when the delivery driver expects to arrive.</p>
                </div>
                <div  class="flex items-center gap-3">
                    <div class="w-10 h-10">

                        <IconDoor  />
                    </div>
                    <p>You only need to have the clothes you want us to pick up ready by the door. That’s it!</p>
                </div>
                <div  class="flex items-center gap-3">
                    <div class="w-10 h-10">
                        <IconBus />
                        </div>
                        
                    <p>After that, Choreless will take care of the rest and deliver your clean clothes right back to your door. Like magic.</p>
                </div>
            </div>
        </div>
    </div>
</dialog>
</template>
