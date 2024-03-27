<script setup lang="ts">
withDefaults(defineProps<{
    width?: string,
    height?: string,
    fill?: string,
    stroke?: string
}>(), {
    width: '12',
    height: '14',
    fill: 'none',
    stroke: 'black'
})
</script>
<template>
    <svg :width="width" :height="height" viewBox="0 0 12 14" :fill="fill" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.0271 5.54054V3.59459C11.0271 2.87812 10.4462 2.2973 9.72976 2.2973H1.94598C1.2295 2.2973 0.648682 2.87812 0.648682 3.59459V11.3784C0.648682 12.0949 1.2295 12.6757 1.94598 12.6757H3.89192M7.78382 1V3.59459M3.89192 1V3.59459M0.648682 6.18919H3.89192M8.43246 8.91351V10.0081L9.01625 10.6649M11.3514 10.0811C11.3514 11.6932 10.0445 13 8.43246 13C6.82039 13 5.51355 11.6932 5.51355 10.0811C5.51355 8.46901 6.82039 7.16216 8.43246 7.16216C10.0445 7.16216 11.3514 8.46901 11.3514 10.0811Z"
            :stroke="stroke" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

</template>