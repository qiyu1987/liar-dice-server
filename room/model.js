const Sequelize = require("sequelize")

const db = require("../db")

const Room = db.define("room", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
})

module.exports = Room
