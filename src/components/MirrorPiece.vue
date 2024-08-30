<!-- 镜子碎片 -->
<template>
	<div class="mirror-piece-fragment">
		<img :src="bgImg" />
	</div>
</template>

<script setup lang="ts">
import bgImg from '../assets/gray-life.webp'
</script>

<style lang="scss" scoped>
.mirror-piece-fragment {
	width: 50px;
	height: 100px;
	animation: mirror-piece-fragment 5s linear infinite;
	clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
	overflow: hidden;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	backdrop-filter: grayscale(0);
	img {
		width: 100%;
		height: 100%;
	}
}

@keyframes mirror-piece-fragment {
	0% {
		filter: brightness(1);
		transform: rotateY(0);
	}
	25% {
		filter: brightness(1.25);
		transform: rotateY(90deg);
	}
	50% {
		filter: brightness(1.5);
		transform: rotateY(180deg);
	}
	75% {
		filter: brightness(1.75);
		transform: rotateY(270deg);
	}
	100% {
		filter: brightness(1);
		transform: rotateY(360deg);
	}
}
</style>
