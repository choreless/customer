<script setup lang="ts">

const cardInfo = ref();
const cardDropdown = ref<HTMLElement | null>(null);
const showCardDropdown = ref<Boolean>(false)
const isNewCard = ref<Boolean>(true);
const cardEl = ref('')
const stripe = await useStripe()
const card = stripe?.elements()?.create('card', {
	classes: {
		base: 'border border-[#00000033] rounded-[5px]  hover:border-brand-black p-4',
		focus: 'border-brand-black'
	}

});

card?.on('change', (e: any) => console.log(e))

defineProps<{
    existingCards?: Array<{ icon: String, number: String }>
}>()
defineEmits(['cardSelect']);
onMounted(() => {
	card?.mount(cardEl.value)

	// document.addEventListener('click', (e: MouseEvent) => {
	//     if (!cardDropdown.value?.contains(e.target as HTMLElement)) {
	//         showCardDropdown.value = false
	//     }
	// })
})

</script>

<template>
<div>
	<div v-show="isNewCard" ref="cardEl" />
	<div
		v-show="!isNewCard"
		class="border border-[#00000033] rounded-[5px]  hover:border-brand-black p-3.5 bg-right bg-no-repeat bg-caret-down text-sm relative flex items-center gap-2"
		@click="showCardDropdown = !showCardDropdown"
	>
		<img :src="cardInfo?.icon ?? '/icon/visa-logo.png'" alt="card icon" class="w-[35px] h-5">
		<span v-text="cardInfo?.number ?? '12321312312312321'" />
		<div
			v-if="showCardDropdown" ref="cardDropdown"
			class="w-full h-auto max-h-[106px] overflow-y-auto py-1.5 absolute top-[3.5rem] z-10 left-0 right-0 bg-white border border-[#00000033] rounded-[5px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)]"
		>
			<ul>
				<li
					class="px-2.5 py-1.5 hover:bg-[#F7FAFC] text-sm text-black flex items-center gap-2"
					role="button" @click="$emit('cardSelect', cardInfo)"
				>
					<img src=" /icon/visa-logo.png" alt="logo" class="w-[35px] h-5">
					<span>343242423423432423</span>
				</li>
				<li
					class="px-2.5 py-1.5 hover:bg-[#F7FAFC] text-sm text-black flex items-center gap-2"
					role="button" @click="$emit('cardSelect', cardInfo)"
				>
					<img src=" /icon/visa-logo.png" alt="logo" class="w-[35px] h-5">
					<span>343242423423432423</span>
				</li>
				<li
					class="px-2.5 py-1.5 hover:bg-[#F7FAFC] text-sm text-black flex items-center gap-2"
					role="button" @click="$emit('cardSelect', cardInfo)"
				>
					<img src=" /icon/visa-logo.png" alt="logo" class="w-[35px] h-5">
					<span>343242423423432423</span>
				</li>
				<li
					class="px-2.5 py-1.5 hover:bg-[#F7FAFC] text-sm text-black flex items-center gap-2"
					role="button" @click="$emit('cardSelect', cardInfo)"
				>
					<img src=" /icon/visa-logo.png" alt="logo" class="w-[35px] h-5">
					<span>343242423423432423</span>
				</li>
				<li
					class="px-2.5 py-1.5 hover:bg-[#F7FAFC] text-sm text-black flex items-center gap-2"
					role="button" @click="$emit('cardSelect', cardInfo)"
				>
					<img src=" /icon/visa-logo.png" alt="logo" class="w-[35px] h-5">
					<span>343242423423432423</span>
				</li>
				<li
					class="px-2.5 py-1.5 hover:bg-[#F7FAFC] text-sm text-black flex items-center gap-2"
					role="button" @click="$emit('cardSelect', cardInfo)"
				>
					<img src=" /icon/visa-logo.png" alt="logo" class="w-[35px] h-5">
					<span>343242423423432423</span>
				</li>
				<li
					class="px-2.5 py-1.5 hover:bg-[#F7FAFC] text-sm text-black flex items-center gap-2"
					role="button" @click="$emit('cardSelect', cardInfo)"
				>
					<img src=" /icon/visa-logo.png" alt="logo" class="w-[35px] h-5">
					<span>343242423423432423</span>
				</li>
			</ul>
		</div>
	</div>
	<button
		class="flex items-center text-sm !leading-[0] gap-2 text-[#838383]  hover:text-gray-800 transition duration-200 ease-linear mt-2.5"
		@click="isNewCard = !isNewCard"
	>
		<span>
			<icon-plus-circle />
		</span>
		{{ isNewCard ? 'Use existing card' : 'Add New card' }}
	</button>
</div>
</template>
