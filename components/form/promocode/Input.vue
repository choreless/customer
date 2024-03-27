<script setup lang="ts">

const promoCode = defineModel('promoCode')
const emit = defineEmits(['applyPromoCode'])
const props = withDefaults(defineProps<{
    isValidPromocode?: null | boolean,
}>(), {
    isValidPromocode: null
})


const borderClass = computed(() => {
    if (promoCode.value && props.isValidPromocode === true) return 'border-brand-black';
    else if (promoCode.value && props.isValidPromocode === false) return 'border-[#FF4D4D]';
    else return 'border-[#00000033] hover:border-brand-black'
})

const btnText = computed(() => {
    return promoCode.value && props.isValidPromocode ? 'Remove' : 'Apply'
})
</script>

<template>
    <div class="flex items-center py-[7px] px-2.5 rounded-[5px] border relative" :class="borderClass">
        <input type="text" v-model="promoCode" placeholder="Enter promo code" class="outline-0 border-0 relative" />
        <button @click="$emit('applyPromoCode')" :disabled="!promoCode"
            class=" disabled:opacity-45 py-[5px] px-2.5 rounded-[5px] bg-brand-orange text-white hover:bg-orange-700 transition duration-200 ease-linear "
            v-text="btnText"></button>
        <span class="text-black rounded-[2px] bg-white py-[1px] px-[2px] text-[10px] absolute left-2 -bottom-2"
            v-if="promoCode && isValidPromocode">Promo code
            applied</span>
        <span class="text-[#FF4D4D] rounded-[2px] bg-white px-1 text-[10px] absolute left-2 -bottom-2.5"
            v-if="promoCode && isValidPromocode === false">Invalid code</span>
    </div>
</template>