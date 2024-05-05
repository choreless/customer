<script setup lang="ts">
const book = usePageBook();

</script>

<template>
<dialog id="my_modal_2" :class="book.info_modal ? 'modal-open  !bg-white sm:!bg-black/50': ''" class="modal  sm:py-3 overflow-scroll sm:overflow-hidden">
	<div class=" text-center  absolute top-0 sm:relative sm:modal-box sm:max-w-[501px] w-full flex flex-col gap-[30px] !p-0 !pb-5 !rounded-[5px] no-scrollbar">
		<div class="absolute bg-white w-[22px] h-[22px] right-3 top-3 flex justify-center items-center rounded-full" @click="book.info_modal=false">
			<div class=" w-[7.5px] h-[7.5px] mr-1 "><IconClose2 /></div>
		</div>
		<div class="h-[160px] sm:h-[241px] w-full ">
			<img class="h-full w-full object-cover" src="https://s3-alpha-sig.figma.com/img/5d0c/8835/c4009896d8db4b6c133bafa811e09e37?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hzhRM2Gt15qyVathtbH6VL~Ob3VDNjcKHhn6xuvOvJkQ5mp-1YC64DmeO4HDP37WTY3fpNYdjwkjaX9PM3BjZ4gQ-sSlTjZ2Xc1cquzkeVb9VD7G1FkvtgRcJNWJydSoj2Fj~LQDE1mYb1b-6ywvh2utl1vvOprkmKC5qHBuRSEy1uZHUaZ1-gbFt0RaEL-xoAkiGjYsW16dTByToAwMNiBoZNZeatWedVQ5NefCoBpG9SPSMRf~yvBrsERPIBdfYNY7cXfSrf-gaK99q1Eweu2~o~0LJnEIJsSFnnUjGmvQyx4wr90aLCFJBdRIrJobaoAVQytOEK9~1pfPzJX3jw__" alt="Info Image">
		</div>
		<div class="  flex justify-center items-center gap-2">
			<div class="px-2 bg-[#F7F8FA] flex justify-center items-center rounded sm:hidden">
				<IconTag color="black" class="" />
			</div>
			<div class="text-xl sm:text-[32px] sm:leading-9 font-bold sm:font-medium sm:px-10">Load label: <span class="sm:font-normal">Tillman + CF2A</span> </div>
		</div>
		<div class=" text-base leading-5 sm:text-[32px] sm:leading-10 font-bold px-10">Using Kitchen Bags?</div>
		<div class=" text-sm leading-5 sm:text-xl sm:leading-6 px-10">Make sure that your bags are labeled - as seen above - if you don't have Loaded membership hamprs. If bags aren't labeled, your items will be washed on cold with Dropps detergent. If you have Loaded membership hamprs, skip this step.</div>
		<div class="mt-[36%] sm:mt-auto px-5 py-[18px] bg-[#f85a47] font-medium sm:font-bold text-white mx-[30px] rounded-[5px]" @click="book.info_modal=false">Got it</div>
	</div>
</dialog>
</template>
