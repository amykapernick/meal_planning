module.exports = (collection) => {
	const categories = collection.getFilteredByTag('categories')
	console.log(categories)
	return categories;
}