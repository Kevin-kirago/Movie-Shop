import { elements } from "./base";

const renderResult = result => {
	const markup = `
    <div class="col-1-of-4 card">
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
};

export const renderTrendingMovies = obj => {
	obj.forEach(el => {
		renderResult(el);
	});
};
