<script setup lang="ts">
const is_opened = ref(false)
</script>

<template>
<main class="relative">
	<div class="px-[3.125rem] py-5 ">
		<IconMenu class="w-[2.344rem] h-[1.875rem] cursor-pointer" @click="is_opened=!is_opened" />
	</div>
	<div :class="is_opened ? 'left-0': '-left-[16.25em]'" class=" border-r-[0.063rem] border-brand-black/20 fixed top-0 max-w-[15.625rem] w-full bg-white min-h-screen transition-all duration-75 ease-linear flex flex-col	 justify-between items-start" @click="is_opened=false">
		<div class="w-full">
			<div class="h-[7.5rem] px-[1.875rem] border-b-[0.063rem] border-brand-secondary/20 flex justify-center items-center text-2xl leading-[0.938rem] font-bold ">Hi Wallace!</div>
			<div class="p-[1.875rem] flex flex-col gap-5 items-start w-full">
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<IconAddCard class="w-[0.938rem] h-[0.938rem] !stroke-brand-black" /> <div class="text-base leading-5 text-brand-black">New Order</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<IconAddCard class="w-[0.938rem] h-[0.938rem] " /> <div class="text-base leading-5 text-brand-black">My Activity</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<IconAddCard class="w-[0.938rem] h-[0.938rem]" /> <div class="text-base leading-5 text-brand-black">Recurring Order</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<IconAddCard class="w-[0.938rem] h-[0.938rem]" /> <div class="text-base leading-5 text-brand-black">Account</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<IconAddCard class="w-[0.938rem] h-[0.938rem]" /> <div class="text-base leading-5 text-brand-black">Logout</div>
				</div>
			</div>
		</div>
		<div class="px-[1.875rem] py-[3.125rem] flex flex-col gap-5">
			<div class="w-[2.875rem] h-[0.188rem] bg-brand-black" />
			<h1 class="leading-5 text-brand-secondary cursor-pointer" @click="is_opened=!is_opened">Privacy policy</h1>
			<h1 class="text-brand-secondary cursor-pointer" @click="is_opened=!is_opened">Terms of use</h1>
		</div>
	</div>
</main>
</template>
