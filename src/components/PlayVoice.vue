<template>
	<audio
		autoplay="true"
		ref="audio"
		src=""
	/>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const audio = ref<HTMLAudioElement>()

const playBgMusic = () => {
	audio.value!.play()
}

defineExpose({
	playBgMusic
})
</script>

<style scoped lang="scss"></style>
