<script setup lang="ts">
const promoCode = defineModel('promoCode')
const emit = defineEmits(['applyPromoCode'])
</script>

<template>
    <div
        class="flex items-center py-[7px] px-2.5 rounded-[5px] border border-[#00000033] hover:border-brand-orange focus-within:border-brand-orange">
        <input type="text" v-model="promoCode" placeholder="Enter promo code" class="outline-0 border-0" />
        <!-- <span></span> -->
        <button @click="$emit('applyPromoCode')"
            class=" disabled:opacity-45 py-[5px] px-2.5 rounded-[5px] bg-brand-orange text-white hover:bg-orange-700 transition duration-200 ease-linear ">Apply</button>
    </div>
</template>