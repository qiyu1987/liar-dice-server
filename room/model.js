const Sequelize = require("sequelize")

const db = require("../db")
const User = require("../user/model")
const Room = db.define("room", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
})
Room.hasMany(User)
User.belongsTo(Room)

module.exports = Room
