<template>
	<div class="chat-container">
		<div class="chat-list">
			<div
				className="chat-item"
				v-for="(item, index) in ChatList"
				:key="index"
			>
				<div :class="`chat-item-role-${item.type} ${item.isLoading ? 'doingAnswer' : ''}`">
					{{ item.type === 'user' ? '我' : '' }}
				</div>
				<!-- 提问者-用户 -->
				<template v-if="item.type === `user`">
					<div class="chat-item-other">
						<div class="chat-item-other-content"> {{ item.message }}</div>
					</div>
				</template>
				<!-- 回答者-AI -->
				<template v-if="item.type === `model`">
					<div :class="`chat-item-other ${item.isLoading ? 'isLoading' : ''}`">
						<div
							class="chat-item-other-content"
							v-html="mdParser.render(item.message)"
						/>
						<div
							v-if="!item.isLoading"
							class="chat-item-operate-menu"
						>
							<!-- <div class="chat-item-operate-menu-item">更具体</div>
							<div class="chat-item-operate-menu-item">更简洁</div>
							<div class="chat-item-operate-menu-item">更幽默</div> -->
							<el-icon
								class="chat-item-operate-icon"
								style="margin-bottom: 2px"
								><Share
							/></el-icon>
							<van-popover
								v-model:show="showPopover"
								:actions="actions"
								@select="v => onSelect(v, item)"
								class="custom-ai-popover"
								:show-arrow="false"
								placement="top"
							>
								<template #reference>
									<el-icon class="chat-item-operate-icon"><Operation /></el-icon>
								</template>
							</van-popover>
						</div>
					</div>
				</template>
			</div>
		</div>
		<Input
			ref="SearchInput"
			:isCanStop="isCanStop"
			@search="onSearch"
			@stopAnswer="stopAnswer"
		/>
	</div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import Input from './InputMobile.vue'
import { GoogleGenerativeAI } from '@google/generative-ai'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import MarkdownIt from 'markdown-it'
import '../assets/ChatViewMobile.scss'
import { showToast } from 'vant'

/** markdown解析器，处理代码高亮并添加自定义元素内容 */
const mdParser = MarkdownIt({
	highlight: function (str: string, lang: string) {
		console.log(lang, 'lang')
		if (lang && hljs.getLanguage(lang)) {
			try {
				return `<div class='custom-code-block'><pre class="hljs"><code class='custom-code'>${
					hljs.highlightAuto(str).value
				}</code></pre><div class='custom-toolbar'>
					<div class='custom-copy-btn' data-copy="${encodeURIComponent(str)}">复制</div>
				</div></div>`
			} catch (__) {}
		}
		return ''
	}
})

const SearchInput = ref<typeof Input>()

/** 是否可以中止当前未完成的回答 */
const isCanStop = ref(false)

type ChatListItem = {
	type: 'user' | 'model'
	message: string
	time: string
	isLoading: boolean
}

const ChatList: Ref<ChatListItem[]> = ref([])

const showPopover = ref(false)

// 通过 actions 属性来定义菜单选项
const actions = [{ text: '复制(md格式)' }, { text: '导出' }, { text: '朗读' }]
const onSelect = (action: { text: string }, item: ChatListItem) => {
	console.log(action, 'action', String(item.message))
	if (action.text === `复制(md格式)`) {
		useCopy(item.message)
	}
}

const useCopy = (copyContent: string) => {
	// 创建一个临时的 textarea 元素
	const tempTextArea = document.createElement('textarea')
	tempTextArea.value = copyContent
	document.body.appendChild(tempTextArea)
	// 选中文本内容
	tempTextArea.select()
	tempTextArea.setSelectionRange(0, 99999) // 对于移动设备的兼容
	// 执行复制命令
	try {
		document.execCommand('copy')
	} catch (err) {
		showToast('复制失败了')
	}
	// 移除临时 textarea 元素
	document.body.removeChild(tempTextArea)
}

onMounted(() => {
	document.title = `AI助手`
	/** 冒泡，监听复制按钮点击事件 */
	document.addEventListener('click', function (event) {
		// 检查是否点击了复制按钮
		if (event.target && event.target.classList.contains('custom-copy-btn')) {
			const code = decodeURIComponent(event.target.getAttribute('data-copy'))
			useCopy(code)
		}
	})
})

// setTimeout(() => {
// 	ChatList.value.push({
// 		message: `\`\`\`javascript
// function sayHello() {
// 	console.log("Hello World!");
// }
// \`\`\`
// 这个函数名为 \`sayHello\`，它什么也不接收，并在控制台输出 \`Hello World!\`。
// 你可以像这样调用它：
// \`\`\`javascript
// sayHello();
// \`\`\`
// 这将导致在控制台中输出 "Hello World!"。`,
// 		type: 'model',
// 		time: new Date().toDateString(),
// 		isLoading: false
// 	})
// })

const onSearch = (question: string) => {
	const userMsg = {
		message: question,
		type: 'user' as `user` | 'model',
		time: new Date().toDateString(),
		isLoading: false
	}
	ChatList.value.push(userMsg)
	const systemMsg = {
		message: '',
		type: 'model' as `user` | 'model',
		time: new Date().toDateString(),
		isLoading: true
	}
	ChatList.value.push(systemMsg)
	useChatWithContext(question)
}

const controller = ref()
const signal = ref()

const useChatWithContext = async (question: string) => {
	controller.value = new AbortController()
	signal.value = controller.value.signal
	isCanStop.value = true
	const genAI = new GoogleGenerativeAI(`AIzaSyDe5_Yr7ms6XFPhfjPEzn2g1-b9mqo6qOo`)
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
	const chat = model.startChat({
		history: ChatList.value.map(x => ({
			role: x.type === 'user' ? 'user' : 'model',
			parts: [{ text: x.message }]
		}))
	})

	/** JSON返回 */
	// let result = await chat.sendMessage(question)
	// console.log(result.response.text())

	let result = await chat.sendMessageStream(question, { signal: signal.value })
	try {
		for await (const chunk of result.stream) {
			const chunkText = chunk.text()
			// console.log(mdParser.render(chunkText), 'chunkText')
			document.startViewTransition(() => {
				ChatList.value[ChatList.value.length - 1].message += chunkText
			})
			document.querySelector(`.chat-list`)!.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
		}
	} catch (error) {
		// BodyStreamBuffer was aborted error
		console.log(error, 'error')
	}
	isCanStop.value = false
	ChatList.value[ChatList.value.length - 1].isLoading = false
}

/** 终止请求 */
const stopAnswer = () => {
	controller.value.abort()
	console.log(`stop`)
}
</script>

<style scoped lang="scss">
.chat-container {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	padding: 3vh 0;
	background: #303030;
	overflow: hidden auto;
	position: relative;
	font-size: 13px;

	.chat-list {
		box-sizing: border-box;
		padding-bottom: 70px;

		.chat-item {
			width: calc(100vw - 10px);
			display: flex;
			color: #ffffff;
			margin: 5px auto;

			.chat-item-role-model {
				margin-top: 2px;
				flex-shrink: 0;
				width: 15px;
				height: 15px;
				border-radius: 50%;
				transform: rotate(0deg);
				background: {
					image: url('../assets/gemini.svg');
					size: 100%;
					repeat: no-repeat;
					position: center;
				}
			}

			.chat-item-role-model.doingAnswer {
				animation: InfinityRotate 2s linear infinite;
			}

			.chat-item-role-user {
				margin-top: 2px;
				width: 15px;
				height: 15px;
				border-radius: 50%;
				font-size: 10px;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #6d6969;
			}

			.chat-item-other {
				position: relative;
				width: calc(100% - 20px);

				.chat-item-operate-menu {
					width: 100%;
					min-height: 30px;
					display: flex;
					padding: 0px;
					align-items: center;
					justify-content: flex-start;

					.chat-item-operate-icon {
						font-size: 18px;
						margin: 0 5px;
					}

					.chat-item-operate-menu-item {
						width: max-content;
						padding: 4px 7px;
						border-radius: 8px;
						box-sizing: border-box;
						background: rgba(255, 255, 255, 0.1);
						font-size: 12px;
						margin-right: 7px;
						margin-top: 3px;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.chat-item-operate-menu-item:hover {
						background: rgba(255, 255, 255, 0.2);
						cursor: pointer;
					}
				}

				.chat-item-other-fade {
					position: absolute;
					width: calc(100% - 40px);
					height: 120px;
					box-sizing: border-box;
					background: rgba(255, 255, 255, 0);
					bottom: 0;
					left: 20px;
				}
				.chat-item-other-content {
					flex: 1;
					min-height: 36px;
					line-height: 22px;
					box-sizing: border-box;
					padding: 0 6px;

					p {
						font-size: 12px;
					}
				}
			}
		}
	}
}

@keyframes InfinityRotate {
	0% {
		transform: rotateZ(0deg);
	}
	100% {
		transform: rotateZ(360deg);
	}
}

@keyframes fadeInOut {
	0% {
		filter: opacity(0);
	}
	50% {
		filter: opacity(1);
	}
	100% {
		filter: opacity(0);
	}
}

.custom-ai-popover :deep(.van-popover__content) {
	background: rgb(39, 39, 42);
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15);

	.van-popover__action {
		padding: 0;
		font-size: 12px;
		height: 28px;
		width: 88px;
		border: none;
		color: white;

		.van-popover__action-text::after {
			border: none;
		}
	}

	.van-popover__action:active {
		background: unset;
		opacity: 0.6;
	}
}
</style>
