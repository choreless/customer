<script setup lang="ts">
withDefaults(defineProps<{
    width: string,
    height: string,
    fill: string,
    stroke: string
}>(), {
    width: '15',
    height: '15',
    fill: 'none',
    stroke: 'currentColor'
})

</script>
<template>
    <svg :width="width" :height="height" viewBox="0 0 15 14" :fill="fill" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.5 4.11111V9.88889M4.61111 7H10.3889M14 7C14 10.5899 11.0899 13.5 7.5 13.5C3.91015 13.5 1 10.5899 1 7C1 3.41015 3.91015 0.5 7.5 0.5C11.0899 0.5 14 3.41015 14 7Z"
            :stroke="stroke" stroke-linecap="round" />
    </svg>
</template>