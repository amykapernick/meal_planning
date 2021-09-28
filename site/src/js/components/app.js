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
	const modalData = {
		recipes, 
		allRecipes, 
		toggleModal, 
		setRecipes, 
		day: day.toLowerCase(), 
		section: section.toLowerCase()
	}

	useEffect(() => {
		if(typeof window !== 'undefined') {
			const recipeList = window.localStorage.getItem('recipes')
			const savedRecipes = window.localStorage.getItem('savedRecipes')

			if(recipeList) {
				setAllRecipes(JSON.parse(recipeList))
			}

			if(savedRecipes) {
				const data = JSON.parse(savedRecipes)[day.toLowerCase()]?.[section.toLowerCase()] || []
				setRecipes(data)
			}
		}
	}, [])

	return (
		<React.Fragment>
			<button onClick={() => toggleModal(true)}>{recipes.length ? 'Change' : 'Select'} Recipes</button>
			<ul className="recipes_list">
				{recipes.map(recipe => (
					<li key={recipe.permalink}>
						<RecipeCard {...recipe} />
					</li>
				))}
			</ul>
			{modalOpen 
				&& <Modal {...modalData}>
					<h4>Select Recipes for {day} - {section}</h4>
				</Modal>
			}
		</React.Fragment>
	)
}

const Modal = ({allRecipes, toggleModal, setRecipes, recipes, day, section, children}) => {
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
			{children}
			
			<select
				ref={select}
				multiple={true}
				name="recipes"
				size="10"
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
			<button onClick={saveRecipes}>Save Recipes</button>
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
		{image && <img src={image} />}
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