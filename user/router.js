const { Router } = require("express")
const bcrypt = require("bcrypt")
const User = require("./model")
function factory(stream) {
	const router = new Router()
	router.post("/user", async (req, res, next) => {
		try {
			const { name, password } = req.body
			const hashedPassword = bcrypt.hashSync(password, 10)
			const user = await User.create({ name, password: hashedPassword })
			res.send(user.name)
		} catch (err) {
			next(err)
		}
	})
	return router
}
module.exports = factory
