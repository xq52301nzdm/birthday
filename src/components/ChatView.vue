<template>
	<div class="chat-container">
		<div class="chat-list">
			<el-scrollbar>
				<div
					className="chat-item"
					v-for="(item, index) in ChatList"
					:key="index"
				>
					<div :class="`chat-item-role-${item.type} ${item.isLoading ? 'doingAnswer' : ''}`">
						{{ item.type === 'user' ? 'You' : '' }}
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
								<div class="chat-item-operate-menu-item">更具体一点</div>
								<div class="chat-item-operate-menu-item">更简洁一点</div>
								<div class="chat-item-operate-menu-item">更幽默一点</div>
							</div>
						</div>
					</template>
				</div>
			</el-scrollbar>
		</div>
		<Input
			ref="SearchInput"
			@search="onSearch"
		/>
	</div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import Input from './Input.vue'
import { GoogleGenerativeAI } from '@google/generative-ai'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import MarkdownIt from 'markdown-it'
import { ElNotification } from 'element-plus'
import '../assets/ChatView.scss'

/** markdown解析器，处理代码高亮并添加自定义元素内容 */
const mdParser = MarkdownIt({
	highlight: function (str: string, lang: string) {
		console.log(lang, 'lang')
		if (lang && hljs.getLanguage(lang)) {
			try {
				return `<div class='custom-code-block'><pre class="hljs"><code class='custom-code'>${
					hljs.highlightAuto(str).value
				}</code></pre><div class='custom-toolbar'>
					<div class='custom-copy-btn' data-copy='${str}'>复制</div>
				</div></div>`
			} catch (__) {}
		}
		return ''
	}
})

const SearchInput = ref<typeof Input>()

type ChatListItem = {
	type: 'user' | 'model'
	message: string
	time: string
	isLoading: boolean
}

const ChatList: Ref<ChatListItem[]> = ref([])

onMounted(() => {
	/** 冒泡，监听复制按钮点击事件 */
	document.body.addEventListener('click', event => {
		const target = event.target as HTMLElement
		if (target.className === `custom-copy-btn`) {
			const copyText = target.dataset.copy
			if (copyText) {
				navigator.clipboard.writeText(copyText).then(() => {
					ElNotification({
						title: '内容已复制',
						position: 'bottom-left',
						type: 'success'
					})
				})
			}
		}
	})
})

setTimeout(() => {
	ChatList.value.push({
		message: `\`\`\`javascript
function sayHello() {
	console.log("Hello World!");
}
\`\`\`
这个函数名为 \`sayHello\`，它什么也不接收，并在控制台输出 \`Hello World!\`。
你可以像这样调用它：
\`\`\`javascript
sayHello();
\`\`\`
这将导致在控制台中输出 "Hello World!"。`,
		type: 'model',
		time: new Date().toDateString(),
		isLoading: false
	})
})

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

const useChatWithContext = async (question: string) => {
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

	let result = await chat.sendMessageStream(question)
	try {
		for await (const chunk of result.stream) {
			const chunkText = chunk.text()
			// console.log(mdParser.render(chunkText), 'chunkText')
			ChatList.value[ChatList.value.length - 1].message += chunkText
		}
	} catch (error) {
		console.log(error, 'error')
	}
	ChatList.value[ChatList.value.length - 1].isLoading = false
}
</script>

<style scoped lang="scss">
.chat-container {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	padding: 3vh 0;
	background: #303030;
	overflow: hidden;
	position: relative;

	.chat-list {
		height: 100vh;
		box-sizing: border-box;
		padding-bottom: 156px;

		.chat-item {
			width: 40vw;
			display: flex;
			color: #ffffff;
			margin: 20px auto;

			.chat-item-role-model {
				width: 32px;
				height: 32px;
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
				width: 32px;
				height: 32px;
				border-radius: 50%;
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #6d6969;
			}

			.chat-item-other {
				position: relative;
				flex: 1;

				.chat-item-operate-menu {
					width: 100%;
					min-height: 32px;
					display: flex;
					padding: 0px 20px;

					.chat-item-operate-menu-item {
						width: max-content;
						padding: 5px 10px;
						border-radius: 8px;
						box-sizing: border-box;
						background: rgba(255, 255, 255, 0.1);
						font-size: 13px;
						margin-right: 10px;
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
					// animation: fadeInOut 2s infinite;
					box-sizing: border-box;
					background: rgba(255, 255, 255, 0);
					bottom: 0;
					left: 20px;
				}
				.chat-item-other-content {
					flex: 1;
					min-height: 32px;
					line-height: 32px;
					box-sizing: border-box;
					padding: 0 20px;

					p {
						font-size: 14px;
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
</style>
