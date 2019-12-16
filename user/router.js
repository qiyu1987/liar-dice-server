const { Router } = require("express")
const router = new Router()
const User = require("./model")

router.post("user", async (req, res, next) => {
	try {
		const user = User.Create(req.body)
		res.send(user)
	} catch (err) {
		next(err)
	}
})
