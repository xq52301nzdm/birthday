<template>
	<div class="img-fragment-container">
		<div class="img-fragment">
			<img src="https://img.shields.io/badge/vue-%234FC08D.svg?style=for-the-badge&logo=vue.js&logoColor=white" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

onMounted(() => {})
</script>

<style scoped lang="scss">
.img-fragment-container {
	width: 100vw;
	height: 100vh;
	position: relative;

	.img-fragment {
		position: absolute;
		width: 100px;
		height: 100px;
        transform: translate(50px, 200px) rotate(45deg);

        img {
            width: 100%;
            height: 100%;
        }
	}
}
</style>
