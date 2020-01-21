const Sequelize = require("sequelize")
const db = require("../db")

const User = db.define("user", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	roll: {
		type: Sequelize.ARRAY(Sequelize.ENUM(["1", "2", "3", "4", "5", "6"])),
		defaultValue: ["1", "1", "1", "1", "1"]
	}
})

module.exports = User
