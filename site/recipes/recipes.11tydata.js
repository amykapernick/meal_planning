module.exports = {
	eleventyComputed: {
		permalink: (data) => `recipes/${data.page.fileSlug}/index.html`,
		tags: 'recipes'
	},
	layout: `templates/recipe.njk`
}