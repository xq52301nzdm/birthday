<template>
	<button @click="toAnimate">Animate</button>
	<div class="photo-grid">
		<div
			class="photo-grid-item"
			v-for="item in photoList"
			:key="item.id"
		>
			<img :src="item.url" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import anime from 'animejs'

type Photo = {
	id: number
	url: string
}

const photoList = ref<Photo[]>([])

for (let i = 0; i < 40; i++) {
	photoList.value.push({
		id: i,
		url: `https://img.shields.io/badge/vue-%234FC08D.svg?style=for-the-badge&logo=vue.js&logoColor=white`
	})
}

const toAnimate = () => {
	anime({
		targets: '.photo-grid .photo-grid-item',
		translateX: anime.stagger(30, { grid: [8, 5], from: 'center', axis: 'x' }),
		translateY: anime.stagger(30, { grid: [8, 5], from: 'center', axis: 'y' }),
		rotateZ: anime.stagger([0, 90], { grid: [8, 5], from: 'center', axis: 'x' }),
		delay: anime.stagger(200, { grid: [8, 5], from: 'center' }),
		easing: 'easeInOutQuad'
	})
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.photo-grid {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(8, 1fr);

	.photo-grid-item {
		border: 1px solid gray;

		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
