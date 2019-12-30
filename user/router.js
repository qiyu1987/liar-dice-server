const { Router } = require("express")
const User = require("./model")
function factory(stream) {
	const router = new Router()
	router.post("/user", async (req, res, next) => {
		try {
			const user = await User.create(req.body)
			res.send(user)
		} catch (err) {
			next(err)
		}
	})
	return router
}
module.exports = factory
