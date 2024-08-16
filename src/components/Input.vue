<template>
	<div class="input-container">
		<editor-content
			class="custom-editor-container"
			:editor="editor"
		/>

		<el-icon
			@click="traceSearch"
			:class="`send-icon-active`"
			title="上传图片"
			><PictureFilled
		/></el-icon>

		<el-icon
			@click="traceSearch"
			:class="`send-icon-active`"
			title="语音输入"
			><Microphone
		/></el-icon>

		<el-icon
			@click="traceSearch"
			:class="searchValue ? `send-icon-active` : `send-icon`"
			><Promotion
		/></el-icon>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Placeholder from '@tiptap/extension-placeholder'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import './../assets/Input.scss'

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
.input-container {
	overflow-x: hidden;
	width: 40vw;
	min-height: 56px;
	border-radius: 28px;
	background: #282a2c;
	display: flex;
	overflow-y: auto;
	position: absolute;
	bottom: 50px;
	left: 50%;
	transform: translateX(-50%);
	box-sizing: border-box;
	padding-right: 20px;
}

.send-icon {
	width: 0;
	transform: translateX(50px);
	display: inline-block;
	font-size: 20px;
	align-self: center;
	color: gray;
	transition: all 0.3s;
	overflow: hidden;
	color: #fff;
	cursor: pointer;
	opacity: 0;
}

.send-icon-active {
	width: 20px;
	@extend .send-icon;
	margin: 0 10px;
	opacity: 1;
	transition: all 0.3s;
	transform: translateX(0);
}
</style>
