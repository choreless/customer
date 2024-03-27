<script setup lang="ts">
withDefaults(defineProps<{
    width?: string,
    height?: string,
    fill?: string,
    stroke?: string
}>(), {
    width: '10',
    height: '14',
    fill: 'none',
    stroke: 'black'
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 10 14" :fill="fill">
        <path d="M5 13L5 1.00001M5 13L0.499999 8.50001M5 13L9.5 8.50001" :stroke="stroke" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>