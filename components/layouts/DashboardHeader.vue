<script setup lang="ts">
const is_opened = ref(false)
</script>
<template>
<main class="relative">
	<div class=" px-4 flex flex-col justify-center  sm:px-[3.125rem] sm:py-5 h-[3.438rem] sm:h-auto shadow-addressHead ">
		<img class=" w-[0.781rem] h-2.5 sm:w-[1.875rem] sm:h-[1.875rem] cursor-pointer" src="https://ik.imagekit.io/choreless/V2S/icons/burger-menu.svg" alt="Choreless burger menu" @click=" is_opened=!is_opened ">
	</div>
	<div :class="is_opened ? 'left-0': '-left-[16.25em]'" class=" border-r-[0.063rem] border-brand-black/20 fixed top-0 max-w-[15.625rem] w-full bg-white min-h-screen transition-all duration-75 ease-linear flex flex-col	 justify-between items-start z-30" @click="is_opened=false">
		<div class="w-full">
			<div class="h-[7.5rem] px-[1.875rem] border-b-[0.063rem] border-[#838383]/20 flex justify-center items-center text-2xl leading-[0.938rem] font-bold ">Hi Wallace!</div>
			<div class="p-[1.875rem] flex flex-col gap-5 items-start w-full">
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/dashboard.svg" alt="choreless dashboard" class="w-[0.938rem] h-[0.938rem]">
					<div class="text-base leading-5 text-brand-black">Dashboard</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/add-black.svg" alt="choreless add" class="w-[0.938rem] h-[0.938rem]">
					<div class="text-base leading-5 text-brand-black">New Order</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/clock-black.svg" alt="choreless clock" class="w-[0.938rem] h-[0.938rem]"> <div class="text-base leading-5 text-brand-black">My Activity</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/calender-black.svg" alt="choreless calender" class="w-[0.938rem] h-[0.938rem]"><div class="text-base leading-5 text-brand-black">Recurring Order</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/person.svg" alt="choreless person" class="w-[0.938rem] h-[0.938rem]"><div class="text-base leading-5 text-brand-black">Account</div>
				</div>
				<div class="flex gap-[0.625rem] cursor-pointer" @click="is_opened=!is_opened">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/logout.svg" alt="choreless logout" class="w-[0.938rem] h-[0.938rem]"><div class="text-base leading-5 text-brand-black">Logout</div>
				</div>
			</div>
		</div>
		<div class="px-[1.875rem] py-[3.125rem] flex flex-col gap-5">
			<div class="w-[2.875rem] h-[0.188rem] bg-brand-black" />
			<h1 class="leading-5 text-[#838383] cursor-pointer" @click="is_opened=!is_opened">Privacy policy</h1>
			<h1 class="text-[#838383] cursor-pointer" @click="is_opened=!is_opened">Terms of use</h1>
		</div>
	</div>
</main>
</template>
