<script setup lang="ts">

type TipsType = {
    label: string,
    value: string
}

const tip = defineModel('tip')
const customTip = defineModel('customTip')

const tips: Array<TipsType> = [{ label: 'No', value: 'no' }, { label: '$5', value: '5' }, { label: '$10', value: '10' }, { label: '$15', value: '15' }]

</script>

<template>
    <div class="flex items-center gap-3">
        <label v-for="tp in tips" :key="tp.value" :for="tp.label"
            class=" w-12 h-[42px] rounded border border-gray flex items-center justify-center text-[#838383] text-xs hover:bg-[#F85A47] hover:text-white transition duration-200 ease-linear cursor-pointer has-[input:checked]:bg-[#F85A47] has-[input:checked]:text-white">
            <input type="radio" :id="tp.label" v-model="tip" :value="tp.value" hidden @input="customTip = ''" />
            {{ tp.label }}
        </label>
        <input type="number" min="0" v-model="customTip" @click="tip = ''"
            class=" w-[80px] h-[42px] rounded border border-gray flex items-center justify-center text-[#838383] text-xs hover:bg-[#F85A47] hover:text-white transition duration-200 ease-linear cursor-pointer outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-2"
            :class="customTip ? 'bg-[#F85A47] text-white ' : ''" placeholder="Custom">
    </div>
</template>