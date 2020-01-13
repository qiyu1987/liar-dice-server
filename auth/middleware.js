const User = require("../user/model")
const { toData } = require("./jwt")

async function auth(req, res, next) {
	const auth = req.headers.authorization && req.headers.authorization.split(" ")
	if (auth && auth[0] === "Bearer" && auth[1]) {
		try {
			const data = toData(auth[1])
			const user = await User.findByPk(data.userId)
			if (!user) return next("User does not exist")
			req.user = user
			next()
		} catch (err) {
			res.status(400).send({
				message: `Error ${err.name}: ${err.message}`
			})
		}
	} else {
		res.status(401).send({ message: "Please supply some valid credentials" })
	}
}

module.exports = auth
