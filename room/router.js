const { Router } = require("express")
const Room = require("./model")
const router = new Router()

router.get("/rooms", (req, res, next) => {
	Room.findAll()
		.then(rooms => {
			res.send(rooms)
		})
		.catch(next)
})

module.exports = router
