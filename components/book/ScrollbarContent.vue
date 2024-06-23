<script setup lang="ts">

const content = ref(null);
const scrollBar = ref(null);
const thumb = ref(null);

function updateThumbWidth () {
	const contentEl = content.value;
	const thumbEl = thumb.value;
	const contentWidth = contentEl.scrollWidth;
	const visibleWidth = contentEl.clientWidth;
	const scrollRatio = visibleWidth / contentWidth;
	const thumbWidth = visibleWidth * scrollRatio;
	thumbEl.style.width = `${thumbWidth}px`;
};

function updateThumbPosition () {
	const contentEl = content.value;
	const thumbEl = thumb.value;
	const contentWidth = contentEl.scrollWidth;
	const visibleWidth = contentEl.clientWidth;
	const scrollLeft = contentEl.scrollLeft;
	const thumbPosition = (scrollLeft / contentWidth) * visibleWidth;
	thumbEl.style.left = `${thumbPosition}px`;
};

function scrollToContent (scrollPercentage) {
	const contentEl = content.value;
	const contentWidth = contentEl.scrollWidth - contentEl.clientWidth;
	contentEl.scrollLeft = scrollPercentage * contentWidth;
};

function onScroll () {
	updateThumbPosition();
};

function onMouseDown (event) {
	event.preventDefault();
	const startX = event.pageX;
	const startLeft = thumb.value.offsetLeft;

	const onMouseMove = event => {
		const deltaX = event.pageX - startX;
		const newLeft = Math.min(
			Math.max(0, startLeft + deltaX),
			content.value.clientWidth - thumb.value.clientWidth
		);
		const scrollPercentage = newLeft / (content.value.clientWidth - thumb.value.clientWidth);
		scrollToContent(scrollPercentage);
		updateThumbPosition();
	};

	function onMouseUp () {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
};

onMounted(() => {
	const contentEl = content.value;
	const thumbEl = thumb.value;

	contentEl.addEventListener('scroll', onScroll);
	thumbEl.addEventListener('mousedown', onMouseDown);

	nextTick(() => {
		updateThumbWidth();
		updateThumbPosition();
	});

	window.addEventListener('resize', () => {
		updateThumbWidth();
		updateThumbPosition();
	});
});

onBeforeUnmount(() => {
	const contentEl = content.value;
	const thumbEl = thumb.value;

	contentEl.removeEventListener('scroll', onScroll);
	thumbEl.removeEventListener('mousedown', onMouseDown);
	window.removeEventListener('resize', updateThumbWidth);
	window.removeEventListener('resize', updateThumbPosition);
});
</script>
<template>
<div class="relative overflow-hidden">
	<div ref="content" class="w-full h-full overflow-x-scroll sm:overflow-hidden pb-3 max-w-[29.188rem]">
		<div class="w-[29.375rem]">
			<div class="flex items-start justify-start overflow-hidden gap-[0.9rem]  text-black">
				<div class="p-2.5 rounded-[0.313rem] bg-[#f8f8f8] min-h-[5.125rem] h-full text-center min-w-[8.313rem] w-full">
					<div class="mb-[0.313rem] flex justify-center items-center">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/bags.svg" alt="choreless bag" />
						
					</div>
					<p class="text-xs font-bold">Prepare your bags</p>
					<h1 class="text-[0.625rem] leading-[0.875rem]">Pack 1 bag per service <br> type.</h1>
				</div>
				<div class="p-2.5 rounded-[0.313rem] bg-[#f8f8f8] min-h-[5.125rem] h-full text-center min-w-[10.938rem] w-full">
					<div class="mb-[0.313rem] flex justify-center items-center">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/clean.svg" alt="choreless clean" />
						
					</div>
					<p class="text-xs font-bold text-nowrap">We collect and clean items</p>
					<h1 class="text-[0.625rem] leading-[0.875rem]">After cleaning, you <br> will receive an </h1>
				</div>
				<div class=" block p-2.5 rounded-[0.313rem] bg-[#f8f8f8] min-h-[5.125rem] h-full text-center min-w-[8.313rem] w-full">
					<div class="mb-[0.313rem] flex justify-center items-center">
					<img src="https://ik.imagekit.io/choreless/V2S/icons/deliver.svg" alt="choreless deliver" />
					</div>
					<p class="text-xs font-bold">We deliver</p>
					<h1 class="text-[0.625rem] leading-[0.875rem]">After cleaning, you will receive an </h1>
				</div>
			</div>
		</div>
	</div>
	<div ref="scrollBar" class="absolute bottom-0 left-0 h-3 w-full pt-2 block sm:hidden">
		<div ref="thumb" class="h-full bg-brand-orange rounded-xl cursor-pointer relative" />
	</div>
</div>
</template>
