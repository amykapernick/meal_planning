'use strict';

const e = React.createElement;
const useEffect = React.useEffect;
const useState = React.useState;
const useRef = React.useRef
const createRef = React.createRef

const RecipePicker = () => {
	const [allRecipes, setAllRecipes] = useState([]);
	const [modalOpen, toggleModal] = useState(false);
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		if(typeof window !== 'undefined') {
			const data = window.localStorage.getItem('recipes')

			if(data) {
				setAllRecipes(JSON.parse(data))
			}
		}
	}, [])

	return (
		<React.Fragment>
			<button onClick={() => toggleModal(true)}>Select Recipes</button>
			{recipes.map(recipe => (
				<h3>{recipe.title}</h3>
			))}
			{modalOpen && <Modal {...{recipes: allRecipes, toggleModal, setRecipes}} />}
		</React.Fragment>
	)
}

const Modal = ({recipes, toggleModal, setRecipes}) => {
	const select = createRef()
	const saveRecipes = () => {
		const recipeList = []
		const options = select.current.selectedOptions

		for(let opt of options) {
			recipeList.push(JSON.parse(opt.value))
		}

		setRecipes(recipeList)

		toggleModal(false)
	}
	return (
		<div className="modal">
			<button onClick={saveRecipes}>Save Recipes</button>
			<select
				ref={select}
				multiple={true}
				name="recipes"
				size="5"
			>
				{recipes.map((recipe) => (
					<option key={recipe.permalink} value={JSON.stringify(recipe)}>{recipe.title}</option>
				))}
			</select>
		</div>
	)
}

document.querySelectorAll('.days .picker').forEach(section => {
	ReactDOM.render(e(RecipePicker), section);
})

