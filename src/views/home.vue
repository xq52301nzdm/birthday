<template>
	<!-- <WelcomeText ref="WelcomeTextRef" /> -->
	<!-- <PlayVoice ref="PlayVoiceRef" /> -->
	<!-- <RandomImg ref="RandomImgRef" /> -->
	<!-- <NoteBook ref="NoteBookRef" /> -->
	<DropImg ref="DropImgRef" />
	<!-- <LookbackUpon /> -->
	<!-- <TimeRange /> -->
	<!-- <PhotoGrid /> -->
	<!-- <LoopPicture /> -->
	<!-- <GrayLife /> -->
</template>
<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import WelcomeText from '../components/WelcomeText.vue'
import PlayVoice from '../components/PlayVoice.vue'
import RandomImg from '../components/RandomImg.vue'
import NoteBook from '../components/NoteBook.vue'
import DropImg from '../components/DropImg.vue'
import LookbackUpon from '../components/LookbackUpon.vue'
import TimeRange from '../components/TimeRange.vue'
import PhotoGrid from '../components/PhotoGrid.vue'
import LoopPicture from '../components/LoopPicture.vue'
import GrayLife from '../components/GrayLife.vue'

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

/** 启动按钮 */
const LookbackUponRef = ref<Ref<InstanceType<typeof LookbackUpon>> | null>(null)

/** 时间区间 */
const TimeRangeRef = ref<Ref<InstanceType<typeof TimeRange>> | null>(null)

/** 多行循环照片 */
const LoopPictureRef = ref<Ref<InstanceType<typeof LoopPicture>> | null>(null)

onMounted(async () => {
	console.log('home', 'Home页 onMounted')
	// await NoteBookRef.value?.autoWriteTitle()
	// await NoteBookRef.value?.autoWriteContent1()
	// WelcomeTextRef.value?.playWelcomeText()
	// PlayVoiceRef.value?.playBgMusic()
})
</script>

<style scoped lang="scss"></style>
