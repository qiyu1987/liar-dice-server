const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 4000
const corsMiddleware = cors()
app.use(corsMiddleware)

const jsonParser = bodyParser.json()
app.use(jsonParser)

const roomRouter = require("./room/router")

app.get("/", (req, res) => {
	res.send("hello")
})
app.use(roomRouter)
app.listen(port, () => {
	console.log(`Listening on :${port}`)
})
