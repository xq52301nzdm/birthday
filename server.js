const express = require('express')
const http = require('http')
const app = express()
var bodyParser = require('body-parser')

// Post 取参需要做特殊处理
app.use(bodyParser.urlencoded({ extended: true }))
app.all('/', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	next()
})
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
	cors: true
	// {
	//     origin: "ws:10.11.5.17:5173"
	// }
})

const msgSet = []

let userList = []

function getIdList() {
	return userList.map(v => v.userId)
}

io.on('connection', socket => {
	// console.log(socket, '链接成功')
	socket.on(`RecordName`, userInfo => {
		if (!getIdList().includes(userInfo.userId)) {
			io.emit(`UpdateList`, userInfo)
		}
	})
	socket.on(`UpdateGroup`, userInfo => {
		userList.push(userInfo)
		io.emit(`UpdateList`, userList)
	})
	socket.on(`ViewEvent`, data => {
		userList = userList.map(v => {
			if (data.userId === v.userId) {
				v.doing = data.title
			}
			return v
		})
		io.emit(`UpdateList`, userList)
		// console.log(data, 'data')
		// msgSet.push(data)
		// io.emit('renderMsg', msgSet)
	})
})

server.listen(4000, `10.10.116.62`, () => {
	console.log('listening on *:4000')
})
