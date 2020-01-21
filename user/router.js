const { Router } = require("express")
const bcrypt = require("bcrypt")
const User = require("./model")
const auth = require("../auth/middleware")
const { rollDice } = require("../functions")
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
	router.put("/roll", auth, async (req, res, next) => {
		try {
			// console.log("userId", req.user.id)
			const user = await User.findByPk(req.user.id)
			// console.log(user)
			await user.update({ roll: rollDice() })
			// console.log(user)
			res.send(user)
		} catch (err) {
			next(err)
		}
	})
	return router
}
module.exports = factory
