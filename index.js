const express = require("express")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const cors = require("cors")
const Sse = require("json-sse")

const db = require("./db")
const Room = require("./room/model")
const User = require("./user/model")
db.sync({ force: true }).then(async () => {
	try {
		const userList = [
			{ name: "x", password: bcrypt.hashSync("x", 10) },
			{ name: "y", password: bcrypt.hashSync("x", 10) }
		]
		await User.bulkCreate(userList)
		const roomList = [{ name: "room1" }, { name: "room2" }]
		await Room.bulkCreate(roomList)
	} catch (err) {
		console.error(err)
	}
})

const app = express()

const port = 4000

function onListen() {
	console.log(`Listening on :${port}`)
}

const corsMiddleware = cors()
app.use(corsMiddleware)

const jsonParser = bodyParser.json()
app.use(jsonParser)

const stream = new Sse()

const userFactory = require("./user/router")
const userRouter = userFactory(stream)
const roomFactory = require("./room/router")
const roomRouter = roomFactory(stream)
const loginFactory = require("./auth/router")
const loginRouter = loginFactory(stream)
app.use(roomRouter)
app.use(userRouter)
app.use(loginRouter)

app.get("/", (req, res) => {
	stream.send("test")

	res.send("hello")
})

app.get("/stream", async (req, res, next) => {
	try {
		const rooms = await Room.findAll()

		const action = {
			type: "ALL_ROOMS",
			payload: rooms
		}

		const string = JSON.stringify(action)

		stream.updateInit(string)
		stream.init(req, res)
	} catch (err) {
		next(err)
	}
})
app.listen(port, onListen)
