<template>
<aside
	class="inline-flex py-5 flex-col items-center gap-[5px] rounded-[10px]"
	style="box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1)"
>
	<button
		class="flex w-[350px] py-[17px] px-5 justify-center items-center gap-[10px] rounded-[5px] bg-brand-orange"
	>
		<span class="text-white font-bold leading-6">Next</span>
	</button>
	<div class="map w-[350px] h-[176.538px] flex-shrink-0" />
	<section class="flex py-[10px] px-5 items-center gap-[10px]">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="33"
			viewBox="0 0 32 33"
			fill="none"
		>
			<circle cx="16" cy="16.75" r="16" fill="#F85A47" />
			<path
				d="M20.1854 11.9746C19.1049 10.5551 17.4523 9.75 15.6727 9.75C13.893 9.75 12.2405 10.5551 11.16 11.9746C9.61335 14.0085 9.61335 16.8263 11.16 18.8602L15.6727 24.75L20.1854 18.8602C21.732 16.8263 21.732 14.0085 20.1854 11.9746ZM15.6727 12.3136C17.304 12.3136 18.6388 13.6483 18.6388 15.2797C18.6388 16.911 17.304 18.2458 15.6727 18.2458C14.0413 18.2458 12.7066 16.911 12.7066 15.2797C12.7066 13.6483 14.0413 12.3136 15.6727 12.3136Z"
				fill="white"
				stroke="white"
				stroke-miterlimit="10"
			/>
		</svg>
		<div class="w-[286px]">
			<h2 class="text-brand-black leading-6">Address</h2>
			<div
				class="self-stretch text-brand-black text-xs text-opacity-50 leading-2"
			>
				<p>Pickup: 720 seneca st seattle, WA</p>
				<p>Delivery: 7800 st Seattle, WA</p>
			</div>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
		>
			<path
				d="M1 9.92647L0.46967 9.39614L0.25 9.61581V9.92647H1ZM10.1765 0.75L10.7068 0.21967C10.4139 -0.0732233 9.93903 -0.0732233 9.64614 0.21967L10.1765 0.75ZM13 3.57353L13.5303 4.10386C13.8232 3.81097 13.8232 3.33609 13.5303 3.0432L13 3.57353ZM3.82353 12.75V13.5H4.13419L4.35386 13.2803L3.82353 12.75ZM1 12.75H0.25C0.25 13.1642 0.585786 13.5 1 13.5L1 12.75ZM1.53033 10.4568L10.7068 1.28033L9.64614 0.21967L0.46967 9.39614L1.53033 10.4568ZM9.64614 1.28033L12.4697 4.10386L13.5303 3.0432L10.7068 0.21967L9.64614 1.28033ZM12.4697 3.0432L3.2932 12.2197L4.35386 13.2803L13.5303 4.10386L12.4697 3.0432ZM3.82353 12H1V13.5H3.82353V12ZM1.75 12.75V9.92647H0.25V12.75H1.75ZM7.52849 3.39798L10.352 6.22151L11.4127 5.16085L8.58915 2.33732L7.52849 3.39798Z"
				fill="#F85A47"
			/>
		</svg>
	</section>
	<hr class="bg-brand-black bg-opacity-50 border w-[330px] h-[1px]">
	<section class="flex justify-center items-center gap-[10px] py-[10px] px-5">
		<div class="w-8 h-8" />
		<div class="w-[286px]">
			<div class="w-full">
				<span class="opacity-50 text-xs">Your Order</span>
				<p
					class="flex justify-between items-center text-brand-black leading-6"
				>
					<span>Home & Bedding</span><span class="text-xs">TBD</span>
				</p>
				<p class="underline text-xs">Remove</p>
				<p
					class="flex justify-between items-center text-brand-black leading-6"
				>
					<span>Pay as you go</span><span class="text-xs">$1.80 / lb</span>
				</p>
				<span class="opacity-50 text-xs">+Booster | Baking Soda</span>
				<p class="underline text-xs">Edit</p>
			</div>
		</div>
		<div class="w-3 h-3" />
	</section>
	<section class="flex justify-center items-center gap-[10px] py-[10px] px-5">
		<div class="w-8 h-8" />
		<div class="w-[286px]">
			<h3>Order Note</h3>
			<p class="opacity-50 text-xs">
				The Green Sweater have stain on it, please use baking soda on it
			</p>
		</div>
		<div class="w-3 h-3" />
	</section>
	<hr class="bg-brand-black bg-opacity-50 border w-[330px] h-[1px]">
	<section class="flex justify-center items-center gap-[10px] py-[10px] px-5">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="33"
			viewBox="0 0 32 33"
			fill="none"
		>
			<path
				d="M19.2222 6.25V10.6944M12.5556 6.25V10.6944M7 15.1389H24.7778M24.7778 15.1389V24.0278C24.7778 25.2551 23.7829 26.25 22.5556 26.25H9.22222C7.99492 26.25 7 25.2551 7 24.0278V10.6944C7 9.46715 7.99492 8.47222 9.22222 8.47222H22.5556C23.7829 8.47222 24.7778 9.46715 24.7778 10.6944V15.1389Z"
				stroke="#F85A47"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<div class="w-[286px]">
			<h2 class="text-2xl text-brand-black font-bold">
				Pickup / Delivery Time
			</h2>
			<div class="opacity-50 text-xs">
				<p>Pickup: Sunday, Nov 12, 9:00AM - 10:00AM</p>
				<p>Delivery: Monday, Nov 13, 9:00AM - 10:00AM</p>
			</div>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
		>
			<path
				d="M1 10.4265L0.46967 9.89614L0.25 10.1158V10.4265H1ZM10.1765 1.25L10.7068 0.71967C10.4139 0.426777 9.93903 0.426777 9.64614 0.71967L10.1765 1.25ZM13 4.07353L13.5303 4.60386C13.8232 4.31097 13.8232 3.83609 13.5303 3.5432L13 4.07353ZM3.82353 13.25V14H4.13419L4.35386 13.7803L3.82353 13.25ZM1 13.25H0.25C0.25 13.6642 0.585786 14 1 14L1 13.25ZM1.53033 10.9568L10.7068 1.78033L9.64614 0.71967L0.46967 9.89614L1.53033 10.9568ZM9.64614 1.78033L12.4697 4.60386L13.5303 3.5432L10.7068 0.71967L9.64614 1.78033ZM12.4697 3.5432L3.2932 12.7197L4.35386 13.7803L13.5303 4.60386L12.4697 3.5432ZM3.82353 12.5H1V14H3.82353V12.5ZM1.75 13.25V10.4265H0.25V13.25H1.75ZM7.52849 3.89798L10.352 6.72151L11.4127 5.66085L8.58915 2.83732L7.52849 3.89798Z"
				fill="#F85A47"
			/>
		</svg>
	</section>
	<hr class="bg-brand-black bg-opacity-50 border w-[330px] h-[1px]">
	<section class="flex justify-center items-center gap-[10px] py-[10px] px-5">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="33"
			viewBox="0 0 32 33"
			fill="none"
		>
			<path
				d="M11.2353 11.7794L10.705 11.2491C10.5643 11.3897 10.4853 11.5805 10.4853 11.7794H11.2353ZM20.7647 2.25L21.295 1.71967C21.0021 1.42678 20.5273 1.42678 20.2344 1.71967L20.7647 2.25ZM25 6.48529L25.5303 7.01562C25.8232 6.72273 25.8232 6.24786 25.5303 5.95496L25 6.48529ZM15.4706 16.0147V16.7647C15.6695 16.7647 15.8603 16.6857 16.0009 16.545L15.4706 16.0147ZM11.2353 16.0147H10.4853C10.4853 16.4289 10.8211 16.7647 11.2353 16.7647V16.0147ZM23.9412 20.25V21C24.1401 21 24.3309 20.921 24.4715 20.7803C24.6122 20.6397 24.6912 20.4489 24.6912 20.25H23.9412ZM7 20.25H6.25C6.25 20.6642 6.58579 21 7 21L7 20.25ZM7 3.30882L7 2.55882C6.58579 2.55882 6.25 2.89461 6.25 3.30882L7 3.30882ZM15.4706 4.05882C15.8848 4.05882 16.2206 3.72304 16.2206 3.30882C16.2206 2.89461 15.8848 2.55882 15.4706 2.55882V4.05882ZM24.6912 11.7794C24.6912 11.3652 24.3554 11.0294 23.9412 11.0294C23.527 11.0294 23.1912 11.3652 23.1912 11.7794H24.6912ZM11.7656 12.3097L21.295 2.78033L20.2344 1.71967L10.705 11.2491L11.7656 12.3097ZM20.2344 2.78033L24.4697 7.01562L25.5303 5.95496L21.295 1.71967L20.2344 2.78033ZM24.4697 5.95496L14.9403 15.4844L16.0009 16.545L25.5303 7.01562L24.4697 5.95496ZM15.4706 15.2647H11.2353V16.7647H15.4706V15.2647ZM11.9853 16.0147V11.7794H10.4853V16.0147H11.9853ZM17.0579 5.9568L21.2932 10.1921L22.3539 9.13143L18.1186 4.89614L17.0579 5.9568ZM23.9412 19.5L7 19.5L7 21L23.9412 21V19.5ZM7.75 20.25L7.75 3.30882L6.25 3.30882L6.25 20.25H7.75ZM7 4.05882L15.4706 4.05882V2.55882L7 2.55882L7 4.05882ZM23.1912 11.7794V20.25H24.6912V11.7794H23.1912Z"
				fill="#F85A47"
			/>
		</svg>
		<div class="w-[286px]">
			<h3>Delivery Notes</h3>
			<p class="opacity-50 text-xs">
				Please don’t leave the laundry alone, i will personally take it from
				you, Thank you.
			</p>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
		>
			<path
				d="M1 10.4265L0.46967 9.89614L0.25 10.1158V10.4265H1ZM10.1765 1.25L10.7068 0.71967C10.4139 0.426777 9.93903 0.426777 9.64614 0.71967L10.1765 1.25ZM13 4.07353L13.5303 4.60386C13.8232 4.31097 13.8232 3.83609 13.5303 3.5432L13 4.07353ZM3.82353 13.25V14H4.13419L4.35386 13.7803L3.82353 13.25ZM1 13.25H0.25C0.25 13.6642 0.585786 14 1 14L1 13.25ZM1.53033 10.9568L10.7068 1.78033L9.64614 0.71967L0.46967 9.89614L1.53033 10.9568ZM9.64614 1.78033L12.4697 4.60386L13.5303 3.5432L10.7068 0.71967L9.64614 1.78033ZM12.4697 3.5432L3.2932 12.7197L4.35386 13.7803L13.5303 4.60386L12.4697 3.5432ZM3.82353 12.5H1V14H3.82353V12.5ZM1.75 13.25V10.4265H0.25V13.25H1.75ZM7.52849 3.89798L10.352 6.72151L11.4127 5.66085L8.58915 2.83732L7.52849 3.89798Z"
				fill="#F85A47"
			/>
		</svg>
	</section>
	<hr class="bg-brand-black bg-opacity-50 border w-[330px] h-[1px]">
	<section class="flex justify-center items-center gap-[10px] py-[10px] px-5">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="33"
			viewBox="0 0 32 33"
			fill="none"
		>
			<path
				d="M9.35218 14.5025C8.93797 14.5025 8.60218 14.8383 8.60218 15.2525C8.60218 15.6667 8.93797 16.0025 9.35218 16.0025V14.5025ZM13.2631 16.0025C13.6773 16.0025 14.0131 15.6667 14.0131 15.2525C14.0131 14.8383 13.6773 14.5025 13.2631 14.5025V16.0025ZM8.23479 5H23.8783V3.5H8.23479V5ZM25.3631 6.695V16.475H26.8631V6.695H25.3631ZM23.8783 18.17H8.23479V19.67H23.8783V18.17ZM6.75 16.475V6.695H5.25V16.475H6.75ZM8.23479 18.17C7.4768 18.17 6.75 17.476 6.75 16.475H5.25C5.25 18.1747 6.5243 19.67 8.23479 19.67V18.17ZM25.3631 16.475C25.3631 17.476 24.6363 18.17 23.8783 18.17V19.67C25.5888 19.67 26.8631 18.1747 26.8631 16.475H25.3631ZM23.8783 5C24.6363 5 25.3631 5.69399 25.3631 6.695H26.8631C26.8631 4.99534 25.5888 3.5 23.8783 3.5V5ZM8.23479 3.5C6.5243 3.5 5.25 4.99534 5.25 6.695H6.75C6.75 5.69399 7.4768 5 8.23479 5V3.5ZM6 9.89H26.1131V8.39H6V9.89ZM9.35218 16.0025H13.2631V14.5025H9.35218V16.0025Z"
				fill="#F85A47"
			/>
		</svg>
		<div class="w-[286px]">
			<h3>Payment Method</h3>
			<p class="opacity-50 text-xs">Add payment method</p>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
		>
			<path
				d="M1 10.4265L0.46967 9.89614L0.25 10.1158V10.4265H1ZM10.1765 1.25L10.7068 0.71967C10.4139 0.426777 9.93903 0.426777 9.64614 0.71967L10.1765 1.25ZM13 4.07353L13.5303 4.60386C13.8232 4.31097 13.8232 3.83609 13.5303 3.5432L13 4.07353ZM3.82353 13.25V14H4.13419L4.35386 13.7803L3.82353 13.25ZM1 13.25H0.25C0.25 13.6642 0.585786 14 1 14L1 13.25ZM1.53033 10.9568L10.7068 1.78033L9.64614 0.71967L0.46967 9.89614L1.53033 10.9568ZM9.64614 1.78033L12.4697 4.60386L13.5303 3.5432L10.7068 0.71967L9.64614 1.78033ZM12.4697 3.5432L3.2932 12.7197L4.35386 13.7803L13.5303 4.60386L12.4697 3.5432ZM3.82353 12.5H1V14H3.82353V12.5ZM1.75 13.25V10.4265H0.25V13.25H1.75ZM7.52849 3.89798L10.352 6.72151L11.4127 5.66085L8.58915 2.83732L7.52849 3.89798Z"
				fill="#F85A47"
			/>
		</svg>
	</section>
</aside>
</template>

<script lang="ts" setup></script>

<style>
.map {
  background: url("/map.png");
  background-repeat: no-repeat;
}
</style>
