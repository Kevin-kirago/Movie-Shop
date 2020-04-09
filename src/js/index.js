import Result from "./model/Trends";
import Search from "./model/Search";
import Movie from "./model/Movies";
import Likes from "./model/Likes";

import * as trendsView from "./view/trendsView";
import * as searchView from "./view/searchView";
import * as moviesView from "./view/moviesView";
import * as likesView from "./view/likesView";

import { elements, renderLoader, clearLoader, toggleLikesIcon } from "./view/base";

/*   Global state of the app
 * - Trending movies object
 * - search object
 * - Movie object
 * - Likes object
/*/

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
	} else {
		searchView.clearResultsContainer();
		document.addEventListener("DOMContentLoad", controllTrendingMovies());
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

// Removes the popup
document.querySelector(".popup__close", ".popup__close *").addEventListener("click", () => {
	moviesView.togglePopup();
});

// /////////////////////////////////////////////////////////////////////////////////
// Likes Object
// /////////////////////////////////////////////////////////////////////////////////

const likeMovies = async e => {
	if (!state.likes) state.likes = new Likes();

	// get the id
	const curId = parseInt(e.target.parentElement.parentElement.parentElement.id);

	// get the object
	try {
		await state.likes.getMovie(curId);

		const { id, title, genres, poster_path } = state.likes.result;

		// checks wheather user has not yet liked the current movie
		if (!state.likes.isLiked(id)) {
			// add like to state
			state.likes.addLike(id, title, genres[0].name, poster_path);

			// Toggle like btn
			likesView.toggleLikeBtn(true, curId.toString());

			// Add like to ui
			likesView.addLikeToUI(id, poster_path, title, genres[0].name);
		} else {
			// remove like from state
			state.likes.removeLike(id);

			// Toggle like btn
			likesView.toggleLikeBtn(false, curId.toString());

			// Remove like from to ui
			likesView.removeLikeFromUI(curId.toString());
		}
	} catch (e) {
		console.log(e);
	}

	if (state.likes !== undefined && state.likes.getNumLikes() > 0) {
		toggleLikesIcon(true);
	} else {
		toggleLikesIcon(false);
	}
};

elements.resultsContainer.addEventListener("click", e => {
	if (e.target.matches(".card__content-img") || e.target.matches(".card__content-viewIcon, .card__content-viewIcon *")) {
		controllMovies(e);
	} else if (e.target.matches(".card__content-likeIcon, .card__content-likeIcon *")) {
		likeMovies(e);
	}
});
