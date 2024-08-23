class EventBus {
	constructor() {
		this.eventMap = {}
	}

	on(eventName, callback) {
		if (!this.eventMap[eventName]) {
			this.eventMap[eventName] = []
		}
		this.eventMap[eventName].push(callback)
	}

	emit(eventName, params) {
		if (this.eventMap[eventName]) {
			this.eventMap[eventName].forEach(fn => fn(params))
		}
	}
}

const EventEmitter = new EventBus()

EventEmitter.on(`updateData`, v => alert(v))

EventEmitter.emit(`updateData`, 111)

// 思考
// 1、异步回调的处理
// 2、异步错误的处理
// 3、取消订阅
// 发布订阅模式，也被称为观察者模式