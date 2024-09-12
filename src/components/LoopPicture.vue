<template>
	<button
		class="start-btn"
		@click="startLoopPicture"
	>
		Start
	</button>
	<div id="scroll-container">
		<div
			class="scroll-content outter-scroller"
			v-for="(outerItem, outerIndex) in AllData"
			:key="outerIndex"
		>
			<div
				class="item"
				v-for="item in outerItem"
			>
				<img :src="item.url" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const loopImgUrlList = ref<string[]>([])

const LoopImgs = import.meta.glob('../assets/loopImgs/*.png')
for (let key in LoopImgs) {
	const imgUrl = new URL(key, import.meta.url).href
	loopImgUrlList.value.push(imgUrl)
}

type Row = {
	id: number
	url: string
}

/** 行数 */
const rowLineCount = ref(3)

/** 整体数据 */
const AllData = ref<Row[][]>([])

const rowList = ref<Row[]>([])

for (let i = 0; i < 30; i++) {
	rowList.value.push({
		id: i,
		url: i % 2 ? loopImgUrlList.value[0] : loopImgUrlList.value[1]
	})
}

for (let i = 0; i < rowLineCount.value; i++) {
	AllData.value.push(rowList.value.slice(i * 10, (i + 1) * 10))
}

// https://via.placeholder.com/150

function startScrolling(direction: `left` | `right`, rowIndex: number) {
	const scrollContainer = [...document.querySelectorAll('.outter-scroller')][rowIndex]

	// 元素实际宽度，包含超出屏幕之外不可见的部分
	const scrollContainerWidth = scrollContainer.scrollWidth

	// 克隆内容并追加到末尾
	const clone = scrollContainer.cloneNode(true)
	;(clone as HTMLElement).classList.remove(`outter-scroller`)
	scrollContainer.appendChild(clone)

	let startPosition = direction === 'right' ? -scrollContainerWidth / 2 : 0

	function scroll() {
		if (direction === 'left') {
			// 向左滚动
			startPosition -= 1
			if (Math.abs(startPosition) >= scrollContainerWidth) {
				// 回到初始位置
				startPosition = 0
			}
		} else if (direction === 'right') {
			// 向右滚动
			startPosition += 1
			if (startPosition >= 0) {
				startPosition = -scrollContainerWidth // 回到初始位置
			}
		}
		;(scrollContainer as HTMLElement).style.transform = `translateX(${startPosition}px)`
		requestAnimationFrame(scroll)
	}

	scroll()
}

const startLoopPicture = () => {
	startScrolling(`left`, 0)
	startScrolling(`right`, 1)
	startScrolling(`left`, 2)
}

const changeLine = () => {
	rowLineCount.value = 2
	AllData.value = []
	for (let i = 0; i < rowLineCount.value; i++) {
		AllData.value.push(rowList.value.slice(i * 10, (i + 1) * 10))
	}
}

defineExpose({
	startLoopPicture
})
</script>

<style scoped lang="scss">
#scroll-container {
	overflow: hidden;
	width: 100vw;
	position: relative;
	user-select: none;
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.scroll-content {
	display: flex;
	width: max-content;
	flex: 1;
}

.item {
	flex-shrink: 0;
	text-align: center;
	background-color: lightcoral;
	box-sizing: border-box;

	img {
		height: 100%;
	}
}

/* 滚动动画 */
@keyframes scroll {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-50%);
	}
}

.scroll-animation {
	animation: scroll 10s linear infinite; /* 10秒循环一次 */
}

.start-btn {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
}

.changeLine {
	position: fixed;
	top: 0;
	left: 100px;
	z-index: 9999;
}
</style>
