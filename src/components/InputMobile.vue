<template>
	<div class="input-container-outside">
		<div class="input-container">
			<editor-content
				class="custom-editor-container"
				:editor="editor"
			/>

			<el-icon
				@click="traceSearch"
				:class="`send-icon-active`"
				title="上传图片"
			>
				<PictureFilled />
			</el-icon>

			<el-icon
				@click="traceSearch"
				:class="`send-icon-active`"
				title="语音输入"
			>
				<Microphone />
			</el-icon>

			<van-icon
				v-if="isCanStop"
				class="send-icon-active stop-icon"
				@click="$emit('stopAnswer')"
				name="stop-circle-o"
			/>

			<el-icon
				@click="traceSearch"
				:class="searchValue ? `send-icon-active` : `send-icon`"
			>
				<Promotion />
			</el-icon>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Placeholder from '@tiptap/extension-placeholder'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import './../assets/InputMobile.scss'

defineProps(['isCanStop'])

const searchValue = ref('')

const editor = new Editor({
	content: '<p></p>',
	extensions: [
		StarterKit,
		Placeholder.configure({
			placeholder: '请输入您的问题'
		})
	],
	onUpdate: () => {
		searchValue.value = editor.getText()
	}
})
console.log(editor, 'editor')
const Emit = defineEmits(['search'])
const traceSearch = () => {
	Emit(`search`, searchValue.value)
	searchValue.value = ''
	editor.commands.clearContent()
}

defineExpose({
	searchValue
})
</script>

<style scoped lang="scss">
.input-container-outside {
	width: 100vw;
	min-height: 56px;
	background: #303030;
	position: fixed;
	bottom: 0px;
	left: 50%;
	transform: translateX(-50%);
}

.input-container {
	overflow-x: hidden;
	width: calc(100vw - 28px);
	min-height: 36px;
	border-radius: 8px;
	background: #282a2c;
	display: flex;
	overflow-y: auto;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 10px;
	box-sizing: border-box;
	padding-right: 8px;
	font-size: 17px;
}

.send-icon {
	width: 0;
	transform: translateX(20px);
	display: inline-block;
	font-size: 18px;
	align-self: center;
	color: gray;
	transition: all 0.3s;
	overflow: hidden;
	color: #fff;
	opacity: 0;
}

.send-icon-active {
	width: 20px;
	@extend .send-icon;
	margin: 0 7px;
	opacity: 1;
	transition: all 0.3s;
	transform: translateX(0);
}

.stop-icon {
	color: red;
}

.send-icon-active:active {
}
</style>
