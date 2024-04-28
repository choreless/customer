<script setup lang="ts">
const book = usePageBook();

</script>

<template>
<dialog id="my_modal_2" :class="book.info_modal ? 'modal-open': ''" class="modal py-3">
	<div class="modal-box max-w-[500px] w-full flex flex-col gap-[30px] !p-0 !pb-5 rounded-none text-center no-scrollbar">
        <div @click="book.info_modal=false" class="absolute bg-white w-[22px] h-[22px] right-3 top-3 flex justify-center items-center rounded-full">

            <div class=" w-[7.5px] h-[7.5px] mr-1 " ><IconClose2 /></div>
        </div>
        <div class="h-[241px] w-full ">
            <img class="h-full w-full object-cover" src="https://s3-alpha-sig.figma.com/img/5d0c/8835/c4009896d8db4b6c133bafa811e09e37?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hzhRM2Gt15qyVathtbH6VL~Ob3VDNjcKHhn6xuvOvJkQ5mp-1YC64DmeO4HDP37WTY3fpNYdjwkjaX9PM3BjZ4gQ-sSlTjZ2Xc1cquzkeVb9VD7G1FkvtgRcJNWJydSoj2Fj~LQDE1mYb1b-6ywvh2utl1vvOprkmKC5qHBuRSEy1uZHUaZ1-gbFt0RaEL-xoAkiGjYsW16dTByToAwMNiBoZNZeatWedVQ5NefCoBpG9SPSMRf~yvBrsERPIBdfYNY7cXfSrf-gaK99q1Eweu2~o~0LJnEIJsSFnnUjGmvQyx4wr90aLCFJBdRIrJobaoAVQytOEK9~1pfPzJX3jw__" alt="Info Image">
        </div>
        <div class="text-[32px] leading-9 font-medium px-10">Load label: <span class="font-normal">Tillman + CF2A</span> </div>
        <div class="text-[32px] leading-10 font-bold px-10" >Using Kitchen Bags? {{ book.info_modal }}</div>
        <div class="text-xl leading-6 px-10">Make sure that your bags are labeled - as seen above - if you don't have Loaded membership hamprs. If bags aren't labeled, your items will be washed on cold with Dropps detergent. If you have Loaded membership hamprs, skip this step.</div>
        <div @click="book.info_modal=false" class="px-5 py-[18px] bg-[#f85a47] font-bold text-white mx-[30px] rounded-[5px]">Got it</div>
    </div>
</dialog>
</template>
