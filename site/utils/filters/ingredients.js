const units = [
	'tablespoon',
	'clove',
	'piece',
	'g',
	'gram',
	'teaspoon',
	'sprig',
	'handful',
	'bulb'
]
const matchQuantity = '(?<quantity>\\d+(?:cm)*)*'
const matchUnit = `(?:(?<unit>${units.join('|')})s* )`
const matchIngredient = '(?<ingredient>.+?)'

const formatIngredients = (ingredients) => {
	const match = `^${matchQuantity} *${matchUnit}*(?:of )*${matchIngredient}$`
	const ingredientList = ingredients.map(i => {
		const matches = i.match(RegExp(match, 'i'))

		return matches?.groups ? {...matches.groups, full: i} : {full: i}
	})


	return ingredientList
}

module.exports = formatIngredients