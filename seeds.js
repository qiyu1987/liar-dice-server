const bcrypt = require("bcrypt")
const userList = [
	{ name: "x", password: bcrypt.hashSync("x", 10) },
	{ name: "y", password: bcrypt.hashSync("x", 10) }
]
const roomList = [{ name: "room1" }, { name: "room2" }]
const db = require("./db")
const User = require("./user/model")
const Room = require("./room/model")
db.sync().then(async () => {
	try {
		await User.bulkCreate(userList)
		await Room.bulkCreate(roomList)
		console.log("seeding created")
	} catch (err) {
		console.error(err)
	}
})
