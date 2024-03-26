<script lang="ts" setup>
import type { vTooltip } from 'floating-vue';
const promoCode = ref('12323ED')

useHead({ title: 'Summary' });
definePageMeta({
    layout: 'clean'
})
</script>

<template>
    <div class="flex items-center gap-10 min-h-screen">
        <div class="h-full basis-[50%]" id="summary_map">
            <img src="/map.png" alt="map img" loading="lazy" class="w-full h-full" />
        </div>
        <div class="p-[164px] space-y-5">
            <img src="https://ik.imagekit.io/choreless/v2/icons/choreless.svg" />
            <div class="space-y-20">
                <div class="space-y-[10px]">
                    <h4 class="text-black text-[2rem] font-bold leading-[38px]">Summary</h4>
                    <small class=" text-sm text-[#838383] max-w-[322px]">Please double check all the information to
                        ensure it is <br> correct before booking</small>
                </div>
                <div>
                    <div class="flex items-start gap-4">
                        <div class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1]">
                            <icon-coin fill="black" width="16" height="16" />
                        </div>
                        <div>
                            <span class=" text-base text-[#838383]">Due today</span>
                            <h4 class="text-black text-xl font-medium flex items-center gap-2">$35 minimum charge
                                <span v-tooltip="{
                                    content:
                                        `<ul class='space-y-2'>
                                            <li class='flex items-center justify-between gap-20'>
                                                <span class='text-base text-black'>Order min <small
                                                        class='text-xs text-[#838383]'>(mixed wash)</small></span>
                                                <span class='text-base text-black'> $35</span>
                                            </li>
                                            <li class='flex items-center justify-between gap-20'>
                                                <span class='text-base text-black'>Pickup & Delivery</span>
                                                <span class='text-base text-white bg-[#0000004D]/30  px-2.5 rounded-[6px]'> FREE</span>
                                            </li>
                                            <li class='flex items-center justify-between gap-20'>
                                                <span class='text-base text-black'>Laundry<small
                                                        class='text-xs text-[#838383]'>(Per pound)</small></span>
                                                <span class='text-base text-black'> $1.80</span>
                                            </li>
                                        </ul>`,
                                    html: true,
                                    theme: 'tooltip-white'
                                }">
                                    <icon-info />
                                </span>
                            </h4>
                            <p class=" text-sm text-[#838383]"> If order total exceeds minimum charge,
                                <br>you will be charged the difference.
                            </p>

                            <NuxtLink to="/" class=" text-[#F85A47] hover:text-[#F85A47]/70 text-sm mt-[3px]">
                                <span>learn more</span>
                            </NuxtLink>

                            <div class="mt-1">
                                <div>
                                    <button
                                        class="flex items-center text-sm gap-3 text-[#838383] hover:text-gray-800 transition duration-200 ease-linear">
                                        <span>
                                            <icon-plus-circle />
                                        </span>
                                        Apply promo code
                                    </button>
                                    <form-promocode-input v-model:promoCode="promoCode" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>