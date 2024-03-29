<script setup lang="ts">

const cardEl = ref('')
const stripe = await useStripe()
const card = stripe?.elements()?.create('card', {
    classes: {
        base: 'border border-[#00000033] rounded-[5px] w-[316px] p-4'
    }
});

card?.on('change', (e: any) => console.log(e))

onMounted(() => {
    card?.mount(cardEl.value)
})

</script>

<template>
    <div ref="cardEl" class="w-full">Stripe here</div>
</template>