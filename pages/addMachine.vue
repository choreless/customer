<script setup lang="ts">
import navbarCustomer from '~/components/navBars/navbarCustomer.vue';
useHead({ title: 'Add Machine' });
definePageMeta({
	layout: 'clean'
});
</script>

<template>
<div class="flex flex-col  h-screen">
	<navbarCustomer />
	<section class="flex justify-center items-center h-screen">
		<div class="inline-flex px-5 items-start gap-[100px] rounded-[5px] bg-white" style="box-shadow:  0px 0px 15px 0px rgba(0, 0, 0, 0.15)">
			<summary class="flex flex-col items-center gap-10 self-stretch bg-white w-[500px] py-5">
				<div class="flex w-full justify-center">
					<h1 class="text-[32px] leading-[38px]">
						<strong>Add a Machine</strong>
					</h1>
					<button
						class="relative left-[125px] w-[10px] h-[10px] stroke-black"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
						>
							<path
								d="M12 2L2 12M2.00003 2L12 12"
								stroke="black"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
				<section class="flex items-start gap-[50px]">
					<article class="flex flex-col items-center self-stretch gap-[18.462px] w-[138.462px] py-[23.077px] px-[27.692px] rounded-[11.538px] bg-white" style="box-shadow:0px 0px 6.923px 0px rgba(0, 0, 0, 0.15)">
						<h3 class="text-lg">Wash</h3>
						<svg xmlns="http://www.w3.org/2000/svg" width="43" height="48" viewBox="0 0 43 48" fill="none">
							<path d="M41.7759 5.99797V42.921C41.7759 44.1451 41.2966 45.3191 40.4435 46.1846C39.5904 47.0502 38.4332 47.5364 37.2267 47.5364H5.38222C4.1757 47.5364 3.01858 47.0502 2.16544 46.1846C1.3123 45.3191 0.833008 44.1451 0.833008 42.921V5.99797C0.833008 4.7739 1.3123 3.59995 2.16544 2.7344C3.01858 1.86885 4.1757 1.38259 5.38222 1.38259H37.2267C38.4332 1.38259 39.5904 1.86885 40.4435 2.7344C41.2966 3.59995 41.7759 4.7739 41.7759 5.99797Z" stroke="black" stroke-width="0.923077" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M21.3039 42.8466C24.9235 42.8466 28.3948 41.3878 30.9542 38.7912C33.5137 36.1945 34.9515 32.6727 34.9515 29.0004C34.9515 25.3282 33.5137 21.8064 30.9542 19.2097C28.3948 16.6131 24.9235 15.1543 21.3039 15.1543C17.6843 15.1543 14.213 16.6131 11.6536 19.2097C9.09412 21.8064 7.65625 25.3282 7.65625 29.0004C7.65625 32.6727 9.09412 36.1945 11.6536 38.7912C14.213 41.3878 17.6843 42.8466 21.3039 42.8466Z" stroke="black" stroke-width="0.923077" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M21.3053 35.9236C19.4955 35.9236 17.7598 35.1942 16.4801 33.8959C15.2004 32.5976 14.4814 30.8366 14.4814 29.0005" stroke="black" stroke-width="0.923077" stroke-linecap="round" stroke-linejoin="round" />
							<line x1="1.16895" y1="10.5806" x2="41.7768" y2="10.5806" stroke="black" stroke-width="0.923077" />
							<circle cx="5.99557" cy="5.9615" r="1.01803" fill="black" />
							<ellipse cx="9.65182" cy="5.9615" rx="1.01803" ry="1.01803" fill="black" />
						</svg>
						<span>
							0 turns
						</span>
					</article>
					<article class="flex flex-col items-center self-stretch gap-[18.462px] w-[138.462px] py-[23.077px] px-[27.692px] rounded-[11.538px] bg-white" style="box-shadow:0px 0px 6.923px 0px rgba(0, 0, 0, 0.15)">
						<h3 class="text-lg">Dry</h3>
						<svg xmlns="http://www.w3.org/2000/svg" width="37" height="48" viewBox="0 0 37 48" fill="none">
							<path d="M35.6555 5.3609V37.0092C35.6555 38.0585 35.2446 39.0647 34.5134 39.8066C33.7821 40.5485 32.7903 40.9653 31.7561 40.9653H4.46085C3.42668 40.9653 2.43488 40.5485 1.70361 39.8066C0.972344 39.0647 0.561523 38.0585 0.561523 37.0092V5.3609C0.561523 4.31169 0.972344 3.30545 1.70361 2.56355C2.43488 1.82165 3.42668 1.40485 4.46085 1.40485H31.7561C32.7903 1.40485 33.7821 1.82165 34.5134 2.56355C35.2446 3.30545 35.6555 4.31169 35.6555 5.3609Z" stroke="black" stroke-width="0.923077" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M18.1091 36.9454C21.2116 36.9454 24.187 35.695 26.3808 33.4693C28.5746 31.2436 29.8071 28.2249 29.8071 25.0773C29.8071 21.9297 28.5746 18.911 26.3808 16.6853C24.187 14.4596 21.2116 13.2092 18.1091 13.2092C15.0066 13.2092 12.0312 14.4596 9.83739 16.6853C7.6436 18.911 6.41113 21.9297 6.41113 25.0773C6.41113 28.2249 7.6436 31.2436 9.83739 33.4693C12.0312 35.695 15.0066 36.9454 18.1091 36.9454Z" stroke="black" stroke-width="0.923077" stroke-linecap="round" stroke-linejoin="round" />
							<ellipse cx="4.98686" cy="5.32963" rx="0.872597" ry="0.872597" fill="black" />
							<ellipse cx="8.12064" cy="5.32963" rx="0.872597" ry="0.872597" fill="black" />
							<path d="M14.5568 21.3409C14.2287 21.7226 13.7148 22.426 13.7148 23.4041C13.7148 24.6435 14.7294 24.8722 14.7294 26.5215C14.7294 28.1709 14.0528 28.5836 13.9685 28.8127" stroke="black" stroke-width="0.692308" stroke-linecap="round" />
							<path d="M18.1232 21.3409C17.7951 21.7226 17.2813 22.426 17.2813 23.4041C17.2812 24.6435 18.2958 24.8722 18.2958 26.5215C18.2958 28.1709 17.6193 28.5836 17.5349 28.8127" stroke="black" stroke-width="0.692308" stroke-linecap="round" />
							<path d="M21.6906 21.3409C21.3624 21.7226 20.8486 22.426 20.8486 23.4041C20.8486 24.6435 21.8632 24.8722 21.8632 26.5215C21.8632 28.1709 21.1866 28.5836 21.1023 28.8127" stroke="black" stroke-width="0.692308" stroke-linecap="round" />
						</svg>
						<span>
							0 turns
						</span>
					</article>
				</section>
			</summary>
		</div>
	</section>
</div>
</template>
