import Result from "./model/Trends";
import Search from "./model/Search";
import Movie from "./model/Movies";

import * as trendsView from "./view/trendsView";
import * as searchView from "./view/searchView";
import * as moviesView from "./view/moviesView";

import { elements, renderLoader, clearLoader } from "./view/base";

/*   Global state of the app
 * - Trending movies object
 * - search object
 * - Movie object
 * - Likes object
 */

const state = {};
window.state = state;

// /////////////////////////////////////////////////////////////////////////////////
// Trending movies object
// /////////////////////////////////////////////////////////////////////////////////

const controllTrendingMovies = async () => {
	state.trends = new Result();

	// render loader
	renderLoader(elements.resultsContainer);

	try {
		// 1. Get data from the data controller
		await state.trends.getTrendingMovies();

		// 2. Prepare the ui
		clearLoader();

		// 3. Populate the ui
		trendsView.renderTrendingMovies(state.trends.trendingMovies);
	} catch (e) {
		console.log(e);
		console.log(typeof e);
	}
};

document.addEventListener("DOMContentLoad", controllTrendingMovies());

// /////////////////////////////////////////////////////////////////////////////////
// Search Object
// /////////////////////////////////////////////////////////////////////////////////

const controllSearch = async () => {
	// Get/read input
	const query = searchView.getInput();

	if (query) {
		state.search = new Search(query);

		// Prepare the ui
		// searchView.clearInput();
		searchView.clearResultsContainer();
		renderLoader(elements.resultsContainer);

		try {
			// get the result
			await state.search.getResult();

			// clear loader
			clearLoader();

			// display results
			searchView.renderMovies(state.search.result);
		} catch (e) {
			console.log(e);
			console.log(typeof e);
		}
	}
};

elements.searchForm.addEventListener("keyup", e => {
	e.preventDefault();
	controllSearch();
});

// /////////////////////////////////////////////////////////////////////////////////
// Search Object
// /////////////////////////////////////////////////////////////////////////////////

const controllMovies = async e => {
	// console.log(e.target);
	// Get the id
	const id = e.target.parentElement.parentElement.id;
	state.movie = new Movie(parseInt(id));

	// display the popup
	moviesView.togglePopup();

	// clear content
	moviesView.clearPopupContent();

	// Render a loader
	renderLoader(elements.popupContentContainer);

	try {
		// get the movie
		await state.movie.getMovie();

		// clear the loader
		clearLoader();

		// populate the popup
		moviesView.renderPopupContent(state.movie.result);
	} catch (E) {
		console.log(E);
	}
};

// Adds the popup
// elements.resultsContainer.addEventListener("click", controllMovies);

// Removes the popup
document.querySelector(".popup__close", ".popup__close *").addEventListener("click", () => {
	moviesView.togglePopup();
});

// /////////////////////////////////////////////////////////////////////////////////
// Likes Object
// /////////////////////////////////////////////////////////////////////////////////

const likeMovies = async e => {
	console.log(e.target);
};

elements.resultsContainer.addEventListener("click", e => {
	if (e.target.matches(".card__content-img") || e.target.matches(".card__content-viewIcon, .card__content-viewIcon *")) {
		controllMovies(e);
	} else if (e.target.matches(".card__content-likeIcon, .card__content-likeIcon *")) {
		likeMovies(e);
	}
});
