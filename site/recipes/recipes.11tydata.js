module.exports = {
	eleventyComputed: {
		permalink: (data) => {
			const slug = data.page.fileSlug
			const locale = data.page.filePathStem.match(/\/recipes\/(\w+)\/(.)+/)[1]

			return `recipes/${locale}/${slug}/index.html`
		},
		tags: (data) => {
			const tags = data.categories ? [...data.categories] : []
			const locale = data.page.filePathStem.match(/\/recipes\/(\w+)\/(.)+/)[1]
			return [
				...tags,
				'recipes',
				locale
			]
		}
	},
	layout: `templates/recipe.njk`
}