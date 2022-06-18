import { createContext } from 'react'

export const defaultContext = {
	title: 'Meal Planning',
	siteTitle: 'Meal Planning',
	description: 'Meal planning and shopping list app'
}

const PageContext = createContext(defaultContext)

export default PageContext