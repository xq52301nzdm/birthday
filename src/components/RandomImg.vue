<template>
	<div
		class="random-img"
		ref="container"
		@click="dropImg"
	>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const container = ref<HTMLElement>()

/** 从屏幕顶部掉落图片，掉落到底部后销毁 */
function dropImg() {
	const img = randomImg()
	container.value?.appendChild(img)
	setTimeout(() => {}, 1000)
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 生成随机的一个img标签，固定定位，位置随机，z-index随机 */
function randomImg() {
	const img = document.createElement('img')
	img.src =
		'data:image/jpeg;base64,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'
	img.style.position = 'fixed'
	img.classList.add('random-img-item')
	img.style.width = `${getRandomInt(10, 40)}vh`
	img.style.top = `${Math.random() * 100}vh`
	img.style.left = `${Math.random() * 100}vw`
	img.style.zIndex = `${Math.random() * 100}`
	return img
}

onMounted(() => {
	// for (let i = 0; i < 2; i++) {
	// 	container.value?.appendChild(randomImg())
	// }
})
</script>

<style scoped lang="scss">
.random-img {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	user-select: none;

	.random-img-item {
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		cursor: pointer;
	}
}
</style>
