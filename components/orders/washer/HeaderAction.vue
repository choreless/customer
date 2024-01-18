<template>
<div>
	<div class="flex items-center gap-x-2 lg:gap-x-[3.125rem]">
		<div class="dropdown dropdown-end dropdown-hover group">
			<div class="pb-1"><button class="w-9 h-9 rounded-md group-hover:bg-info"><Icon name="mdi:dots-horizontal" class="text-4xl" /></button></div>
			<ul tabindex="0" class="dropdown-content z-[1] menu border rounded-lg shadow w-52 p-0 bg-base-100">
				<li class="rounded-t-[inherit] hover:bg-info active:bg-info group/dropdown-item">
					<button class="active:!bg-inherit active:!text-inherit !bg-transparent group-hover/dropdown-item:-translate-x-1" @click="notify.underDevelopment()">
						<IconPrinter class="w-5" />
						<p>Print order details</p>
					</button>
				</li>
				<li class="rounded-b-[inherit] hover:bg-info active:bg-info group/dropdown-item">
					<button class="active:!bg-inherit active:!text-inherit !bg-transparent group-hover/dropdown-item:-translate-x-1" @click="notify.underDevelopment()">
						<Icon name="material-symbols:delete-forever-outline" class="text-xl" />
						<p>Delete order</p>
					</button>
				</li>
			</ul>
		</div>
		<NuxtLink to="/dashboard" class="block w-9 h-9 rounded-md hover:bg-brand-orange hover:text-white group">
			<Icon name="material-symbols:close-rounded" class="text-4xl transition-transform duration-500 group-hover:-rotate-90" />
		</NuxtLink>
	</div>
</div>
</template>
