require('dotenv').config()

const {
	browserSyncConfig, 
	templateFormats,
	config
} = require('./site/_config/index.js')

const eleventyRemark = require('./site/utils/markdown/index.js')
const slug = require('./site/utils/filters/slug')
const image = require('./site/utils/shortcodes/image')
const svg = require('./site/utils/plugins/svg')

module.exports = (eleventyConfig) => {
	eleventyConfig.setBrowserSyncConfig(browserSyncConfig)
	eleventyConfig.setQuietMode(true);
	eleventyConfig.setTemplateFormats(templateFormats)
	eleventyConfig.addWatchTarget('site/src/scss/**/*')

	// Passthrough Copy
	eleventyConfig.addPassthroughCopy('site/admin')
	eleventyConfig.addPassthroughCopy('site/img/**/*.{gif,mp4}')
	eleventyConfig.addPassthroughCopy({'site/src/fonts': 'fonts'})
	eleventyConfig.addPassthroughCopy({'site/src/img': 'img'})

	// Plugins
	eleventyConfig.addPlugin(...eleventyRemark);
	eleventyConfig.addPlugin(...svg)

	// Filters
	eleventyConfig.addFilter('slug', slug)
	eleventyConfig.addFilter("debug", (data) => {
		// console.log(data)

		Object.keys(data).forEach(collection => {
			data[collection].forEach(item => {
				if(item.data.tags) {
					console.log(item.data.tags)
				}
			})
		})

		return `<script>console.log(${data})</script>`
	});

	// Shortcodes
	eleventyConfig.addNunjucksAsyncShortcode('image', image)

	

	
	return {
		...config
	}
}
