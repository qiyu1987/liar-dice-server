const { Router } = require("express")
const { toJWT, toData } = require("./jwt")
const bcrypt = require("bcrypt")
const User = require("../user/model")

function factory(stream) {
	const router = new Router()
	router.post("/login", async (req, res, next) => {
		const { name, password } = req.body
		try {
			const user = await User.findOne({
				where: { name: name }
			})
			if (!user) {
				res
					.send("Invalid name or password.")
					.status(404)
					.end()
			} else if (bcrypt.compareSync(password, user.password)) {
				const data = { userId: user.id }
				const token = toJWT(data)
				console.log(token)
				res.send({ jwt: token }).end()
			} else {
				res
					.send("Invalid name or password.")
					.status(404)
					.end()
			}
		} catch (err) {
			next(err)
		}
	})
	return router
}

module.exports = factory
