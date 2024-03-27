<script setup lang="ts">
withDefaults(defineProps<{
    width?: string,
    height?: string,
    fill?: string,
    stroke?: string
}>(), {
    width: '10',
    height: '12',
    fill: 'none',
    stroke: 'black'
})
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 10 12" :fill="fill">
        <path
            d="M3.875 9.9375C3.875 10.5588 4.37868 11.0625 5 11.0625C5.62132 11.0625 6.125 10.5588 6.125 9.9375M3.875 9.9375C3.875 9.31618 4.37868 8.8125 5 8.8125C5.62132 8.8125 6.125 9.31618 6.125 9.9375M3.875 9.9375L0.5 9.9375M6.125 9.9375H9.5M2.75 6C2.75 5.37868 2.24632 4.875 1.625 4.875C1.00368 4.875 0.5 5.37868 0.5 6C0.5 6.62132 1.00368 7.125 1.625 7.125C2.24632 7.125 2.75 6.62132 2.75 6ZM2.75 6L9.5 6M7.25 2.0625C7.25 2.68382 7.75368 3.1875 8.375 3.1875C8.99632 3.1875 9.5 2.68382 9.5 2.0625C9.5 1.44118 8.99632 0.9375 8.375 0.9375C7.75368 0.9375 7.25 1.44118 7.25 2.0625ZM7.25 2.0625L0.5 2.0625"
            :stroke="stroke" stroke-linecap="round" />
    </svg>
</template>