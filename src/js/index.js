import Result from "./model/Trends";
import Search from "./model/Search";

import * as trendsView from "./view/trendsView";
import * as searchView from "./view/searchView";
import { elements, renderLoader, clearLoader } from "./view/base";

/*   Global state of the app
 * - Trending movies object
 * - search object
 * -
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
			console.log(state.search.result);

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
