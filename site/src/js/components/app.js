'use strict';

const e = React.createElement;
const useEffect = React.useEffect;
const useState = React.useState;
const useRef = React.useRef
const createRef = React.createRef

const RecipePicker = ({day, section}) => {
	const [allRecipes, setAllRecipes] = useState([]);
	const [modalOpen, toggleModal] = useState(false);
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		if(typeof window !== 'undefined') {
			const recipeList = window.localStorage.getItem('recipes')
			const savedRecipes = window.localStorage.getItem('savedRecipes')

			if(recipeList) {
				setAllRecipes(JSON.parse(recipeList))
			}

			if(savedRecipes) {
				setRecipes(JSON.parse(savedRecipes)[day]?.[section] || [])
			}
		}
	}, [])

	return (
		<React.Fragment>
			<button onClick={() => toggleModal(true)}>Select Recipes</button>
			{recipes.map(recipe => (
				<RecipeCard key={recipe.permalink} {...recipe} />
			))}
			{modalOpen && <Modal {...{recipes, allRecipes, toggleModal, setRecipes, day, section}} />}
		</React.Fragment>
	)
}

const Modal = ({allRecipes, toggleModal, setRecipes, recipes, day, section}) => {
	const select = createRef()
	const selectedRecipes = recipes.map(recipe => recipe.permalink)
	const saveRecipes = () => {
		const data = window.localStorage.getItem('savedRecipes') ? JSON.parse(window.localStorage.getItem('savedRecipes')) : {}
		const recipeList = []
		const options = select.current.selectedOptions

		for(let opt of options) {
			recipeList.push(JSON.parse(opt.value))
		}

		const newData = {
			...data,
			[day]: {
				...data?.[day],
				[section]: recipeList
			}
		}

		window.localStorage.setItem('savedRecipes', JSON.stringify(newData))

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
				{allRecipes.map((recipe) => (
					<option 
						key={recipe.permalink} 
						value={JSON.stringify(recipe)}
						selected={selectedRecipes.includes(recipe.permalink)}
					>
						{recipe.title}
					</option>
				))}
			</select>
		</div>
	)
}

const RecipeCard = ({title, image, categories, permalink}) => (
	<article className="recipe_card">
		<h2>
			<a href={`/${permalink}`}>
				{title}
			</a>
		</h2>
		<img src={image || '/img/placeholder.png'} />
		<ul className="tags" lang="en-AU">
			{categories.map(cat => (
				<li key={cat}>{cat}</li>
			))}
		</ul>
	</article>
)

document.querySelectorAll('.days .day').forEach(day => {
	const dayName = day.dataset.day

	day.querySelectorAll('.sections .section').forEach(section => {
		const sectionName = section.dataset.section

		const picker = section.querySelector('.picker')

		ReactDOM.render(<RecipePicker {...{day: dayName, section: sectionName}} />, picker);
	})
})

