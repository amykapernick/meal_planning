'use strict';

// const e = React.createElement;

const days = [
	'Saturday',
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday'
]

const Planner = () => (
	<ul>
		{days.map((day) => (
			<li>{day}</li>
		))}
	</ul>
)

export default Planner