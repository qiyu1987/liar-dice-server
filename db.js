const Sequelize = require("sequelize")
const databaseUrl =
	process.env.DATABASE_URL ||
	"postgres://postgres:secret@localhost:5432/postgres"
const db = new Sequelize(databaseUrl)
// db.sync({ force: true }).then(async () => {
// 	console.log("DB connect")
// })
module.exports = db
