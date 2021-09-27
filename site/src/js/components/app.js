'use strict';

const e = React.createElement;

// import Planner from "/js/components/planner/index.js";
import Planner from './planner'

const App = () => {
	return (
		<div>
			<Planner />
			{/* <h2>Planner</h2> */}
		</div>
	)
}

ReactDOM.render(e(App), document.querySelector('#app'));