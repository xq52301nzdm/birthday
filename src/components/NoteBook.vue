<template>
	<div>
		<div class="autoWrite-note"></div>
		<div class="autoWrite-note1"></div>
	</div>
</template>
<script setup lang="ts">
import Typed from 'typed.js'

const delay: (fn: Function, delayTime?: number) => Promise<void> = (fn: Function, delayTime?: number) => {
	return new Promise(resolve => {
		setTimeout(
			() => {
				fn()
				resolve()
			},
			delayTime === undefined ? 1000 : delayTime
		)
	})
}

const autoWriteTitle = () => {
	return new Promise(resolve => {
		const writeContent: string = `这是一段测试文字<br>，一段测试文字，测试文字哦`
		const element: HTMLElement = document.querySelector('.autoWrite-note')!
		new Typed(element, {
			strings: [writeContent],
			typeSpeed: 100,
			showCursor: false,
			onComplete: () => {
				delay(resolve)
			}
		})
	})
}

const autoWriteContent1 = () => {
	// return new Promise(resolve => {
	// 	const writeContent: string = `第二端内容`
	// 	const element: HTMLElement = document.querySelector('.autoWrite-note1')!
	// 	new Typed(element, {
	// 		strings: [writeContent],
	// 		typeSpeed: 50,
	// 		onComplete: resolve
	// 	})
	// })
}

defineExpose({
	autoWriteTitle,
	autoWriteContent1
})
</script>

<style scoped lang="scss"></style>
