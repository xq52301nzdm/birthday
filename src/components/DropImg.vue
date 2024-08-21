<template>
	<canvas
		id="rainCanvas"
		width="400"
		height="300"
	></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvas = ref(null)
const ctx = ref(null)
const raindrops = ref([])

class Raindrop {
	constructor() {
		this.x = Math.random() * canvas.width
		this.y = 0
		this.speed = Math.random() * 5 + 2
		this.size = Math.random() * 5 + 2
		this.image = new Image()
		this.image.src = 'your_image.png' // 替换为你的图片路径
	}

	update() {
		this.y += this.speed
		if (this.y > canvas.height) {
			this.y = 0
			this.x = Math.random() * canvas.width
			this.speed = Math.random() * 5 + 2
			this.size = Math.random() * 5 + 2
		}
	}

	draw() {
		ctx.value!.drawImage(this.image, this.x, this.y, this.size, this.size)
	}
}

onMounted(() => {
	canvas.value = document.getElementById('rainCanvas')
	ctx.value = canvas.value.getContext('2d')

	// 创建多个雨滴实例
	for (let i = 0; i < 200; i++) {
		raindrops.value.push(new Raindrop())
	}

	// 动画循环
	const animate = () => {
		ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
		raindrops.value.forEach(raindrop => {
			raindrop.update()
			raindrop.draw()
		})
		requestAnimationFrame(animate)
	}

	animate()
})
</script>
