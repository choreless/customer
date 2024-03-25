<script lang="ts" setup>
 useHead({ title: 'Summary' });
 definePageMeta({
	layout: 'clean'
})
</script>

<template>
<div class="flex items-center gap-10 min-h-screen">
    <div class="h-full basis-[50%]" id="summary_map">
        <img src="/map.png" alt="map img" loading="lazy" class="w-full h-full"/>
    </div>
    <div class="p-[164px] space-y-5">
        <img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg"/>
        <div>
            <div class="space-y-[10px]">
                <h4 class="text-black text-[2rem] font-bold leading-[38px]">Summary</h4>
                <small class=" text-sm text-[#838383] max-w-[322px]">Please double check all the information to ensure it is <br> correct before booking</small>
            </div>
            <div>
                <div>
                    <div class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1]">
                        <icon-coin fill="black" width="16" height="16"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>