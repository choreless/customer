<script setup lang="ts">

const cardEl = ref('')
const stripe = await useStripe()
const card = stripe?.elements({ loader: 'always' })?.create('card', {
    classes: {
        base: 'border border-[#00000033] rounded-[5px] focus-within:border-brand-black hover:border-brand-black p-4'
    }
});

card?.on('change', (e: any) => console.log(e))

onMounted(() => {
    card?.mount(cardEl.value)
})

</script>

<template>
    <div>
        <div ref="cardEl" />
        <button
            class="flex items-center text-sm !leading-[0] gap-2 text-[#838383]  hover:text-gray-800 transition duration-200 ease-linear mt-2.5">
            <span>
                <icon-plus-circle />
            </span>
            Apply promo code
        </button>
    </div>
</template>