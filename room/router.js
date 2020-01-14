const { Router } = require("express")
const Room = require("./model")
const User = require("../user/model")
const auth = require("../auth/middleware")
function factory(stream) {
	const router = new Router()

	router.put("/join", auth, async (req, res, next) => {
		try {
			const user = await User.update(
				{
					roomId: req.body.roomId
				},
				{
					where: {
						id: req.user.id
					}
				}
			)
			const allRooms = await Room.findAll({ include: [User] })
			const action = {
				type: "ALL_ROOMS",
				payload: allRooms
			}
			const string = JSON.stringify(action)
			stream.send(string)
			res.send(user)
		} catch (err) {
			next(err)
		}
	})
	router.post("/room", auth, async (req, res, next) => {
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
