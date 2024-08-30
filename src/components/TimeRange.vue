<template>
	<div
		class="time-range-box"
		ref="timeRangeBox"
	>
		<div
			class="time-range-title"
			@click="onTitleClick"
		>
			{{ rangeTitle }}
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const timeRangeBox = ref<HTMLElement | null>(null)

const rangeTitle = ref('')

onMounted(() => {
	console.log('time range mounted')
	setTimeout(() => {
		rangeTitle.value = 'Time Range'
		timeRangeBox.value!.classList.add(`tracking-in-contract-bck-top`)
	}, 1000)
})


const formateDate = (date: Date | string = new Date()) => {
	let dateInstance = typeof date === `string` ? new Date(date) : date
	return dateInstance
		.toLocaleDateString()
		.replaceAll(`/`, '-')
		.split('-')
		.map(x => x.padStart(2, '0'))
		.join('-')
}

const onTitleClick = (event: MouseEvent) => {
	let { target } = event
	;(target as HTMLElement).classList.remove(`tracking-in-contract-bck-top`)
	;(target as HTMLElement).classList.add(`tracking-out-expand-fwd-top`)
}
</script>

<style scoped lang="scss">
.time-range-box {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.time-range-title {
		width: max-content;
		font-size: 1rem;
		font-weight: 700;
		color: rgb(181, 179, 179);
		cursor: pointer;
	}
}

.tracking-in-contract-bck-top {
	animation: tracking-in-contract-bck-top 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

@keyframes tracking-in-contract-bck-top {
	0% {
		letter-spacing: 1em;
		transform: translateZ(400px) translateY(-300px);
		opacity: 0;
	}
	40% {
		opacity: 0.6;
	}
	100% {
		transform: translateZ(0) translateY(0);
		opacity: 1;
	}
}

.tracking-out-expand-fwd-top {
	animation: tracking-out-expand-fwd-top 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes tracking-out-expand-fwd-top {
	0% {
		transform: translateZ(0) translateY(0);
		opacity: 1;
	}
	60% {
		opacity: 0.8;
	}
	100% {
		letter-spacing: 1em;
		transform: translateZ(300px) translateY(-200px);
		opacity: 0;
	}
}
</style>
