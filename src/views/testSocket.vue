<template>
	<div class="root-element">
		<van-dialog
			v-model:show="show"
			title="标题"
			show-cancel-button
			@confirm="init"
		>
			<van-field
				v-model="userInfo.userName"
				label=""
				placeholder="在此输入您的姓名"
			/>
		</van-dialog>
		<div class="root-box">
			<!-- <Chat
				v-for="item in userGroupInfo"
				:key="item.userName"
				:msg="item.msg"
				:userName="item.userName"
				:isSelf="item.userName === userInfo.userName"
			/> -->
		</div>
		<div class="bottom">
			<textarea
				v-model="sendContent"
				:rows="rows"
				class="textarea-box"
			/>
			<div class="send-btn-container">
				<div
					:class="className"
					@click="sendMsg"
					>发送</div
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
console.log(1)
import { reactive, ref, onMounted, watch, computed, onBeforeUnmount, nextTick } from 'vue'
// import { showNotify, showToast } from 'vant'

const show = ref(false)

const sendContent = ref('')

const rows = ref(1)

// 当前用户信息
const userInfo = reactive({
	userName: ''
})

// 当前用户的群聊信息
const userGroupInfo = ref<
	{
		userName: string
		msg: string
	}[]
>([])

let socket = ref<any>(null)

const className = computed(() => {
	return !sendContent.value ? 'send-btn-disabled' : 'send-btn'
})

function initSocket(): Promise<void> {
	return new Promise(res => {
		try {
			const ip = `10.10.116.62`
			const port = `4000`
			const address = ip + ':' + port
			socket.value = ((window as any).io as any).connect(address)
			socket.value.emit(`JoinGroup`, {
				userName: userInfo.userName
			})
			res()
		} catch {
			console.error(`Can not connect to server`)
		}
	})
}

const init = async () => {
	await initSocket()
	// 监听加入群聊信息
	socket.value!.on('JoinGroup', data => {
		const message = data[data.length - 1].userName + '加入群聊'
		// showNotify({ type: 'success', message })
	})
	// 监听发送群聊信息
	socket.value!.on('UpdateList', data => {
		console.log(data, 'data')
		userGroupInfo.value = [...userGroupInfo.value, data]
		nextTick(() => {
			if (data.userName === userInfo.userName) {
				const rootBox = document.querySelector('.root-box')
				rootBox?.scrollTo(0, rootBox.offsetHeight)
			}
		})
	})
	// 监听推送消息
	socket.value!.on('SendAll', data => {
		const message = data.msg
		// showNotify({ type: 'success', message })
	})
}

onMounted(() => {
	show.value = true
	initSocket()
	const textarea = document.querySelector('.textarea-box')!
	textarea.addEventListener('input', function () {
		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	})
})

const sendMsg = () => {
	if (!sendContent.value) {
		return showToast({
			message: '不能发送空消息',
			type: 'fail'
		})
	}
	socket.value.emit(`UpdateGroup`, {
		userName: userInfo.userName,
		msg: sendContent.value
	})
	sendContent.value = ''
}

// 当输入内容被清空，初始化textarea高度
watch(sendContent, newValue => {
	if (newValue === '') {
		const textarea = document.querySelector('.textarea-box')!
		textarea.style.height = 'auto'
	}
})

const sendAll = () => {
	if (!sendContent.value) {
		// return showToast({
		// 	message: '不能发送空消息',
		// 	type: 'fail'
		// })
	}
	socket.value.emit(`SendAll`, {
		msg: sendContent.value
	})
	sendContent.value = ''
}

onBeforeUnmount(() => {
	socket.value.emit(`ExitGroup`, {
		userName: userInfo.userName
	})
	// 监听离开群聊信息
	socket.value!.on('ExitGroup', data => {
		const message = data.userName + '离开群聊'
		// showNotify({ type: 'warning', message })
	})
})
</script>

<style lang="scss">
.root-element {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.root-box {
	width: 100vw;
	flex: 1;
	overflow: auto;
	background-color: #625858;
	padding: 20px 5px 10px;
	box-sizing: border-box;
}

.bottom {
	display: flex;
	width: 100vw;
	min-height: 60px;
	background-color: #625858;
	box-sizing: border-box;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px 5px;

	textarea {
		flex: 1;
		min-height: 100%;
		border: none;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 10px;
		font-size: 14px;
		margin-right: 10px;
	}
}

.send-btn-container {
	width: 60px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-end;
}

.send-btn {
	width: 60px;
	height: 35px;
	border-radius: 5px;
	font-size: 14px;
	text-align: center;
	line-height: 35px;
	box-sizing: border-box;
	background-color: #28bb65;
	color: white;
	margin-right: 5px;
	transition: opacity 0.3s;
}

.send-btn-disabled {
	@extend .send-btn;
	opacity: 0.5;
}

.text-area-box {
	min-height: 50px;
	overflow-y: auto;
}
</style>
