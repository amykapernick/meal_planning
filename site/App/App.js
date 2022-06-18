import { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DevStyles from "../components/partials/DevStyles";
import Layout from "../components/partials/Layout";
import Home from '../pages/Home'
import PageContext, { defaultContext } from '../../_data/context/pageContext';

import '../styles/main.scss';


const App = () => {
	const [pageContext, setPageContext] = useState(defaultContext)
	const value = useMemo(
		() => ({ pageContext, setPageContext }), 
		[pageContext]
	);

	return (
		<BrowserRouter>
			<PageContext.Provider value={value}>
				<Layout>
					{process.env.NODE_ENV === 'development' && <DevStyles />}
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</Layout>
			</PageContext.Provider>
		</BrowserRouter>
	)
}

export default App