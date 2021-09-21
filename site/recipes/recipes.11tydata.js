module.exports = {
	eleventyComputed: {
		permalink: (data) => visible(data) ? `${data.page.fileSlug}/index.html` : false,
		tags: (data) => {
			const tags = data.categories ? [...data.categories] : []

			return [
				...tags,
				`recipes`,
			]
		}
	},
	layout: `templates/recipe.njk`
}