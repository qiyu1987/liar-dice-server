const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const Sse = require("json-sse")

const Room = require("./room/model")

const roomFactory = require("./room/router")

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

const roomRouter = roomFactory(stream)
app.use(roomRouter)

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
