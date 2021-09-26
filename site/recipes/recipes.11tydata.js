module.exports = {
	eleventyComputed: {
		permalink: (data) => {
			const slug = data.page.fileSlug
			const locale = data.page.filePathStem.match(/\/recipes\/(\w+)\/(.)+/)[1]

			return `recipes/${locale}/${slug}/index.html`
		},
	},
	tags: 'recipes',
	layout: `templates/recipe.njk`
}