<template>
	<div class="gray-life-container">
		<button class="switch-theme" @click="switchTheme">Change Theme</button>
	</div>
</template>
<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
const colorMode = useColorMode() // Ref<'dark' | 'light'>

const switchTheme = event => {
	const x = event.clientX
	const y = event.clientY
	/** 三角函数，通过直角的两个直角边，计算斜边长度 */
	const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
	const transition = document.startViewTransition(() => {
		colorMode.value = colorMode.value === `dark` ? `light` : `dark`
	})
	transition.ready.then(() => {
		const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
		document.documentElement.animate(
			{
				clipPath: clipPath,
				backgroundColor: colorMode.value === `dark` ? `#000` : `#fff`
			},
			{
				duration: 3500,
				easing: 'ease-in',
				pseudoElement: '::view-transition-new(root)'
			}
		)
	})
}
</script>

<style scoped lang="scss">
.gray-life-container {
	width: 100vw;
	height: 100vh;
	background: {
        image: var(--gray-bg);
		// image: url('../assets/gray-life.webp');
		size: cover;
		position: center;
	}
	filter: var(--filter-style);

    .switch-theme {
        position: fixed;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
    }
}
</style>
