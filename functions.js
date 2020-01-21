function rollDice() {
	return [0, 0, 0, 0, 0].map(element => {
		return (Math.round(Math.random() * 5) + 1).toString()
	})
}

function checkResult(num, die, diceRoll) {
	const count = diceRoll.filter(element => element === die).length
	return num <= count
}
console.log("rollDice should return a array of 5", rollDice())
console.log(
	"each element in the array should be integer between 1 - 6",
	rollDice()
)
// console.log(
// 	"2 times die 6 should be false in [1,2,3,4,5,6]",
// 	checkResult(2, 6, [1, 2, 3, 4, 5, 6])
// )
// console.log(
// 	"1 times die 6 should be true in [1,2,3,4,5,6]",
// 	checkResult(1, 6, [1, 2, 3, 4, 5, 6])
// )
module.exports = { rollDice, checkResult }
