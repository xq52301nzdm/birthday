<template>
	<div>home </div>
	<!-- <WelcomeText ref="WelcomeTextRef" /> -->
	<!-- <PlayVoice /> -->

	<!-- <RandomImg /> -->

	<NoteBook ref="NoteBookRef" />
</template>
<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import WelcomeText from '../components/WelcomeText.vue'
import PlayVoice from '../components/PlayVoice.vue'
import RandomImg from '../components/RandomImg.vue'
import NoteBook from '../components/NoteBook.vue'

/** 播放欢迎语 */
const WelcomeTextRef = ref<Ref<InstanceType<typeof WelcomeText>> | null>(null)

/** 播放BGM */
const PlayVoiceRef = ref<Ref<InstanceType<typeof PlayVoice>> | null>(null)

/** 自动书写 */
const NoteBookRef = ref<Ref<InstanceType<typeof NoteBook>> | null>(null)

onMounted(async () => {
	// await NoteBookRef.value?.autoWriteTitle()
	// await NoteBookRef.value?.autoWriteContent1()
	// WelcomeTextRef.value?.playWelcomeText()
	// PlayVoiceRef.value?.playBgMusic()
})
</script>

<style scoped lang="scss"></style>
