<!--
 * @Author: wenjing
 * @Date: 2024-09-11 15:08:25
 * @LastEditors: wenjing
 * @LastEditTime: 2024-09-11 15:53:45
 * @FilePath: /front-grayscalePush/Users/wenjing/work/vsCodeProject/train-ai-front-end/src/views/trainAI/test.vue
 * @Description: 
-->
<template>
	<div
		class="container"
		:style="`height: 100vh; overflow: auto`"
	>
		<input
			class="inner"
			@focus="onFocus"
			ref="inputText"
			v-model="textarea"
			type="text"
		/>
		<div
			v-if="isFocus"
			style="width: 100%; height: 500px"
		></div>
	</div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
const inputText = ref()
const textarea = ref('')
const height = ref(0)
const timer = ref(null)

let isFocus = ref(false)

const onFocus = () => {
	isFocus.value = true
	nextTick(() => {
		document.querySelector(`.inner`)?.scrollIntoView({ behavior: `smooth`, block: `start` })
	})
}

onMounted(() => {
	height.value = window.innerHeight
	document.addEventListener(`touchstart`, event => {
		if (event.target!.tagName !== 'INPUT') {
			if (isFocus.value) {
				isFocus.value = false
				nextTick(() => {
					document.querySelector(`.inner`)?.scrollIntoView({ behavior: `smooth`, block: `end` })
				})
			}
		}
	})
})
</script>
<style lang="scss" scoped>
* {
	-webkit-overflow-scrolling: touch;
}

.container {
	width: 100%;
	position: relative;
}

.inner {
	height: 80px;
	width: 100%;
	margin-top: 700px;
	background-color: #fff;
}
</style>
