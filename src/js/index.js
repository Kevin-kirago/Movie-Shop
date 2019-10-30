import Result from "./model/Trends";

import * as trendsView from "./view/trends";

/*   Global state of the app
 * - Trending movies object
 * - search object
 * -
 */

const state = {};

// Trending movies object
const controllTrendingMovies = async () => {
	state.trends = new Result();

	try {
		// 1. Get data from the data controller
		await state.trends.getTrendingMovies();
		console.log(state.trends.trendingMovies);

		// 2. Prepare the ui
		// *loader

		// 3. Populate the ui
		trendsView.renderTrendingMovies(state.trends.trendingMovies);
	} catch (e) {
		console.log(e);
		console.log(typeof e);
	}
};

controllTrendingMovies();
