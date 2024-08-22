<template>
	<!-- <WelcomeText ref="WelcomeTextRef" /> -->
	<!-- <PlayVoice ref="PlayVoiceRef" /> -->
	<RandomImg ref="RandomImgRef" />
	<!-- <NoteBook ref="NoteBookRef" /> -->
	<!-- <DropImg ref="DropImgRef" /> -->
</template>
<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import WelcomeText from '../components/WelcomeText.vue'
import PlayVoice from '../components/PlayVoice.vue'
import RandomImg from '../components/RandomImg.vue'
import NoteBook from '../components/NoteBook.vue'
import DropImg from '../components/DropImg.vue'

/** 播放欢迎语 */
const WelcomeTextRef = ref<Ref<InstanceType<typeof WelcomeText>> | null>(null)

/** 播放BGM */
const PlayVoiceRef = ref<Ref<InstanceType<typeof PlayVoice>> | null>(null)

/** 自动书写 */
const NoteBookRef = ref<Ref<InstanceType<typeof NoteBook>> | null>(null)

/** 随机照片填充 */
const RandomImgRef = ref<Ref<InstanceType<typeof RandomImg>> | null>(null)

/** 照片镜子雨 */
const DropImgRef = ref<Ref<InstanceType<typeof DropImg>> | null>(null)

onMounted(async () => {
	// await NoteBookRef.value?.autoWriteTitle()
	// await NoteBookRef.value?.autoWriteContent1()
	// WelcomeTextRef.value?.playWelcomeText()
	// PlayVoiceRef.value?.playBgMusic()
})
</script>

<style scoped lang="scss"></style>
