const express = require("express")
const app = express()
const port = 4000

const roomRouter = require("./room/router")

app.get("/", (req, res) => {
	res.send("hello")
})
app.use(roomRouter)
app.listen(port, () => {
	console.log(`Listening on :${port}`)
})
