<script lang="ts" setup>

const promoCode = ref<String>('any promocde');
const tip = ref<String | Number | null>(null)
const customTip = ref<String | Number | null>(null)
const showPromocodeInput = ref<Boolean>(false);
const showTipInput = ref<Boolean>(false);
const showDetails = ref<Boolean>(false);

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
            <div class="space-y-8">
                <div class="space-y-[10px]">
                    <h4 class="text-black text-[2rem] font-bold leading-[38px]">Summary</h4>
                    <small class=" text-sm text-[#838383] max-w-[322px]">Please double check all the information to
                        ensure it is <br> correct before booking</small>
                </div>
                <div class="">
                    <div class="flex items-start gap-4">
                        <div class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1]">
                            <icon-coin fill="black" width="16" height="16" />
                        </div>
                        <div>
                            <span class=" text-base text-[#838383]">Due today</span>
                            <h4 class="text-black text-lg font-medium flex items-center gap-2">$35 minimum charge
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

                            <div class="mt-1 space-y-2">
                                <div class="space-y-2">
                                    <button @click="showPromocodeInput = !showPromocodeInput"
                                        class="flex items-center text-sm gap-3 text-[#838383] hover:text-gray-800 transition duration-200 ease-linear">
                                        <span>
                                            <icon-plus-circle />
                                        </span>
                                        Apply promo code
                                    </button>
                                    <form-promocode-input v-model:promoCode="promoCode" v-if="showPromocodeInput"
                                        :is-valid-promocode="true" />
                                </div>
                                <div class="space-y-2">
                                    <button @click="showTipInput = !showTipInput"
                                        class="flex items-center text-sm gap-3 text-[#838383] hover:text-gray-800 transition duration-200 ease-linear">
                                        <span>
                                            <icon-plus-circle />
                                        </span>
                                        Add tip
                                    </button>
                                    <form-tip-input v-if="showTipInput" v-model:tip="tip"
                                        v-model:customTip="customTip" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="py-4 relative space-y-8 before:absolute before:top-12 before:bottom-[calc(50%-30px)] before:left-[15px] before:z-0 before:w-0.5 before:bg-gray-200 before:content-['']">
                        <div class="flex items-start gap-4 py-2.5 z-10 relative group">
                            <div
                                class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1] overflow-hidden">
                                <span
                                    class=" transform group-hover:translate-y-[-35px] group-hover:h-0 group-hover:w-0 gro transition-all duration-100 ease-linear">
                                    <icon-arrow-up />
                                </span>
                                <nuxt-link to="/" class="invisible group-hover:visible size-0 group-hover:size-auto">
                                    <icon-edit />
                                </nuxt-link>
                            </div>
                            <div>
                                <span class="text-[#838383] text-base">Pickup</span>
                                <h4 class="text-black text-lg font-medium flex items-center gap-2">720 seneca st
                                    seattle, WA</h4>
                                <p class=" text-sm text-[#838383]">
                                    Collect from me in person
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 py-2.5 z-10 relative group">
                            <div
                                class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1] overflow-hidden">
                                <span
                                    class=" transform group-hover:translate-y-[-35px] group-hover:h-0 group-hover:w-0 gro transition-all duration-100 ease-linear">
                                    <icon-arrow-down />
                                </span>
                                <nuxt-link to="/" class="invisible group-hover:visible size-0 group-hover:size-auto">
                                    <icon-edit />
                                </nuxt-link>
                            </div>
                            <div>
                                <span class="text-[#838383] text-base">Drop-off</span>
                                <h4 class="text-black text-lg font-medium flex items-center gap-2">7800 st Seattle,
                                    WA </h4>
                                <p class=" text-sm text-[#838383]">
                                    Collect from me in person
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="relative space-y-8 transition-all duration-200 ease-linear"
                        :class="showDetails ? 'h-[500px] opacity-100 overflow-visible' : 'h-0 overflow-hidden '">
                        <div class="flex items-start gap-4 py-2.5 z-10 relative group">
                            <div
                                class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1] overflow-hidden">
                                <span
                                    class=" transform group-hover:translate-y-[-35px] group-hover:h-0 group-hover:w-0 gro transition-all duration-100 ease-linear">
                                    <icon-calender />
                                </span>
                                <nuxt-link to="/" class="invisible group-hover:visible size-0 group-hover:size-auto">
                                    <icon-edit />
                                </nuxt-link>
                            </div>
                            <div>
                                <span class="text-[#838383] text-base">Arrival window</span>
                                <h4 class="text-black text-[18px]  flex items-center gap-2">Sun, Nov 12th - 9AM
                                    to 10AM</h4>

                            </div>
                        </div>
                        <div class="flex items-start gap-4 py-2.5 z-10 relative group">
                            <div
                                class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1] overflow-hidden">
                                <span
                                    class=" transform group-hover:translate-y-[-35px] group-hover:h-0 group-hover:w-0 gro transition-all duration-100 ease-linear">
                                    <icon-schedule />
                                </span>
                                <nuxt-link to="/" class="invisible group-hover:visible size-0 group-hover:size-auto">
                                    <icon-edit />
                                </nuxt-link>
                            </div>
                            <div>
                                <span class="text-[#838383] text-base">Delivery window</span>
                                <h4 class="text-black text-lg flex items-center gap-2">Mon, Nov 13th - 9AM
                                    to 10 AM</h4>

                            </div>
                        </div>
                        <div class="flex items-start gap-4 py-2.5 z-10 relative group">
                            <div
                                class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1] overflow-hidden">
                                <span
                                    class=" transform group-hover:translate-y-[-35px] group-hover:h-0 group-hover:w-0 gro transition-all duration-100 ease-linear">
                                    <icon-choreless-delicates />
                                </span>
                                <nuxt-link to="/" class="invisible group-hover:visible size-0 group-hover:size-auto">
                                    <icon-edit />
                                </nuxt-link>
                            </div>
                            <div>
                                <span class="text-[#838383] text-base">Selected Services</span>
                                <h4 class="text-black text-lg flex items-center gap-2">Mixed Wash
                                    <span class="text-[#F85A47] bg-[#f85a4719] rounded-[11px] px-2 text-xs">
                                        +7 Add-ons
                                    </span>
                                </h4>
                                <p class=" text-sm text-[#838383] flex items-center gap-2">
                                    <icon-arrow-vector />
                                    2-Day Delivery
                                </p>
                                <p class="text-black text-lg flex items-center gap-2 mt-1">Home & Bedding
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 py-2.5 z-10 relative group">
                            <div
                                class=" size-8 rounded-full items-center justify-center inline-flex shrink-0 bg-[#EDEEF1] overflow-hidden">
                                <span
                                    class=" transform group-hover:translate-y-[-35px] group-hover:h-0 group-hover:w-0 gro transition-all duration-100 ease-linear">
                                    <icon-preferences />
                                </span>
                                <nuxt-link to="/" class="invisible group-hover:visible size-0 group-hover:size-auto">
                                    <icon-edit />
                                </nuxt-link>
                            </div>
                            <div>
                                <span class="text-[#838383] text-base">Care Preferences </span>
                                <p class="text-black text-lg font-medium flex items-center gap-2">
                                    Water temp: <span class=" font-normal">Hot</span>
                                </p>
                                <p class="text-black text-lg font-medium flex items-center gap-2">
                                    Dryer temp: <span class="font-normal">High</span>
                                </p>
                                <!-- <div class="text-black text-base   mt-1">
                                    Preferences Notes <br>
                                    <span class="block text-[#838383]">
                                        The order need to be handle carefully
                                    </span>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <button type="button" @click="showDetails = !showDetails"
                        class="flex items-center gap-3 text-sm text-[#F85A47] hover:text-orange-700 transition duration-200 ease-linear">
                        <icon-caret-up v-if="showDetails" />
                        <icon-caret-down v-else />
                        {{ showDetails ? 'Hide details' : 'Show details' }}
                    </button>

                    <div class="flex items-center gap-2 mt-2.5">
                        <button type="button"
                            class="size-[50px] rounded-[5px] inline-flex items-center justify-center bg-[#F3F3F6] text-black hover:bg-gray-200 transition duration-200 ease-linear shrink-0">
                            <icon-caret-left />
                        </button>
                        <button
                            class="flex items-center justify-center rounded-[5px] bg-[#F3F3F6] hover:bg-gray-200 w-full py-[13px] px-2 font-bold"
                            type="button">
                            Submit your order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>