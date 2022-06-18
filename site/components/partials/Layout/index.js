import { Fragment } from "react";

import Meta from "../../parts/Meta";
import Header from "../Header";


const Layout = ({children}) => (
	<Fragment>
		<Meta />
		<Header />
		<main>{children}</main>
		<footer></footer>
	</Fragment>
)

export default Layout