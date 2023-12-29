<template>
<nav class="flex justify-between items-center px-6 sm:px-[6.25rem] py-2 bg-brand-orange">
	<NuxtLink to='/dashboard'>
		<img src="https://ik.imagekit.io/choreless/v2/icons/choreless-white.svg" alt="logo" loading='lazy' class="h-10" />
		<p class='text-xs font-bold ml-0.5 -mt-2 text-white'>v{{ $config.public.base.AppVersion }}</p>
	</NuxtLink>
	<NuxtLink href='/logout' class="btn btn-sm flex items-center h-[1.1875rem] rounded-md text-base text-brand-orange hover:bg-brand-orange hover:text-white">Logout</NuxtLink>
</nav>
</template>
