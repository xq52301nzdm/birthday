<template>
	<div
		class="grid-box"
		@click="changeArea"
	>
		<div class="box">
            <div style="height: 500px; background: pink">11</div>
        </div>
	</div>
	<button
		style="margin-top: 100px"
		@click="changeArea"
	>
		ChangeArea
	</button>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const isShow = ref(false)

const changeArea = event => {
    const dom = document.querySelector('.grid-box')
    isShow.value = !isShow.value
    dom!.style['grid-template-rows'] = isShow.value ? '1fr' : `0fr`
	dom!.style['opacity'] = isShow.value ? '1' : `0`
}
</script>

<style scoped lang="scss">
.grid-box {
	display: grid;
	grid-template-rows: 0fr;
	transition: all 1s;
	overflow: hidden;

	.box {
		width: 200px;
		background: #ba9595;
		min-height: 0;
	}
}
</style>
