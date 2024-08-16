<template>
	<div class="root">
		<SideBar />
		<Main />
	</div>
</template>
<script setup lang="ts">
import Main from './layout/Main.vue'
import SideBar from './layout/SideBar.vue'
</script>

<style scoped lang="scss">
.root {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: row;
}
</style>
