import { elements } from "./base";

// get / read input
export const getInput = () => elements.searchInput.value;

// clear input
export const clearInput = () => {
	elements.searchInput.value = "";
};

// clear trendsview
export const clearResultsContainer = () => {
	elements.resultsHeading.textContent = "search result ...";
	elements.resultsContainer.innerHTML = "";
};

const renderResult = result => {
	if (result.poster_path !== null) {
		const markup = `
        <div class="col-1-of-4 card" id="${result.id}">
            <div class="card__content">
                <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" class="card__content-img" alt="movie photo">
                <div class="card__content-viewIcon">
                    <i class="ion-ios-plus-empty"></i>
                </div>
                <div class="card__content-likeIcon">
                    <i class="ion-ios-heart-outline"></i>
                </div>
                <div class="card__content-title">
                    <h2>${result.title ? result.title : result.original_name}</h2>
                    <span>Vote average ${result.vote_average}</span>
                </div>
            </div>
        </div>`;

		elements.resultsContainer.insertAdjacentHTML("beforeend", markup);
	}
};

export const renderMovies = obj => {
	if (obj !== undefined) {
		obj.forEach(el => {
			renderResult(el);
		});
	}
};
