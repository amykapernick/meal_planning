require('dotenv').config()

const {
	browserSyncConfig, 
	templateFormats,
	config
} = require('./site/_config/index.js')

const eleventyRemark = require('./site/utils/markdown/index.js')
const slug = require('./site/utils/filters/slug')
const ingredients = require('./site/utils/filters/ingredients')
const image = require('./site/utils/shortcodes/image')
const svg = require('./site/utils/plugins/svg')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig(browserSyncConfig)
	eleventyConfig.setQuietMode(true);
	eleventyConfig.setTemplateFormats(templateFormats)
	eleventyConfig.addWatchTarget('site/src/scss/**/*')

	// Passthrough Copy
	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy({'site/src/fonts': 'fonts'})
	eleventyConfig.addPassthroughCopy({'site/src/img': 'img'})
	eleventyConfig.addPassthroughCopy({'site/img': 'img/cms'})

	// Plugins
	eleventyConfig.addPlugin(...eleventyRemark);
	eleventyConfig.addPlugin(...svg)

	// Filters
	eleventyConfig.addFilter('slug', slug)
	eleventyConfig.addFilter('ingredients', ingredients)
	eleventyConfig.addFilter("debug", (data) => {
		console.log(data)
		return `<script>console.log(${data})</script>`
	});

	// Shortcodes
	eleventyConfig.addNunjucksAsyncShortcode('image', image)

	

	
	return {
		...config
	}
}
