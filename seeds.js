const userList = [{ username: "x" }, { username: "y" }]
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
