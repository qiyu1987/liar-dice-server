const { Router } = require("express")
const Room = require("./model")
const router = new Router()

function factory(stream) {
	const router = new Router()

	router.post("room", async (req, res, next) => {
		try {
			const room = await Room.create(req.body)

			const action = {
				type: "NEW_ROOM",
				payload: room
			}

			const string = JSON.stringify(action)

			stream.send(string)

			res.send(room)
		} catch (err) {
			next(err)
		}
	})

	return router
}

// router.get("/rooms", (req, res, next) => {
// 	Room.findAll()
// 		.then(rooms => {
// 			res.send(rooms)
// 		})
// 		.catch(next)
// })

module.exports = factory
