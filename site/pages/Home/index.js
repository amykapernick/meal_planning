import { Fragment, useContext, useEffect } from "react"

import PageContext from "../../../_data/context/pageContext"
import changePageContext from "../../utils/context/setPageContext"
import { fetchRecipes } from "../../utils/db"

const IndexPage = () => {
	const contextData = useContext(PageContext)
	const {pageContext} = contextData

	// const data = fetchRecipes()

	// console.log({data})

	useEffect(() => {
		changePageContext({
			...contextData,
			data: {
				title: `Home | ${pageContext.siteTitle}`,
			}

		})
	}, [])

	return (
		<Fragment>
			<h1>Home</h1>
		</Fragment>
	)
}

export default IndexPage