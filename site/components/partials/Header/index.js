import { Link } from "react-router-dom";

import menus from '../../../../_data/menu.js'

const Header = () => (
	<header>
		<nav>
			<ul>
				{menus.main.map(({path, label}) => (
					<li key={label}>
						<Link to={path}>{label}</Link>
					</li>
				))}
			</ul>
		</nav>
	</header>
)

export default Header