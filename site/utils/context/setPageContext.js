const changePageContext = ({pageContext, setPageContext, data}) => {
	setPageContext({
		...pageContext,
		...data
	})
}

export default changePageContext